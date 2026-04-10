import type { Question } from '@/types';

// 生成内容哈希
function generateContentHash(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

// 从文件导入题目
export async function importQuestionsFromFile(): Promise<Question[]> {
  try {
    // 读取文件内容
    // 注意：在浏览器环境中，我们不能直接读取本地文件
    // 这里我们模拟导入，实际项目中需要使用文件上传
    const mockQuestions = [
      {
        "subject": "math",
        "type": "multiple_choice",
        "difficulty": "easy",
        "content": "下列单位换算正确的是？",
        "options": ["3.05平方米 = 305平方分米", "2.5小时 = 250分钟", "0.8千克 = 80克", "1.02千米 = 102米"],
        "answer": "3.05平方米 = 305平方分米",
        "explanation": "单位换算需要记住进率：1平方米=100平方分米，3.05×100=305，因此A正确；1小时=60分钟，2.5小时=150分钟，B错误；1千克=1000克，0.8千克=800克，C错误；1千米=1000米，1.02千米=1020米，D错误。",
        "tags": ["单位换算", "量与计量"]
      }
    ];
    
    // 处理题目，添加必要字段
    const processedQuestions: Question[] = mockQuestions.map((q: any, index: number) => {
      const question: Question = {
        id: Date.now() + index,
        subject: q.subject,
        difficulty: q.difficulty as any,
        content: q.content,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
        tags: q.tags || [],
        source: 'user',
        createdAt: Date.now(),
        contentHash: generateContentHash(q.content)
      };
      return question;
    });
    
    console.log(`成功导入 ${processedQuestions.length} 道题目`);
    
    // 保存到本地存储
    saveQuestionsToLocalStorage(processedQuestions);
    
    return processedQuestions;
  } catch (error) {
    console.error('导入题目失败:', error);
    return [];
  }
}

// 保存题目到本地存储
function saveQuestionsToLocalStorage(questions: Question[]): void {
  try {
    // 读取现有题库
    const existingQuestions = JSON.parse(localStorage.getItem('user_questions') || '[]');
    
    // 合并题目，去重
    const allQuestions = [...existingQuestions, ...questions];
    const uniqueQuestions = deduplicateQuestions(allQuestions);
    
    // 保存回本地存储
    localStorage.setItem('user_questions', JSON.stringify(uniqueQuestions));
    
    console.log(`成功保存 ${uniqueQuestions.length} 道题目到本地存储`);
  } catch (error) {
    console.error('保存题目失败:', error);
  }
}

// 去重题目
function deduplicateQuestions(questions: Question[]): Question[] {
  const seenHashes = new Set<string>();
  return questions.filter(q => {
    if (q.contentHash) {
      if (seenHashes.has(q.contentHash)) {
        return false;
      }
      seenHashes.add(q.contentHash);
    }
    return true;
  });
}

// 导出导入函数
export default importQuestionsFromFile;