import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      ref={elementRef}
      className={`bg-light-gray p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${
        isVisible ? 'fade-in visible' : 'fade-in'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${
        service.color === 'forest' ? 'bg-forest-green' : 'bg-bright-teal'
      }`}>
        <span className="text-white text-2xl">{service.icon}</span>
      </div>
      <h3 className="text-xl font-bold mb-4 text-charcoal" data-testid="service-title">
        {service.title}
      </h3>
      <p className="text-gray-600 mb-4" data-testid="service-description">
        {service.description}
      </p>
      <ul className="text-sm text-gray-500 space-y-1">
        {service.features.map((feature, featureIndex) => (
          <li key={featureIndex} data-testid={`service-feature-${featureIndex}`}>
            • {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
