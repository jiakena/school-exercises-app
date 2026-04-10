import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, BookOpen, Calculator, Languages } from 'lucide-react';
import { toast } from 'sonner';
import type { Question, SubjectType } from '@/types';
import QuestionCard from '@/components/QuestionCard';
import QuestionEditModal from '@/components/QuestionEditModal';
import { getQuestions, deleteQuestion } from '@/utils/questionManager';
import importQuestionsFromFile from '@/data/importScript';

interface QuestionManagementSectionProps {
  onBack: () => void;
}

// 学科配置
const subjects = [
  {
    id: 'chinese' as SubjectType,
    name: '语文',
    icon: BookOpen,
    color: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-600'
  },
  {
    id: 'math' as SubjectType,
    name: '数学',
    icon: Calculator,
    color: 'bg-green-50 border-green-200',
    textColor: 'text-green-600'
  },
  {
    id: 'english' as SubjectType,
    name: '英语',
    icon: Languages,
    color: 'bg-yellow-50 border-yellow-200',
    textColor: 'text-yellow-600'
  }
];

export default function QuestionManagementSection({ onBack }: QuestionManagementSectionProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'subject'>('home');
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | null>(null);

  // 加载题目
  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const loadedQuestions = getQuestions();
      setQuestions(loadedQuestions);
    } catch (error) {
      console.error('加载题目失败:', error);
      toast.error('加载题目失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 处理导入
  const handleImport = () => {
    // 创建隐藏的文件输入框
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json,.txt';
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const loadingToast = toast.loading('正在导入题目...');
        
        try {
          setIsImporting(true);

          const importResult = await importQuestionsFromFile(file);
          const { result } = importResult;
          
          // 关闭 loading toast
          toast.dismiss(loadingToast);
          
          // 显示导入结果
          if (result.success > 0 && result.duplicate > 0) {
            toast.success(`成功导入 ${result.success} 道题目，${result.duplicate} 道题目已存在`);
            loadQuestions();
          } else if (result.success > 0) {
            toast.success(`成功导入 ${result.success} 道题目`);
            loadQuestions();
          } else if (result.duplicate > 0) {
            toast.info(`${result.duplicate} 道题目已存在，无需导入`);
          } else {
            toast.info('没有导入新题目');
          }
        } catch (error) {
          console.error('导入失败:', error);
          // 关闭 loading toast
          toast.dismiss(loadingToast);
          toast.error('导入失败，请重试');
        } finally {
          setIsImporting(false);
        }
      }
    };
    fileInput.click();
  };

  // 处理同步题库
  const handleSync = async () => {
    const loadingToast = toast.loading('正在同步题库...');
    
    try {
      setIsImporting(true);

      // 读取内置题库.txt文件
      const response = await fetch('/内置题库.txt');
      if (!response.ok) {
        throw new Error('读取内置题库文件失败');
      }

      const fileContent = await response.text();
      const parsedData = JSON.parse(fileContent);
      
      if (parsedData && Array.isArray(parsedData)) {
        const totalQuestions = parsedData.length;
        let processedCount = 0;
        let successCount = 0;
        let duplicateCount = 0;
        const batchSize = 50; // 每批处理50道题
        
        // 分批处理题目
        for (let i = 0; i < totalQuestions; i += batchSize) {
          const batch = parsedData.slice(i, i + batchSize);
          
          // 处理这批题目
          const processedBatch: Question[] = batch.map((q: any, index: number) => {
            const question: Question = {
              id: Date.now() + i + index,
              subject: q.subject,
              difficulty: q.difficulty as any,
              content: q.content,
              options: q.options,
              answer: q.answer,
              explanation: q.explanation,
              tags: q.tags || [],
              source: 'builtin',
              createdAt: Date.now(),
              contentHash: generateContentHash(q.content)
            };
            return question;
          });
          
          // 保存这批题目
          const result = saveQuestionsToLocalStorage(processedBatch);
          successCount += result.success;
          duplicateCount += result.duplicate;
          processedCount += batch.length;
          
          // 更新进度
          const progress = Math.round((processedCount / totalQuestions) * 100);
          toast.loading(`正在同步题库... ${progress}%`, { id: 'sync-progress' });
          
          // 添加小延迟，避免UI阻塞
          if (i + batchSize < totalQuestions) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }

        // 关闭 loading toast
        toast.dismiss(loadingToast);
        toast.dismiss('sync-progress');

        // 显示导入结果
        if (successCount > 0 && duplicateCount > 0) {
          toast.success(`成功同步 ${successCount} 道题目，${duplicateCount} 道题目已存在`);
          loadQuestions();
        } else if (successCount > 0) {
          toast.success(`成功同步 ${successCount} 道题目`);
          loadQuestions();
        } else if (duplicateCount > 0) {
          toast.info(`${duplicateCount} 道题目已存在，无需同步`);
        } else {
          toast.info('没有同步新题目');
        }
      } else {
        throw new Error('内置题库文件格式错误');
      }
    } catch (error) {
      console.error('同步失败:', error);
      // 关闭 loading toast
      toast.dismiss(loadingToast);
      toast.dismiss('sync-progress');
      toast.error(`同步失败: ${(error as Error).message || '请重试'}`);
    } finally {
      setIsImporting(false);
    }
  };

  // 生成内容哈希
  const generateContentHash = (content: string): string => {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  };

  // 保存题目到本地存储，返回导入结果
  const saveQuestionsToLocalStorage = (questions: Question[]): { success: number; duplicate: number } => {
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
  };

  // 处理编辑
  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setIsEditModalOpen(true);
  };

  // 处理删除
  const handleDelete = (questionId: number) => {
    if (window.confirm('确定要删除这道题目吗？')) {
      try {
        deleteQuestion(questionId);
        setQuestions(questions.filter(q => q.id !== questionId));
        toast.success('题目删除成功');
      } catch (error) {
        console.error('删除失败:', error);
        toast.error('删除失败，请重试');
      }
    }
  };

  // 处理编辑完成
  const handleEditComplete = () => {
    setIsEditModalOpen(false);
    loadQuestions();
  };

  // 处理学科选择
  const handleSelectSubject = (subject: SubjectType) => {
    setSelectedSubject(subject);
    setActiveView('subject');
  };

  // 处理返回首页
  const handleBackToHome = () => {
    setActiveView('home');
    setSelectedSubject(null);
  };

  // 按学科筛选题目
  const getSubjectQuestions = (subject: SubjectType) => {
    return questions.filter(q => q.subject === subject);
  };

  return (
    <section className="py-12 px-4 min-h-screen" style={{ background: '#F5F7FA' }}>
      <div className="max-w-6xl mx-auto">
        {/* 顶部导航 */}
        <div className="flex items-center mb-8">
          {activeView === 'subject' ? (
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回学科列表</span>
            </button>
          ) : (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回</span>
            </button>
          )}
          <h2
            className="text-3xl font-bold ml-6"
            style={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}
          >
            {activeView === 'subject' && selectedSubject ? 
              `${subjects.find(s => s.id === selectedSubject)?.name}题库` : 
              '题库管理'
            }
          </h2>
        </div>

        {/* 操作栏 */}
        {activeView === 'home' && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              共 <span className="font-semibold">{questions.length}</span> 道题目
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleImport}
                disabled={isImporting}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                  transition-all duration-300
                  ${isImporting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                  }
                `}
              >
                <Upload className="w-5 h-5" />
                <span>{isImporting ? '导入中...' : '导入题目'}</span>
              </button>
              <button
                onClick={handleSync}
                disabled={isImporting}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                  transition-all duration-300
                  ${isImporting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
                  }
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{isImporting ? '同步中...' : '同步题库'}</span>
              </button>
            </div>
          </div>
        )}

        {/* 学科分类页面 */}
        {activeView === 'home' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              const subjectQuestions = getSubjectQuestions(subject.id);
              return (
                <div
                  key={subject.id}
                  className={`
                    p-6 rounded-xl border shadow-sm hover:shadow-md transition-all
                    ${subject.color}
                  `}
                  onClick={() => handleSelectSubject(subject.id)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center
                      ${subject.textColor}
                    `}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{subject.name}</h3>
                      <p className="text-gray-600">
                        {subjectQuestions.length} 道题目
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      className="px-4 py-2 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectSubject(subject.id);
                      }}
                    >
                      查看题目
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 学科详情页面 */}
        {activeView === 'subject' && selectedSubject && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                共 <span className="font-semibold">{getSubjectQuestions(selectedSubject).length}</span> 道题目
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-gray-500">加载中...</div>
              </div>
            ) : getSubjectQuestions(selectedSubject).length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 mb-4">该学科暂无题目</p>
                <button
                  onClick={handleImport}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  导入题目
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getSubjectQuestions(selectedSubject).map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onEdit={() => handleEdit(question)}
                    onDelete={() => handleDelete(question.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 编辑模态框 */}
        {isEditModalOpen && editingQuestion && (
          <QuestionEditModal
            question={editingQuestion}
            onClose={() => setIsEditModalOpen(false)}
            onComplete={handleEditComplete}
          />
        )}
      </div>
    </section>
  );
}
