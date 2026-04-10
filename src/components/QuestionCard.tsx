import { Edit, Trash2 } from 'lucide-react';
import type { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  onEdit: () => void;
  onDelete: () => void;
}

// 学科颜色映射
const subjectColors = {
  chinese: 'bg-blue-50 border-blue-200',
  math: 'bg-green-50 border-green-200',
  english: 'bg-yellow-50 border-yellow-200'
};

// 学科名称映射
const subjectNames = {
  chinese: '语文',
  math: '数学',
  english: '英语'
};

// 难度标签映射
const difficultyLabels = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
};

// 难度颜色映射
const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800'
};

export default function QuestionCard({ question, onEdit, onDelete }: QuestionCardProps) {
  // 截取题目内容预览
  const contentPreview = question.content.length > 50 
    ? question.content.substring(0, 50) + '...' 
    : question.content;

  return (
    <div className={`
      p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow
      ${subjectColors[question.subject]}
    `}>
      {/* 顶部信息 */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {subjectNames[question.subject]}
          </span>
          <span className={`
            text-xs px-2 py-1 rounded-full
            ${difficultyColors[question.difficulty]}
          `}>
            {difficultyLabels[question.difficulty]}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={onEdit}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors"
            title="编辑"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors"
            title="删除"
          >
            <Trash2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* 题目内容 */}
      <div className="text-gray-700 mb-3">
        {contentPreview}
      </div>

      {/* 底部信息 */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>ID: {question.id}</span>
        {question.options && (
          <span>选项: {question.options.length}个</span>
        )}
      </div>
    </div>
  );
}
