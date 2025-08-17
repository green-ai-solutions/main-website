import { Testimonial } from '@/types';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg min-w-[400px] max-w-[400px]" data-testid="testimonial-card">
      <div className="flex items-center mb-6">
        <div className="flex text-yellow-400">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>
      </div>
      <p className="text-gray-700 mb-6 text-lg italic" data-testid="testimonial-content">
        "{testimonial.content}"
      </p>
      <div className="flex items-center">
        <img 
          src={testimonial.avatar} 
          alt={`${testimonial.name} avatar`}
          className="w-12 h-12 rounded-full mr-4"
          data-testid="testimonial-avatar"
        />
        <div>
          <div className="font-semibold text-charcoal" data-testid="testimonial-name">
            {testimonial.name}
          </div>
          <div className="text-sm text-gray-500" data-testid="testimonial-role">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}
