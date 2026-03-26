import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { BookOpen, Calculator, Languages, ChevronRight } from 'lucide-react';
import type { SubjectType } from '@/types';

interface SubjectSectionProps {
  onSelectSubject: (subject: SubjectType) => void;
}

const subjects = [
  {
    id: 'chinese' as SubjectType,
    name: '语文',
    description: '小古文阅读训练',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50',
    icon: BookOpen,
    gradient: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)'
  },
  {
    id: 'math' as SubjectType,
    name: '数学',
    description: '分数和方程计算',
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-50',
    icon: Calculator,
    gradient: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)'
  },
  {
    id: 'english' as SubjectType,
    name: '英语',
    description: '完型填空练习',
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'bg-yellow-50',
    icon: Languages,
    gradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)'
  }
];

export default function SubjectSection({ onSelectSubject }: SubjectSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 卡片入场动画
      gsap.fromTo(cardsRef.current?.children || [],
        { y: 100, opacity: 0, rotateX: 90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4"
      style={{ background: '#F5F7FA' }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          style={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}
        >
          选择学科
        </h2>
        <p
          className="text-center text-gray-600 mb-12"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          点击选择你想要练习的学科
        </p>

        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row gap-6"
        >
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <div
                key={subject.id}
                className={`
                  relative rounded-3xl overflow-hidden cursor-pointer
                  transition-all duration-500 ease-out
                  ${isHovered ? 'md:flex-[3]' : 'md:flex-1'}
                  ${isOtherHovered ? 'md:flex-[0.5]' : ''}
                `}
                style={{
                  background: subject.gradient,
                  minHeight: '280px'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelectSubject(subject.id)}
              >
                {/* 装饰图案 */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-20 h-20 border-4 border-white rounded-full" />
                  <div className="absolute bottom-8 left-8 w-12 h-12 border-4 border-white rounded-lg rotate-45" />
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* 图标 */}
                  <div
                    className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                      bg-gradient-to-br ${subject.color} shadow-lg
                      transition-transform duration-500
                      ${isHovered ? 'rotate-[360deg]' : ''}
                    `}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* 标题 */}
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}
                  >
                    {subject.name}
                  </h3>

                  {/* 描述 */}
                  <p
                    className="text-gray-600 mb-4"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    {subject.description}
                  </p>

                  {/* 展开内容 */}
                  <div
                    className={`
                      flex-1 flex flex-col justify-end
                      transition-all duration-500
                      ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}
                  >
                    <div className="flex items-center text-gray-700 font-semibold">
                      <span>开始练习</span>
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
