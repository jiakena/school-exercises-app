// 学科类型
export type SubjectType = 'chinese' | 'math' | 'english';

// 难度级别
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// 题目接口
export interface Question {
  id: number;
  subject: SubjectType;
  difficulty: DifficultyLevel;
  content: string;
  options?: string[];
  answer: string;
  explanation: string;
}

// 学科配置
export interface SubjectConfig {
  id: SubjectType;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  icon: string;
}

// 生成配置
export interface GenerateConfig {
  subject: SubjectType;
  count: number;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
}
