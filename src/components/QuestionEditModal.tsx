import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { Question } from '@/types';
import { updateQuestion } from '@/utils/questionManager';

interface QuestionEditModalProps {
  question: Question;
  onClose: () => void;
  onComplete: () => void;
}

// 学科选项
const subjectOptions = [
  { value: 'chinese', label: '语文' },
  { value: 'math', label: '数学' },
  { value: 'english', label: '英语' }
];

// 难度选项
const difficultyOptions = [
  { value: 'easy', label: '简单' },
  { value: 'medium', label: '中等' },
  { value: 'hard', label: '困难' }
];

export default function QuestionEditModal({ question, onClose, onComplete }: QuestionEditModalProps) {
  const [formData, setFormData] = useState<Question>({ ...question });
  const [isLoading, setIsLoading] = useState(false);
  const [optionCount, setOptionCount] = useState(formData.options?.length || 2);

  // 当题目变化时更新表单数据
  useEffect(() => {
    setFormData({ ...question });
    setOptionCount(question.options?.length || 2);
  }, [question]);

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理选项变化
  const handleOptionChange = (index: number, value: string) => {
    setFormData(prev => {
      const newOptions = [...(prev.options || [])];
      newOptions[index] = value;
      return {
        ...prev,
        options: newOptions
      };
    });
  };

  // 处理选项数量变化
  const handleOptionCountChange = (delta: number) => {
    const newCount = Math.max(2, Math.min(4, optionCount + delta));
    setOptionCount(newCount);
    
    setFormData(prev => {
      const currentOptions = prev.options || [];
      const newOptions = [...currentOptions];
      
      if (newCount > currentOptions.length) {
        // 添加新选项
        for (let i = currentOptions.length; i < newCount; i++) {
          newOptions.push('');
        }
      } else {
        // 减少选项
        newOptions.splice(newCount);
      }
      
      return {
        ...prev,
        options: newOptions
      };
    });
  };

  // 处理提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!formData.content.trim()) {
      toast.error('题目内容不能为空');
      return;
    }
    
    if (!formData.answer.trim()) {
      toast.error('答案不能为空');
      return;
    }
    
    if (formData.options && formData.options.length > 0) {
      const hasEmptyOption = formData.options.some(opt => !opt.trim());
      if (hasEmptyOption) {
        toast.error('选项不能为空');
        return;
      }
    }

    try {
      setIsLoading(true);
      await updateQuestion(formData);
      toast.success('题目更新成功');
      onComplete();
    } catch (error) {
      console.error('更新失败:', error);
      toast.error('更新失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">编辑题目</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 学科 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">学科</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {subjectOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 难度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">难度</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {difficultyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 题目内容 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">题目内容</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="请输入题目内容"
            />
          </div>

          {/* 选项 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">选项</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleOptionCountChange(-1)}
                  disabled={optionCount <= 2}
                  className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  减少
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionCountChange(1)}
                  disabled={optionCount >= 4}
                  className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  增加
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {Array.from({ length: optionCount }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  value={formData.options?.[index] || ''}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={`选项 ${String.fromCharCode(65 + index)}`}
                />
              ))}
            </div>
          </div>

          {/* 答案 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">答案</label>
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="请输入答案"
            />
          </div>

          {/* 解析 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">解析</label>
            <textarea
              name="explanation"
              value={formData.explanation}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="请输入解析"
            />
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }
              `}
            >
              {isLoading ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
