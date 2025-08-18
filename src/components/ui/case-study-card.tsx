import { CaseStudy } from '@/types';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onClick: (id: string) => void;
}

export function CaseStudyCard({ caseStudy, onClick }: CaseStudyCardProps) {
  const { elementRef, isVisible } = useIntersectionObserver();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fintech': return 'bg-forest-green';
      case 'healthcare': return 'bg-bright-teal';
      case 'ecommerce': return 'bg-forest-green';
      case 'manufacturing': return 'bg-bright-teal';
      default: return 'bg-forest-green';
    }
  };

  return (
    <div 
      ref={elementRef}
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
        isVisible ? 'fade-in visible' : 'fade-in'
      }`}
      onClick={() => onClick(caseStudy.id)}
      data-testid={`case-study-card-${caseStudy.id}`}
      data-category={caseStudy.category}
    >
      <img 
        src={caseStudy.image} 
        alt={caseStudy.title}
        className="w-full h-48 object-cover"
        data-testid="case-study-image"
      />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span 
            className={`${getCategoryColor(caseStudy.category)} text-white text-xs px-3 py-1 rounded-full font-medium capitalize`}
            data-testid="case-study-category"
          >
            {caseStudy.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-charcoal mb-3" data-testid="case-study-title">
          {caseStudy.title}
        </h3>
        <p className="text-gray-600 mb-4" data-testid="case-study-description">
          {caseStudy.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-bright-teal font-semibold" data-testid="case-study-metric">
            {caseStudy.metrics[0]?.value} {caseStudy.metrics[0]?.label}
          </span>
          <span className="text-forest-green hover:text-forest-green font-medium">
            Read More →
          </span>
        </div>
      </div>
    </div>
  );
}
