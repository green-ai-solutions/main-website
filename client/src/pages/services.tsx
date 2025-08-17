import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { HeroSection } from '@/components/ui/hero-section';
import { CheckCircle } from 'lucide-react';

const serviceCategories = [
  {
    title: 'AI & Automation Services',
    description: 'Harness the power of artificial intelligence to automate processes, enhance decision-making, and unlock new possibilities for your business.',
    icon: '🤖',
    color: 'forest-green',
    offerings: [
      {
        title: 'Custom AI Models',
        description: 'Tailored machine learning solutions for your specific business needs'
      },
      {
        title: 'Generative AI Agents',
        description: 'Intelligent conversational AI and content generation systems'
      },
      {
        title: 'AI Adjudication Systems',
        description: 'Automated decision-making platforms for complex scenarios'
      },
      {
        title: 'Predictive Analytics',
        description: 'Forecast trends and behaviors with advanced algorithms'
      }
    ],
    benefits: [
      'Reduced operational costs through automation',
      'Enhanced accuracy in decision-making',
      'Scalable solutions that grow with your business',
      'Energy-efficient AI models with minimal carbon footprint'
    ]
  },
  {
    title: 'Data Intelligence Services',
    description: 'Transform your raw data into actionable insights with our comprehensive data intelligence solutions that drive informed business decisions.',
    icon: '📊',
    color: 'bright-teal',
    offerings: [
      {
        title: 'Business Intelligence & Visualization',
        description: 'Interactive dashboards and reports'
      },
      {
        title: 'Data Warehousing',
        description: 'Scalable storage and organization solutions'
      },
      {
        title: 'Big Data Analytics',
        description: 'Process and analyze massive datasets efficiently'
      },
      {
        title: 'Real-time Analytics',
        description: 'Live data processing and monitoring'
      }
    ],
    benefits: [
      'Make data-driven decisions with confidence',
      'Identify trends and patterns in your business',
      'Optimize operations with actionable insights',
      'Secure and compliant data management'
    ]
  },
  {
    title: 'Full-Stack & Cloud Solutions',
    description: 'Build robust, scalable applications with our comprehensive development and cloud architecture services designed for modern businesses.',
    icon: '💻',
    color: 'forest-green',
    offerings: [
      {
        title: 'Custom Web Applications',
        description: 'Tailored solutions for your business needs'
      },
      {
        title: 'Cloud-Native Architecture',
        description: 'Scalable, resilient infrastructure design'
      },
      {
        title: 'DevOps & MLOps',
        description: 'Automated deployment and continuous integration'
      },
      {
        title: 'API Development',
        description: 'Robust, secure integration solutions'
      }
    ],
    benefits: [
      'Scalable architecture that grows with your business',
      'Energy-efficient cloud infrastructure',
      'Reduced time-to-market for new features',
      'Enhanced security and reliability'
    ]
  },
  {
    title: 'Managed Services & Consulting',
    description: 'Ensure optimal performance and continuous improvement with our ongoing support and strategic consulting services.',
    icon: '⚙️',
    color: 'bright-teal',
    offerings: [
      {
        title: 'AI Model Maintenance',
        description: 'Continuous monitoring and optimization'
      },
      {
        title: 'Technology Strategy',
        description: 'Strategic planning and roadmap development'
      },
      {
        title: '24/7 Support',
        description: 'Round-the-clock monitoring and assistance'
      },
      {
        title: 'Performance Optimization',
        description: 'Regular system tuning and improvements'
      }
    ],
    benefits: [
      'Minimal downtime with proactive monitoring',
      'Continuous improvement and optimization',
      'Strategic guidance for technology decisions',
      'Peace of mind with expert support'
    ]
  }
];

export default function Services() {
  return (
    <div>
      <HeroSection
        title="Our Comprehensive Technology Services"
        subtitle="From custom AI models to full-stack applications, we provide end-to-end solutions that drive sustainable growth for your business."
        primaryButtonText="Schedule Consultation"
        onPrimaryClick={() => window.location.href = '/contact'}
      />

      <div className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {serviceCategories.map((category, index) => {
              const { elementRef, isVisible } = useIntersectionObserver();
              
              return (
                <div 
                  key={category.title}
                  ref={elementRef}
                  className={`transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  data-testid={`service-category-${index}`}
                >
                  <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 ${
                        category.color === 'forest-green' ? 'bg-forest-green' : 'bg-bright-teal'
                      } rounded-xl flex items-center justify-center mr-6`}>
                        <span className="text-white text-3xl">{category.icon}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-charcoal">{category.title}</h2>
                    </div>
                    
                    <p className="text-lg text-gray-600 mb-8">{category.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-charcoal mb-4">What We Offer:</h3>
                        <ul className="space-y-3 text-gray-600">
                          {category.offerings.map((offering, offeringIndex) => (
                            <li key={offeringIndex} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-bright-teal mr-3 mt-1 flex-shrink-0" />
                              <div>
                                <strong>{offering.title}:</strong> {offering.description}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-charcoal mb-4">Key Benefits:</h3>
                        <ul className="space-y-3 text-gray-600">
                          {category.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-start">
                              <span className="text-bright-teal mr-2">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
