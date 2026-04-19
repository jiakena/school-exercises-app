import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { RefreshCw, Download, Eye, EyeOff, ChevronLeft, HelpCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SubjectType, Question } from '@/types';
import { generateChineseQuestions } from '@/data/chineseQuestions';
import { generateMathQuestions } from '@/data/mathQuestions';
import { generateEnglishQuestions } from '@/data/englishQuestions';
import { generateAIQuestions } from '@/data/aiQuestionGenerator';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import MathTextRenderer from '../components/MathTextRenderer';
import GeometryRenderer from '../components/GeometryRenderer';

interface QuestionSectionProps {
  subject: SubjectType;
  onBack: () => void;
}

const subjectConfig = {
  chinese: {
    name: '语文',
    color: '#4A90E2',
    bgColor: '#E3F2FD',
    generate: generateChineseQuestions
  },
  math: {
    name: '数学',
    color: '#7ED321',
    bgColor: '#E8F5E9',
    generate: generateMathQuestions
  },
  english: {
    name: '英语',
    color: '#F5A623',
    bgColor: '#FFF8E1',
    generate: generateEnglishQuestions
  }
};

export default function QuestionSection({ subject, onBack }: QuestionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);
  const answersRef = useRef<HTMLDivElement>(null);
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAnswers, setShowAnswers] = useState<Set<number>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);

  // 从本地存储加载题目
  const loadSavedQuestions = useCallback(() => {
    const savedKey = `saved_questions_${subject}`;
    const savedData = localStorage.getItem(savedKey);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // 检查是否包含时间戳和题目
        if (parsedData.questions && parsedData.timestamp) {
          const now = Date.now();
          const twelveHours = 12 * 60 * 60 * 1000; // 12小时的毫秒数
          // 如果未超过12小时，加载保存的题目
          if (now - parsedData.timestamp < twelveHours) {
            setQuestions(parsedData.questions);
            return true;
          }
          // 超过12小时，清除旧数据
          localStorage.removeItem(savedKey);
        } else {
          // 数据格式错误，清除错误数据
          localStorage.removeItem(savedKey);
        }
      } catch (error) {
        console.error('Failed to parse saved questions:', error);
        // 清除错误数据
        localStorage.removeItem(savedKey);
      }
    }
    return false;
  }, [subject]);

  // 保存题目到本地存储
  const saveQuestions = useCallback((questions: Question[]) => {
    const savedKey = `saved_questions_${subject}`;
    try {
      const dataToSave = {
        questions: questions,
        timestamp: Date.now() // 保存当前时间戳
      };
      localStorage.setItem(savedKey, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Failed to save questions:', error);
    }
  }, [subject]);

  // 生成题目
  const generateQuestions = useCallback(async () => {
    setIsGenerating(true);
    const config = subjectConfig[subject];
    let newQuestions = config.generate(10);
    
    // 如果题库不足，用AI补充
    if (newQuestions.length < 10) {
      toast.loading('题库不足，正在调用AI补充...', { id: 'ai-gen' });
      try {
        const aiQuestions = await generateAIQuestions(subject, 'medium', 10 - newQuestions.length);
        if (aiQuestions.length > 0) {
          newQuestions = [
            ...newQuestions,
            ...aiQuestions.map((q, i) => ({ ...q, id: newQuestions.length + i + 1 }))
          ];
          toast.success('AI已补充题目！', { id: 'ai-gen' });
        } else {
          toast.error('AI生成题目失败，题库不足', { id: 'ai-gen' });
        }
      } catch (error) {
        console.error('AI生成题目失败:', error);
        toast.error('AI生成题目失败，请稍后重试', { id: 'ai-gen' });
      }
    }
    
    // 检查题目数量
    if (newQuestions.length === 0) {
      toast.error('题库为空，请先同步题库');
      setIsGenerating(false);
      return;
    }
    
    // 动画效果
    if (cardsRef.current) {
      gsap.to(cardsRef.current.children, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        onComplete: () => {
          setQuestions(newQuestions);
          saveQuestions(newQuestions);
          setShowAnswers(new Set());
          setIsGenerating(false);
          
          setTimeout(() => {
            gsap.fromTo(cardsRef.current?.children || [],
              { x: -100, opacity: 0, rotation: -10 },
              { x: 0, opacity: 1, rotation: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
            );
          }, 50);
        }
      });
    } else {
      setQuestions(newQuestions);
      saveQuestions(newQuestions);
      setShowAnswers(new Set());
      setIsGenerating(false);
    }
  }, [subject, saveQuestions]);

  // 检查是否可以刷新题目
  const canRefreshQuestions = useCallback(() => {
    const savedKey = `saved_questions_${subject}`;
    const savedData = localStorage.getItem(savedKey);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.questions && parsedData.timestamp) {
          const now = Date.now();
          const twelveHours = 12 * 60 * 60 * 1000;
          // 如果未超过12小时，不允许刷新
          return now - parsedData.timestamp >= twelveHours;
        } else {
          // 数据格式错误，清除错误数据
          localStorage.removeItem(savedKey);
        }
      } catch (error) {
        console.error('Failed to parse saved questions:', error);
        // 清除错误数据
        localStorage.removeItem(savedKey);
      }
    }
    // 没有保存的题目，允许生成
    return true;
  }, [subject]);

  // 获取剩余时间（小时和分钟）
  const getRemainingTime = useCallback(() => {
    const savedKey = `saved_questions_${subject}`;
    const savedData = localStorage.getItem(savedKey);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.questions && parsedData.timestamp) {
          const now = Date.now();
          const twelveHours = 12 * 60 * 60 * 1000;
          const elapsed = now - parsedData.timestamp;
          const remaining = twelveHours - elapsed;
          
          if (remaining > 0) {
            const hours = Math.floor(remaining / (60 * 60 * 1000));
            const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
            return `${hours}小时${minutes}分钟`;
          }
        } else {
          // 数据格式错误，清除错误数据
          localStorage.removeItem(savedKey);
        }
      } catch (error) {
        console.error('Failed to parse saved questions:', error);
        // 清除错误数据
        localStorage.removeItem(savedKey);
      }
    }
    return null;
  }, [subject]);

  // 初始生成
  useEffect(() => {
    // 尝试从本地存储加载题目
    const savedKey = `saved_questions_${subject}`;
    const savedData = localStorage.getItem(savedKey);
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.questions && parsedData.timestamp) {
          const now = Date.now();
          const twelveHours = 12 * 60 * 60 * 1000;
          if (now - parsedData.timestamp < twelveHours) {
            setQuestions(parsedData.questions);
            return;
          }
          localStorage.removeItem(savedKey);
        } else {
          localStorage.removeItem(savedKey);
        }
      } catch (error) {
        console.error('Failed to parse saved questions:', error);
        localStorage.removeItem(savedKey);
      }
    }
    
    // 没有保存的题目或已过期，生成新题目
    generateQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);

  // 切换答案显示
  const toggleAnswer = (id: number) => {
    setShowAnswers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // 下载图片 - 修复版
  const downloadImage = async (type: 'questions' | 'answers') => {
    const targetRef = type === 'questions' ? questionsRef : answersRef;
    
    if (!targetRef.current) {
      toast.error('无法找到内容');
      return;
    }

    try {
      toast.loading('正在生成图片...', { id: 'download' });
      
      // 确保元素完全渲染
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const element = targetRef.current;
      
      // 克隆元素以避免修改原DOM
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      clone.style.width = element.offsetWidth + 'px';
      clone.style.zIndex = '-9999';
      document.body.appendChild(clone);
      
      // 等待克隆元素渲染
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const canvas = await html2canvas(clone, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        removeContainer: false,
        imageTimeout: 0
      });

      // 移除克隆元素
      document.body.removeChild(clone);

      // 转换为图片
      const imageData = canvas.toDataURL('image/png');
      
      // 创建下载链接
      const link = document.createElement('a');
      const dateStr = new Date().toLocaleDateString('zh-CN').replace(/\//g, '-');
      link.download = `${subjectConfig[subject].name}_${type === 'questions' ? '练习题' : '答案解析'}_${dateStr}.png`;
      link.href = imageData;
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('图片下载成功！', { id: 'download' });
    } catch (error) {
      console.error('Download error:', error);
      toast.error('图片生成失败，请重试', { id: 'download' });
    }
  };

  // 分享功能
  const shareImage = async (type: 'questions' | 'answers') => {
    const targetRef = type === 'questions' ? questionsRef : answersRef;
    
    if (!targetRef.current) return;

    try {
      toast.loading('正在准备分享...', { id: 'share' });
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const element = targetRef.current;
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      clone.style.width = element.offsetWidth + 'px';
      document.body.appendChild(clone);
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const canvas = await html2canvas(clone, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      });

      document.body.removeChild(clone);

      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error('生成图片失败', { id: 'share' });
          return;
        }

        const file = new File([blob], `${subjectConfig[subject].name}_${type === 'questions' ? '练习题' : '答案'}.png`, { type: 'image/png' });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `${subjectConfig[subject].name}练习题`,
              text: `每日${subjectConfig[subject].name}练习`
            });
            toast.success('分享成功！', { id: 'share' });
          } catch (err) {
            downloadImage(type);
          }
        } else {
          downloadImage(type);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Share error:', error);
      downloadImage(type);
    }
  };

  const config = subjectConfig[subject];

  return (
    <section
      ref={sectionRef}
      className="py-12 px-4 min-h-screen"
      style={{ background: '#F5F7FA' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            返回
          </Button>
          
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: 'Nunito, sans-serif', color: config.color }}
          >
            {config.name}每日练习
          </h2>
          
          <Button
            variant="outline"
            onClick={() => {
              if (!canRefreshQuestions()) {
                const remainingTime = getRemainingTime();
                toast.error(`12小时内只能生成一次题目，还需等待 ${remainingTime}`);
                return;
              }
              generateQuestions();
            }}
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            刷新
          </Button>
        </div>

        {/* 提示信息 */}
        <div 
          className="mb-6 p-4 rounded-xl text-sm"
          style={{ background: config.bgColor, color: '#333' }}
        >
          <p>12小时内只能生成一次题目，确保练习的连续性！</p>
          <p className="text-xs mt-2 text-gray-600">💡 题库不足时会自动调用AI补充新题目</p>
        </div>

        {/* 题目卡片 */}
        <div 
          ref={questionsRef} 
          className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-6"
          style={{ 
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{config.name}练习题</h3>
              <p className="text-sm text-gray-500">共10道题，难度由易到难</p>
            </div>
            <div
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: config.bgColor, color: config.color }}
            >
              {new Date().toLocaleDateString('zh-CN')}
            </div>
          </div>

          <div ref={cardsRef} className="space-y-4">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className="border border-gray-200 rounded-2xl p-4 md:p-6"
                style={{ 
                  backgroundColor: '#ffffff', 
                  maxWidth: '100%', 
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'normal',
                  overflowX: 'hidden'
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: index < 4 ? '#E8F5E9' : index < 8 ? '#FFF8E1' : '#FFEBEE',
                      color: index < 4 ? '#7ED321' : index < 8 ? '#F5A623' : '#D0021B'
                    }}
                  >
                    {q.id}
                  </span>
                  <div className="flex-1" style={{ 
                    overflowWrap: 'break-word', 
                    wordBreak: 'break-word',
                    whiteSpace: 'normal',
                    overflowX: 'hidden'
                  }}>
                    <p className="text-gray-800 mb-3" style={{ 
                      fontFamily: 'Open Sans, sans-serif', 
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      margin: 0,
                      padding: 0
                    }}>
                      <MathTextRenderer content={q.content} />
                    </p>
                    {q.geometry && (
                      <div className="mb-4 flex justify-center">
                        <GeometryRenderer 
                          type={q.geometry.type}
                          width={q.geometry.width}
                          height={q.geometry.height}
                          radius={q.geometry.radius}
                          points={q.geometry.points}
                          annotations={q.geometry.annotations}
                        />
                      </div>
                    )}
                    {q.options && (
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {q.options.map((opt, i) => (
                          <div
                            key={i}
                            className="px-3 py-2 rounded-lg text-sm text-gray-600"
                            style={{ 
                              backgroundColor: '#f9fafb',
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              whiteSpace: 'normal'
                            }}
                          >
                            {String.fromCharCode(65 + i)}. <MathTextRenderer content={opt} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 答案解析卡片 */}
        <div 
          ref={answersRef} 
          className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-6"
          style={{ 
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">答案解析</h3>
              <p className="text-sm text-gray-500">点击查看详细解析</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                if (showAnswers.size === questions.length) {
                  setShowAnswers(new Set());
                } else {
                  setShowAnswers(new Set(questions.map(q => q.id)));
                }
              }}
              className="flex items-center gap-2"
            >
              {showAnswers.size === questions.length ? (
                <><EyeOff className="w-4 h-4" /> 全部隐藏</>
              ) : (
                <><Eye className="w-4 h-4" /> 全部显示</>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            {questions.map((q) => (
              <div
                key={`answer-${q.id}`}
                className="border border-gray-200 rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#ffffff', maxWidth: '100%', wordWrap: 'break-word' }}
              >
                <div
                  className="w-full px-4 md:px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleAnswer(q.id)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: config.bgColor, color: config.color }}
                    >
                      {q.id}
                    </span>
                    {showAnswers.has(q.id) ? (
                      <span className="font-semibold text-gray-700 flex-1" style={{ wordWrap: 'break-word' }}>
                        答案：<MathTextRenderer content={q.answer} />
                      </span>
                    ) : (
                      <span className="text-gray-500 flex-1">点击查看答案</span>
                    )}
                  </div>
                  {showAnswers.has(q.id) ? (
                    <EyeOff className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <HelpCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
                
                {showAnswers.has(q.id) && (
                  <div className="px-4 md:px-6 pb-4 pl-16">
                    <div
                      className="p-4 rounded-xl text-sm"
                      style={{ background: config.bgColor, color: '#333', wordWrap: 'break-word' }}
                    >
                      <strong>解析：</strong>
                      <MathTextRenderer content={q.explanation} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 下载按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => downloadImage('questions')}
            className="flex items-center gap-2 px-6"
            style={{ background: config.color }}
          >
            <Download className="w-4 h-4" />
            下载题目图片
          </Button>
          <Button
            onClick={() => downloadImage('answers')}
            variant="outline"
            className="flex items-center gap-2 px-6"
          >
            <Download className="w-4 h-4" />
            下载答案图片
          </Button>
          <Button
            onClick={() => shareImage('questions')}
            variant="secondary"
            className="flex items-center gap-2 px-6"
          >
            <Share2 className="w-4 h-4" />
            分享/保存
          </Button>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl text-sm text-gray-600">
          <p className="font-semibold mb-2">💡 使用提示：</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>点击"下载题目图片"可将练习题保存到手机相册</li>
            <li>点击"下载答案图片"可保存答案解析</li>
            <li>每天生成的题目不会重复，确保练习全面覆盖</li>
            <li>支持打印，图片分辨率高，打印清晰</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
