import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  backgroundPattern?: boolean;
}

export function HeroSection({
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  backgroundPattern = false
}: HeroSectionProps) {
  const { elementRef, isVisible } = useIntersectionObserver({ triggerOnce: true });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section 
      ref={elementRef}
      className={`hero-gradient min-h-screen flex items-center text-white relative overflow-hidden ${
        backgroundPattern ? 'neural-network-bg' : ''
      }`}
      data-testid="hero-section"
    >
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white/20 rounded-full particle-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      
      {/* Content overlay with improved contrast */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className={`max-w-5xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Enhanced readability with background cards */}
          <div className="glass-morphism rounded-3xl p-8 md:p-12 mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent" data-testid="hero-title">
              {title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 leading-relaxed max-w-4xl font-medium" data-testid="hero-subtitle">
              {subtitle}
            </p>
            
            {(primaryButtonText || secondaryButtonText) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {primaryButtonText && (
                  <button 
                    className="glow-effect bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    onClick={onPrimaryClick}
                    data-testid="hero-primary-button"
                  >
                    {primaryButtonText}
                  </button>
                )}
                {secondaryButtonText && (
                  <button 
                    className="glass-morphism border-2 border-white/30 text-white hover:bg-white/20 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                    onClick={onSecondaryClick}
                    data-testid="hero-secondary-button"
                  >
                    {secondaryButtonText}
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Stats or key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-morphism rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-sm text-gray-200">Projects Completed</div>
            </div>
            <div className="glass-morphism rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-sm text-gray-200">Client Satisfaction</div>
            </div>
            <div className="glass-morphism rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-sm text-gray-200">Enterprise Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
