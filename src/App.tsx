import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from '@/components/ui/sonner';
import HeroSection from './sections/HeroSection';
import SubjectSection from './sections/SubjectSection';
import QuestionSection from './sections/QuestionSection';
import QuestionManagementSection from './sections/QuestionManagementSection';
import type { SubjectType } from './types';

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | null>(null);
  const [showManagement, setShowManagement] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // 滚动到学科选择区域
  const scrollToSubjects = () => {
    const subjectSection = document.getElementById('subject-section');
    if (subjectSection) {
      subjectSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 选择学科
  const handleSelectSubject = (subject: SubjectType) => {
    setSelectedSubject(subject);
    // 滚动到题目区域
    setTimeout(() => {
      const questionSection = document.getElementById('question-section');
      if (questionSection) {
        questionSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // 返回学科选择
  const handleBack = () => {
    setSelectedSubject(null);
    setTimeout(() => {
      const subjectSection = document.getElementById('subject-section');
      if (subjectSection) {
        subjectSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // 打开题库管理
  const handleOpenManagement = () => {
    setShowManagement(true);
  };

  // 关闭题库管理
  const handleCloseManagement = () => {
    setShowManagement(false);
  };

  // 初始化GSAP
  useEffect(() => {
    // 刷新ScrollTrigger
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen">
      <Toaster position="top-center" richColors />
      
      {showManagement ? (
        /* 题库管理页面 */
        <QuestionManagementSection onBack={handleCloseManagement} />
      ) : (
        <>
          {/* Hero区域 */}
          <HeroSection onStart={scrollToSubjects} />
          
          {/* 学科选择区域 */}
          <div id="subject-section">
            <SubjectSection 
              onSelectSubject={handleSelectSubject}
              onOpenManagement={handleOpenManagement}
            />
          </div>
          
          {/* 题目生成区域 */}
          {selectedSubject && (
            <div id="question-section">
              <QuestionSection
                subject={selectedSubject}
                onBack={handleBack}
              />
            </div>
          )}
          
          {/* 页脚 */}
          <footer className="bg-gray-800 text-white py-8 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-gray-400 mb-2">
                © 2024 小学每日练习题生成器 - 让学习变得更有趣
              </p>
              <p className="text-gray-500 text-sm">
                专为广东佛山市小学生设计
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
