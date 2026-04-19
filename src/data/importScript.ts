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
async function importQuestionsFromFile(file?: File) {
  try {
    let questionsData: any[] = [];
    
    if (file) {
      // 读取真实文件
      const fileContent = await readFileAsText(file);
      const parsedData = JSON.parse(fileContent);
      
      if (parsedData.questions && Array.isArray(parsedData.questions)) {
        questionsData = parsedData.questions;
      } else if (Array.isArray(parsedData)) {
        // 支持直接是数组的格式
        questionsData = parsedData;
      } else {
        throw new Error('文件格式错误，缺少 questions 数组或直接数组');
      }
    } else {
      // 模拟导入（用于测试）
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
        },
        {
          "subject": "chinese",
          "type": "multiple_choice",
          "difficulty": "easy",
          "content": "下列加点字的读音完全正确的一项是？",
          "options": ["粗犷（kuàng） 妒忌（jì）", "勉强（qiǎng） 教诲（huì）", "脂肪（zhǐ） 追溯（sù）", "炽热（zhì） 惬意（qiè）"],
          "answer": "勉强（qiǎng） 教诲（huì）",
          "explanation": "A选项“粗犷”的“犷”应读guǎng；C选项“脂肪”的“脂”应读zhī；D选项“炽热”的“炽”应读chì，只有B选项读音全部正确。",
          "tags": ["字音辨析", "基础知识"]
        },
        {
          "subject": "english",
          "type": "multiple_choice",
          "difficulty": "easy",
          "content": "找出下列单词中划线部分发音不同的一项？",
          "options": ["c<u>a</u>ke", "n<u>a</u>me", "h<u>a</u>t", "m<u>a</u>ke"],
          "answer": "h<u>a</u>t",
          "explanation": "A、B、D选项中字母a的发音是/eɪ/，C选项中字母a的发音是/æ/，因此发音不同的是C选项。",
          "tags": ["语音辨析", "元音发音"]
        }
      ];
      questionsData = mockQuestions;
    }
    
    // 处理题目，添加必要字段
    const processedQuestions: Question[] = questionsData.map((q: any, index: number) => {
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
    
    // 保存到本地存储并获取导入结果
    const result = saveQuestionsToLocalStorage(processedQuestions);
    
    console.log(`成功导入 ${result.success} 道题目，${result.duplicate} 道题目已存在`);
    
    // 返回带有导入结果的题目数组
    return {
      questions: processedQuestions,
      result: result
    };
  } catch (error) {
    console.error('导入题目失败:', error);
    throw error;
  }
}

// 读取文件为文本
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('读取文件失败'));
      }
    };
    reader.onerror = () => {
      reject(new Error('读取文件失败'));
    };
    reader.readAsText(file);
  });
}

// 保存题目到本地存储，返回导入结果
function saveQuestionsToLocalStorage(questions: Question[]): { success: number; duplicate: number } {
  try {
    // 读取现有题库
    const existingQuestions = JSON.parse(localStorage.getItem('user_questions') || '[]');
    
    // 计算重复数量（包括与现有题库的重复和本次导入题目之间的重复）
    const existingHashes = new Set(existingQuestions.map((q: Question) => q.contentHash));
    const processedHashes = new Set<string>(); // 用于检测本次导入题目之间的重复
    let duplicateCount = 0;
    let successCount = 0;
    
    const newQuestions = questions.filter(q => {
      // 检查是否与现有题库重复
      if (q.contentHash && existingHashes.has(q.contentHash)) {
        duplicateCount++;
        return false;
      }
      
      // 检查本次导入题目之间是否有重复
      if (q.contentHash && processedHashes.has(q.contentHash)) {
        duplicateCount++;
        return false;
      }
      
      // 记录已处理的哈希值
      if (q.contentHash) {
        processedHashes.add(q.contentHash);
      }
      
      successCount++;
      return true;
    });
    
    // 合并题目
    const allQuestions = [...existingQuestions, ...newQuestions];
    
    // 保存回本地存储
    localStorage.setItem('user_questions', JSON.stringify(allQuestions));
    
    return { success: successCount, duplicate: duplicateCount };
  } catch (error) {
    console.error('保存题目失败:', error);
    throw error;
  }
}

// 导出函数
export default importQuestionsFromFile;