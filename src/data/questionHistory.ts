/**
 * 题目历史记录管理 - 7天滑动窗口去重
 * 解决题目隔天重复出现的问题
 */

const HISTORY_KEY = 'question_generated_history';
const WINDOW_DAYS = 7; // 7天滑动窗口

interface HistoryRecord {
  subject: string;
  indices: number[];
  timestamp: number;
}

// 获取7天内已生成的题目索引
export function getGeneratedIndices(subject: string): number[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return [];
    
    const history: HistoryRecord[] = JSON.parse(stored);
    const now = Date.now();
    const windowStart = now - WINDOW_DAYS * 24 * 60 * 60 * 1000;
    
    // 只保留7天内的记录，并按科目筛选
    return history
      .filter(record => record.timestamp > windowStart && record.subject === subject)
      .flatMap(record => record.indices);
  } catch {
    return [];
  }
}

// 保存已生成的题目索引
export function saveGeneratedIndices(subject: string, indices: number[]) {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    const history: HistoryRecord[] = stored ? JSON.parse(stored) : [];
    
    // 添加新记录
    history.push({
      subject,
      indices,
      timestamp: Date.now()
    });
    
    // 清理过期记录（超过7天的）
    const now = Date.now();
    const windowStart = now - WINDOW_DAYS * 24 * 60 * 60 * 1000;
    const cleanedHistory = history.filter(record => record.timestamp > windowStart);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(cleanedHistory));
  } catch (e) {
    console.error('保存题目历史失败:', e);
  }
}

// 清除所有历史记录（用于测试）
export function clearAllHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

// 清除特定科目的历史记录
export function clearSubjectHistory(subject: string) {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return;
    
    const history: HistoryRecord[] = JSON.parse(stored);
    const filtered = history.filter(record => record.subject !== subject);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('清除科目历史失败:', e);
  }
}

/**
 * 随机打乱选项顺序（Fisher-Yates洗牌算法）
 * 解决答案位置固定的问题
 */
export function shuffleOptions<T extends { options?: string[]; answer: string }>(question: T): T {
  if (!question.options || question.options.length <= 2) {
    return question; // 2个选项的判断题不打乱
  }
  
  // 记录正确答案
  const correctAnswer = question.answer;
  
  // 创建带标记的选项数组
  const optionsWithMark = question.options.map(opt => ({
    text: opt,
    isCorrect: opt === correctAnswer
  }));
  
  // Fisher-Yates 洗牌
  for (let i = optionsWithMark.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithMark[i], optionsWithMark[j]] = [optionsWithMark[j], optionsWithMark[i]];
  }
  
  // 找到正确答案的新位置
  const newAnswer = optionsWithMark.find(opt => opt.isCorrect)?.text || correctAnswer;
  
  return {
    ...question,
    options: optionsWithMark.map(opt => opt.text),
    answer: newAnswer
  };
}

/**
 * 批量打乱题目选项
 */
export function shuffleAllOptions<T extends { options?: string[]; answer: string }>(questions: T[]): T[] {
  return questions.map(shuffleOptions);
}
