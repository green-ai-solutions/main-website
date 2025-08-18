import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { HeroSection } from '@/components/ui/hero-section';
import { CheckCircle } from 'lucide-react';

const industryStings = [
  {
    title: 'FinTech Solutions',
    description: 'Revolutionize financial services with AI-powered security and automation solutions.',
    icon: '💰',
    gradient: 'from-forest-green to-bright-teal',
    features: [
      'AI-powered fraud detection systems with 99.9% accuracy',
      'Automated compliance checks and regulatory reporting',
      'Real-time risk assessment and portfolio optimization',
      'Algorithmic trading and market prediction models'
    ]
  },
  {
    title: 'Healthcare Solutions',
    description: 'Transform patient care and medical operations with intelligent healthcare solutions.',
    icon: '🏥',
    gradient: 'from-bright-teal to-forest-green',
    features: [
      'Medical imaging analysis with AI-assisted diagnosis',
      'Electronic health record optimization and interoperability',
      'Predictive analytics for patient outcome improvement',
      'Telemedicine platforms and remote monitoring'
    ]
  },
  {
    title: 'E-commerce Solutions',
    description: 'Boost sales and customer satisfaction with intelligent e-commerce platforms.',
    icon: '🛒',
    gradient: 'from-forest-green to-bright-teal',
    features: [
      'AI-powered product recommendation engines',
      'Dynamic pricing optimization and inventory management',
      'Customer behavior analytics and segmentation',
      'Automated customer service chatbots'
    ]
  },
  {
    title: 'Manufacturing Solutions',
    description: 'Optimize production efficiency and reduce waste with smart manufacturing solutions.',
    icon: '🏭',
    gradient: 'from-bright-teal to-forest-green',
    features: [
      'Predictive maintenance and equipment monitoring',
      'Quality control automation and defect detection',
      'Supply chain optimization and demand forecasting',
      'Energy consumption optimization and sustainability tracking'
    ]
  }
];

export default function Solutions() {
  const introRef = useIntersectionObserver();

  return (
    <div>
      <HeroSection
        title="Tailored Solutions for Your Industry"
        subtitle="We understand that different industries have unique challenges. Our specialized solutions address specific pain points across key sectors."
      />

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={introRef.elementRef}
            className={`text-center mb-16 transition-all duration-700 ${
              introRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each solution is designed with sustainability and efficiency in mind, ensuring your business grows responsibly while maximizing performance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {industryStings.map((solution, index) => {
              const { elementRef, isVisible } = useIntersectionObserver();
              
              return (
                <div 
                  key={solution.title}
                  ref={elementRef}
                  className={`bg-gradient-to-br ${solution.gradient} rounded-xl p-8 text-white transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  data-testid={`solution-${index}`}
                >
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-4xl">{solution.icon}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4">{solution.title}</h2>
                  <p className="text-lg mb-6 opacity-90">{solution.description}</p>
                  
                  <ul className="space-y-3 text-sm">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Industry Insights Section */}
      <div className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">Industry Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our deep understanding of industry-specific challenges allows us to deliver solutions that create real impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-3xl font-bold text-forest-green mb-2">200+</div>
              <p className="text-gray-600">Projects Delivered</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-3xl font-bold text-bright-teal mb-2">15+</div>
              <p className="text-gray-600">Industries Served</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-3xl font-bold text-forest-green mb-2">98%</div>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-3xl font-bold text-bright-teal mb-2">50+</div>
              <p className="text-gray-600">Expert Team Members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
