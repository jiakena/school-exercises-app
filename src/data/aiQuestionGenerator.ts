import type { Question, SubjectType, DifficultyLevel } from '@/types';

// Kimi API 配置
const KIMI_API_KEY = 'sk-E8rRJlY8IAJ4tk0OXDQtRfTIR21Uy5RYmGaOOIyxz1tt9kSB';
const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

// AI生成状态缓存（避免重复请求）
const aiGenerateCache = new Map<string, Question[]>();

// 各科目的知识点提示词
const subjectPrompts: Record<SubjectType, string> = {
  chinese: `你是一位专业的小学语文老师，请为广东佛山市小学生（3-6年级）出题。
题型可以包括：古诗词填空、名句出处、字词注音、近反义词、成语填空、病句修改、标点符号、关联词语、文学常识、修辞手法等。
请确保题目符合小学语文课程标准，难度适中。`,

  math: `你是一位专业的小学数学老师，请为广东佛山市小学生（3-6年级）出题。
题型可以包括：四则运算、分数运算、小数运算、百分数、几何图形、应用题、找规律、时间计算、单位换算、最大公因数/最小公倍数等。
请确保题目符合小学数学课程标准，计算结果为整数或简单小数。`,

  english: `你是一位专业的小学英语老师，请为广东佛山市小学生（3-6年级）出题。
题型可以包括：be动词、时态（一般现在时/过去时/将来时/进行时）、情态动词、代词、介词、冠词、连词、比较级最高级、疑问句、感叹句等。
请确保题目符合小学英语课程标准，语言简单易懂。`
};

// 难度说明
const difficultyDesc: Record<DifficultyLevel, string> = {
  easy: '简单（适合3-4年级）',
  medium: '中等（适合4-5年级）',
  hard: '困难（适合5-6年级）'
};

/**
 * 调用 Kimi API 生成题目
 */
async function callKimiAPI(prompt: string): Promise<string> {
  const response = await fetch(KIMI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KIMI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'moonshot-v1-8k',
      messages: [
        {
          role: 'system',
          content: '你是一位专业的小学教师，擅长出题。请严格按照JSON格式返回题目，不要添加任何额外说明。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8
    })
  });

  if (!response.ok) {
    throw new Error(`API请求失败: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

/**
 * 解析 AI 返回的 JSON 题目
 */
function parseAIQuestions(content: string, subject: SubjectType): Omit<Question, 'id'>[] {
  try {
    // 提取 JSON 部分（去掉 markdown 代码块）
    const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) ||
                      content.match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
    const parsed = JSON.parse(jsonStr.trim());
    const questions = Array.isArray(parsed) ? parsed : parsed.questions || [];

    return questions.map((q: {
      content?: string;
      question?: string;
      options?: string[];
      answer?: string;
      explanation?: string;
      difficulty?: string;
    }) => ({
      subject,
      difficulty: (q.difficulty as DifficultyLevel) || 'medium',
      content: q.content || q.question || '',
      options: q.options || undefined,
      answer: q.answer || '',
      explanation: q.explanation || ''
    })).filter((q: Omit<Question, 'id'>) => q.content && q.answer);
  } catch {
    console.error('解析AI题目失败:', content);
    return [];
  }
}

/**
 * AI 生成指定科目和难度的题目
 */
export async function generateAIQuestions(
  subject: SubjectType,
  difficulty: DifficultyLevel,
  count: number = 5
): Promise<Omit<Question, 'id'>[]> {
  const cacheKey = `${subject}_${difficulty}_${Date.now()}`;

  // 构建提示词
  const prompt = `${subjectPrompts[subject]}

请生成 ${count} 道${difficultyDesc[difficulty]}的选择题，每题4个选项（A/B/C/D）。

严格按照以下JSON格式返回，不要有任何其他文字：
[
  {
    "content": "题目内容（选择题用___表示空白）",
    "options": ["选项A", "选项B", "选项C", "选项D"],
    "answer": "正确答案（与options中的文字完全一致）",
    "explanation": "详细解析",
    "difficulty": "${difficulty}"
  }
]

要求：
1. 题目内容清晰，无歧义
2. 4个选项中只有1个正确答案
3. 干扰项要有一定迷惑性
4. 解析要详细说明为什么选这个答案
5. 确保答案100%正确`;

  try {
    const content = await callKimiAPI(prompt);
    const questions = parseAIQuestions(content, subject);

    if (questions.length > 0) {
      aiGenerateCache.set(cacheKey, questions as Question[]);
    }

    return questions;
  } catch (error) {
    console.error('AI生成题目失败:', error);
    return [];
  }
}

/**
 * 混合生成：优先使用静态题库，不足时用AI补充
 */
export async function generateMixedQuestions(
  subject: SubjectType,
  staticQuestions: Question[],
  targetCount: number = 10
): Promise<Question[]> {
  if (staticQuestions.length >= targetCount) {
    return staticQuestions.slice(0, targetCount);
  }

  // 静态题目不足，用AI补充
  const needed = targetCount - staticQuestions.length;
  console.log(`静态题库不足，AI补充 ${needed} 道题...`);

  try {
    // 按难度分配补充题目
    const easyNeeded = Math.ceil(needed * 0.4);
    const mediumNeeded = Math.ceil(needed * 0.4);
    const hardNeeded = needed - easyNeeded - mediumNeeded;

    const [easyAI, mediumAI, hardAI] = await Promise.all([
      easyNeeded > 0 ? generateAIQuestions(subject, 'easy', easyNeeded) : [],
      mediumNeeded > 0 ? generateAIQuestions(subject, 'medium', mediumNeeded) : [],
      hardNeeded > 0 ? generateAIQuestions(subject, 'hard', hardNeeded) : []
    ]);

    const aiQuestions = [...easyAI, ...mediumAI, ...hardAI].map((q, i) => ({
      ...q,
      id: staticQuestions.length + i + 1
    })) as Question[];

    return [...staticQuestions, ...aiQuestions].slice(0, targetCount);
  } catch {
    // AI生成失败，返回现有静态题目
    return staticQuestions;
  }
}

/**
 * 检查 Kimi API 是否可用
 */
export async function checkKimiAPIAvailable(): Promise<boolean> {
  try {
    const response = await fetch('https://api.moonshot.cn/v1/models', {
      headers: { 'Authorization': `Bearer ${KIMI_API_KEY}` }
    });
    return response.ok;
  } catch {
    return false;
  }
}
