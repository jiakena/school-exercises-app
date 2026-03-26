import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BookOpen, Calculator, Languages, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题动画
      gsap.fromTo(titleRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'bounce.out' }
      );

      // 副标题动画
      gsap.fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power2.out' }
      );

      // 按钮动画
      gsap.fromTo(buttonRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: 0.6, ease: 'elastic.out(1, 0.5)' }
      );

      // 图标动画
      gsap.fromTo(iconsRef.current?.children || [],
        { rotation: 180, opacity: 0, scale: 0 },
        { rotation: 0, opacity: 1, scale: 1, duration: 0.7, delay: 0.4, stagger: 0.1, ease: 'power2.out' }
      );

      // 图标持续旋转动画
      gsap.to(iconsRef.current?.children || [], {
        rotation: '+=360',
        duration: 20,
        repeat: -1,
        ease: 'none',
        stagger: {
          each: 0.5,
          from: 'start'
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F5F7FA 0%, #E8F4FD 50%, #FFF9E6 100%)'
      }}
    >
      {/* 装饰背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200/30 rounded-full blur-3xl" />
      </div>

      {/* 漂浮的装饰元素 */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-32 left-20 w-6 h-6 text-yellow-400 animate-pulse" />
        <Sparkles className="absolute bottom-40 right-32 w-5 h-5 text-blue-400 animate-pulse" />
        <Sparkles className="absolute top-1/3 right-20 w-4 h-4 text-green-400 animate-pulse" />
      </div>

      {/* 主内容 */}
      <div className="relative z-10 text-center px-4">
        {/* 学科图标 */}
        <div ref={iconsRef} className="flex justify-center gap-6 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Languages className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* 标题 */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{
            fontFamily: 'Nunito, sans-serif',
            background: 'linear-gradient(135deg, #4A90E2 0%, #7ED321 50%, #F5A623 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          小学每日练习题生成器
        </h1>

        {/* 副标题 */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-600 mb-10"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          每天10道题，轻松提升成绩！
        </p>

        {/* 开始按钮 */}
        <div ref={buttonRef}>
          <Button
            onClick={onStart}
            size="lg"
            className="text-xl px-10 py-6 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #4A90E2 0%, #7ED321 100%)',
              fontFamily: 'Nunito, sans-serif'
            }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            开始练习
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* 特色说明 */}
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-blue-500">10道</div>
            <div className="text-sm text-gray-600">每日题目</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-green-500">3科</div>
            <div className="text-sm text-gray-600">全面覆盖</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-yellow-500">智能</div>
            <div className="text-sm text-gray-600">难度搭配</div>
          </div>
        </div>
      </div>
    </section>
  );
}
