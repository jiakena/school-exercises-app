// 学科类型
export type SubjectType = 'chinese' | 'math' | 'english';

// 难度级别
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// 几何图形接口
export interface Geometry {
  type: 'triangle' | 'circle' | 'square' | 'rectangle' | 'line' | 'polygon';
  width?: number;
  height?: number;
  radius?: number;
  points?: string;
  annotations?: Array<{
    x: number;
    y: number;
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
  }>;
}

// 题目接口
export interface Question {
  id: number;
  subject: SubjectType;
  difficulty: DifficultyLevel;
  content: string;
  options?: string[];
  answer: string;
  explanation: string;
  geometry?: Geometry;
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
