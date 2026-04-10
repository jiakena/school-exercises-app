import type { Question } from '@/types';

const USER_QUESTIONS_KEY = 'user_questions';

// 获取所有用户题目
export const getQuestions = (): Question[] => {
  try {
    const stored = localStorage.getItem(USER_QUESTIONS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch (error) {
    console.error('获取题目失败:', error);
    return [];
  }
};

// 保存题目
export const saveQuestion = (question: Question): void => {
  try {
    const questions = getQuestions();
    const existingIndex = questions.findIndex(q => q.id === question.id);
    
    if (existingIndex >= 0) {
      // 更新现有题目
      questions[existingIndex] = question;
    } else {
      // 添加新题目
      questions.push(question);
    }
    
    localStorage.setItem(USER_QUESTIONS_KEY, JSON.stringify(questions));
  } catch (error) {
    console.error('保存题目失败:', error);
    throw error;
  }
};

// 更新题目
export const updateQuestion = (question: Question): void => {
  try {
    const questions = getQuestions();
    const index = questions.findIndex(q => q.id === question.id);
    
    if (index === -1) {
      throw new Error('题目不存在');
    }
    
    questions[index] = question;
    localStorage.setItem(USER_QUESTIONS_KEY, JSON.stringify(questions));
  } catch (error) {
    console.error('更新题目失败:', error);
    throw error;
  }
};

// 删除题目
export const deleteQuestion = (questionId: number): void => {
  try {
    const questions = getQuestions();
    const filteredQuestions = questions.filter(q => q.id !== questionId);
    localStorage.setItem(USER_QUESTIONS_KEY, JSON.stringify(filteredQuestions));
  } catch (error) {
    console.error('删除题目失败:', error);
    throw error;
  }
};

// 按学科获取题目
export const getQuestionsBySubject = (subject: string): Question[] => {
  const questions = getQuestions();
  return questions.filter(q => q.subject === subject);
};

// 生成新题目ID
export const generateQuestionId = (): number => {
  const questions = getQuestions();
  if (questions.length === 0) {
    return 1;
  }
  const maxId = Math.max(...questions.map(q => q.id));
  return maxId + 1;
};
