/**
 * 题目历史记录管理 - 基于内容哈希的动态窗口去重
 * 解决题目内容重复和过度去重的问题
 */

const HISTORY_KEY = 'question_generated_history';
const MAX_STORAGE_SIZE = 4 * 1024 * 1024; // 4MB存储限制

// 内存缓存，提高性能
const memoryCache = new Map<string, any>();

interface HistoryRecord {
  subject: string;
  indices: number[];
  contentHashes: string[]; // 题目内容哈希值
  timestamp: number;
}

// 生成内容哈希值
function generateContentHash(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  return hash.toString(16);
}

// 计算动态窗口大小
function getDynamicWindowSize(subject: string): number {
  // 根据题库大小动态调整窗口大小
  const questionCounts = {
    chinese: 100, // 假设语文题库有100道题
    math: 100,    // 假设数学题库有100道题
    english: 100  // 假设英语题库有100道题
  };
  
  const questionCount = questionCounts[subject as keyof typeof questionCounts] || 100;
  // 动态窗口大小：题库越大，窗口越大，但不超过14天
  return Math.min(14, Math.max(3, Math.floor(questionCount / 15)));
}

// 检查并清理存储
function checkAndCleanStorage() {
  try {
    const usage = JSON.stringify(localStorage).length;
    if (usage > MAX_STORAGE_SIZE * 0.8) {
      // 清理最旧的历史记录
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        const history: HistoryRecord[] = JSON.parse(stored);
        // 按时间戳排序，保留最近的记录
        history.sort((a, b) => b.timestamp - a.timestamp);
        const cleanedHistory = history.slice(0, Math.floor(history.length * 0.7));
        localStorage.setItem(HISTORY_KEY, JSON.stringify(cleanedHistory));
        // 清除内存缓存
        memoryCache.clear();
      }
    }
  } catch (e) {
    console.error('清理存储失败:', e);
  }
}

// 获取已生成的题目索引和内容哈希
export function getGeneratedIndices(subject: string): number[] {
  const cacheKey = `indices_${subject}`;
  
  // 尝试从内存缓存获取
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) {
      memoryCache.set(cacheKey, []);
      return [];
    }
    
    const history: HistoryRecord[] = JSON.parse(stored);
    const now = Date.now();
    const windowDays = getDynamicWindowSize(subject);
    const windowStart = now - windowDays * 24 * 60 * 60 * 1000;
    
    // 只保留动态窗口内的记录，并按科目筛选
    const indices = history
      .filter(record => record.timestamp > windowStart && record.subject === subject)
      .flatMap(record => record.indices);
    
    // 缓存结果
    memoryCache.set(cacheKey, indices);
    return indices;
  } catch (e) {
    console.error('获取已生成题目索引失败:', e);
    memoryCache.set(cacheKey, []);
    return [];
  }
}

// 获取已生成的题目内容哈希
export function getGeneratedContentHashes(subject: string): string[] {
  const cacheKey = `hashes_${subject}`;
  
  // 尝试从内存缓存获取
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) {
      memoryCache.set(cacheKey, []);
      return [];
    }
    
    const history: HistoryRecord[] = JSON.parse(stored);
    const now = Date.now();
    const windowDays = getDynamicWindowSize(subject);
    const windowStart = now - windowDays * 24 * 60 * 60 * 1000;
    
    // 只保留动态窗口内的记录，并按科目筛选
    const hashes = history
      .filter(record => record.timestamp > windowStart && record.subject === subject)
      .flatMap(record => record.contentHashes || []);
    
    // 缓存结果
    memoryCache.set(cacheKey, hashes);
    return hashes;
  } catch (e) {
    console.error('获取已生成题目哈希失败:', e);
    memoryCache.set(cacheKey, []);
    return [];
  }
}

// 保存已生成的题目索引和内容哈希
export function saveGeneratedIndices(subject: string, indices: number[], questions?: { content: string }[]) {
  try {
    // 检查并清理存储
    checkAndCleanStorage();
    
    const stored = localStorage.getItem(HISTORY_KEY);
    const history: HistoryRecord[] = stored ? JSON.parse(stored) : [];
    
    // 生成内容哈希值
    const contentHashes = questions ? questions.map(q => generateContentHash(q.content)) : [];
    
    // 添加新记录
    history.push({
      subject,
      indices,
      contentHashes,
      timestamp: Date.now()
    });
    
    // 清理过期记录（超过动态窗口的）
    const now = Date.now();
    const windowDays = getDynamicWindowSize(subject);
    const windowStart = now - windowDays * 24 * 60 * 60 * 1000;
    const cleanedHistory = history.filter(record => record.timestamp > windowStart);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(cleanedHistory));
    
    // 清除相关缓存
    memoryCache.delete(`indices_${subject}`);
    memoryCache.delete(`hashes_${subject}`);
  } catch (e) {
    console.error('保存题目历史失败:', e);
  }
}

// 检查题目内容是否已生成
export function isContentGenerated(subject: string, content: string): boolean {
  const hashes = getGeneratedContentHashes(subject);
  const hash = generateContentHash(content);
  return hashes.includes(hash);
}

// 清除所有历史记录（用于测试）
export function clearAllHistory() {
  localStorage.removeItem(HISTORY_KEY);
  // 清除所有内存缓存
  memoryCache.clear();
}

// 清除特定科目的历史记录
export function clearSubjectHistory(subject: string) {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return;
    
    const history: HistoryRecord[] = JSON.parse(stored);
    const filtered = history.filter(record => record.subject !== subject);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
    
    // 清除相关内存缓存
    memoryCache.delete(`indices_${subject}`);
    memoryCache.delete(`hashes_${subject}`);
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
