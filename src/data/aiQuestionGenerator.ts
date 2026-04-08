import type { Question, SubjectType, DifficultyLevel } from '@/types';
import { validateQuestion } from '@/utils/questionValidator';

// Kimi API 配置
const KIMI_API_KEY = 'sk-E8rRJlY8IAJ4tk0OXDQtRfTIR21Uy5RYmGaOOIyxz1tt9kSB';
const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

// AI生成状态缓存（避免重复请求）
const aiGenerateCache = new Map<string, Question[]>();

// 各科目的知识点提示词
const subjectPrompts: Record<SubjectType, string> = {
  chinese: `你是一位专业的小学语文老师，请为广东佛山市小学生（3-6年级）出题。
题型可以包括：古诗词填空、文言文阅读、名句出处、字词注音、近反义词、成语填空、病句修改、标点符号、关联词语、文学常识、修辞手法、阅读理解、写作训练等。
请确保题目符合小学语文课程标准，难度适中，贴近最新考点。`,

  math: `你是一位专业的小学数学老师，请为广东佛山市小学生（3-6年级）出题。
题型可以包括：四则运算、分数运算、小数运算、百分数、几何图形（平面图形周长面积、立体图形表面积体积）、应用题（行程问题、工程问题、浓度问题）、奥数题（鸡兔同笼、盈亏问题、植树问题）、找规律、时间计算、单位换算、最大公因数/最小公倍数等。
请确保题目符合小学数学课程标准，计算结果为整数或简单小数，题目具有一定的挑战性。`,

  english: `你是一位专业的小学英语老师，请为广东佛山市小学生（3-6年级）出题。
题型可以包括：be动词、时态（一般现在时/过去时/将来时/进行时）、情态动词、代词、介词、冠词、连词、比较级最高级、疑问句、感叹句、完形填空、语句转换、词汇运用、阅读理解等。
请确保题目符合小学英语课程标准，语言简单易懂，贴近日常生活场景。`
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
      geometry?: any;
    }) => ({
      subject,
      difficulty: (q.difficulty as DifficultyLevel) || 'medium',
      content: q.content || q.question || '',
      options: q.options || undefined,
      answer: q.answer || '',
      explanation: q.explanation || '',
      geometry: q.geometry || undefined
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

请生成 ${count} 道${difficultyDesc[difficulty]}的题目，题型可以混合选择题、填空题、简答题等。

严格按照以下JSON格式返回，不要有任何其他文字：
[
  {
    "content": "题目内容（选择题用___表示空白，数学题使用LaTeX格式的数学表达式）",
    "options": ["选项A", "选项B", "选项C", "选项D"], // 选择题必填，其他题型可选
    "answer": "正确答案（与options中的文字完全一致，或直接填写答案）",
    "explanation": "详细解析，说明解题思路和知识点",
    "difficulty": "${difficulty}",
    "geometry": { // 几何题可选，包含图形信息
      "type": "triangle", // 图形类型：triangle, circle, square, rectangle, line, polygon
      "width": 200, // 图形宽度
      "height": 200, // 图形高度
      "radius": 50, // 圆的半径（圆形必填）
      "annotations": [ // 图形标注
        { "x": 100, "y": 100, "text": "5cm", "position": "top" }
      ]
    }
  }
]

要求：
1. 题目内容清晰，无歧义，符合最新考点
2. 选择题要有4个选项，只有1个正确答案，干扰项要有一定迷惑性
3. 数学题使用LaTeX格式的数学表达式，如\frac{1}{2}表示分数
4. 几何题提供几何图形信息，便于前端渲染
5. 解析要详细说明解题思路和相关知识点
6. 确保答案100%正确，符合小学教学要求
7. 题目要有多样性，避免重复类型`;

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

    // 合并AI生成的题目
    const allAIQuestions = [...easyAI, ...mediumAI, ...hardAI];
    
    // 验证AI生成的题目，过滤掉不合格的
    const validAIQuestions: Question[] = [];
    for (const q of allAIQuestions) {
      const validation = validateQuestion(q as Question);
      if (validation.isValid) {
        validAIQuestions.push(q as Question);
      } else {
        console.warn('AI生成的题目验证失败，已过滤:', validation.errors);
      }
    }
    
    // 如果验证后题目不足，继续生成直到足够或达到最大尝试次数
    let attempts = 0;
    const maxAttempts = 3;
    while (validAIQuestions.length < needed && attempts < maxAttempts) {
      console.log(`验证后题目不足，继续生成... (尝试 ${attempts + 1}/${maxAttempts})`);
      const additionalNeeded = needed - validAIQuestions.length;
      const additionalQuestions = await generateAIQuestions(subject, 'medium', additionalNeeded);
      
      for (const q of additionalQuestions) {
        const validation = validateQuestion(q as Question);
        if (validation.isValid) {
          validAIQuestions.push(q as Question);
        }
      }
      attempts++;
    }

    const aiQuestionsWithId = validAIQuestions.map((q, i) => ({
      ...q,
      id: staticQuestions.length + i + 1
    }));

    return [...staticQuestions, ...aiQuestionsWithId].slice(0, targetCount);
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
