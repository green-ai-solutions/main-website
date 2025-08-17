import { useRoute } from 'wouter';
import { Link } from 'wouter';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CaseStudy } from '@/types';

// This would normally come from an API, but for demo purposes we'll use the same data
const caseStudies: Record<string, CaseStudy> = {
  'fraud-detection': {
    id: 'fraud-detection',
    title: 'AI-Powered Fraud Detection System',
    client: 'Leading Digital Payment Platform',
    category: 'fintech',
    description: 'Reduced fraud losses by 85% for a leading digital payment platform through advanced machine learning algorithms.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    metrics: [
      { label: 'Fraud Reduction', value: '85%' },
      { label: 'Detection Accuracy', value: '99.2%' },
      { label: 'Response Time', value: '50ms' },
      { label: 'False Positive Reduction', value: '40%' }
    ],
    challenge: 'The client, a major digital payment platform processing millions of transactions daily, was experiencing significant losses due to fraudulent activities. Their existing rule-based fraud detection system was generating too many false positives, causing legitimate transactions to be declined, which resulted in poor customer experience and lost revenue. The manual review process couldn\'t keep pace with the transaction volume, and sophisticated fraud patterns were going undetected.',
    solution: 'We designed and implemented a comprehensive AI-powered fraud detection system that combines multiple machine learning techniques. The solution includes real-time transaction scoring using ensemble models (Random Forest, XGBoost, and Neural Networks), behavioral analysis to detect anomalous patterns, and a feedback loop system that continuously improves model accuracy. The system integrates seamlessly with the client\'s existing infrastructure and provides explainable AI features for compliance and audit purposes.',
    technologies: ['Python', 'TensorFlow', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
    results: [
      '85% reduction in fraud losses within 6 months',
      '99.2% accuracy in fraud detection',
      '50ms average response time for real-time scoring',
      '40% reduction in false positives',
      '$10M+ annual savings in fraud prevention',
      '95% customer satisfaction improvement'
    ]
  }
  // Add other case studies here...
};

export default function CaseStudyDetail() {
  const [, params] = useRoute('/case-studies/:id');
  const caseStudy = params?.id ? caseStudies[params.id] : null;

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-charcoal mb-4">Case Study Not Found</h1>
          <Link href="/case-studies">
            <Button>Back to Case Studies</Button>
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-light-gray py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/case-studies">
            <Button variant="ghost" className="mb-6" data-testid="back-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Button>
          </Link>
          
          <div className="flex items-center mb-4">
            <span 
              className={`${getCategoryColor(caseStudy.category)} text-white text-sm px-4 py-2 rounded-full font-medium capitalize`}
              data-testid="case-study-category"
            >
              {caseStudy.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4" data-testid="case-study-title">
            {caseStudy.title}
          </h1>
          
          <p className="text-xl text-gray-600" data-testid="case-study-client">
            Client: {caseStudy.client}
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-96 overflow-hidden">
        <img 
          src={caseStudy.image} 
          alt={caseStudy.title}
          className="w-full h-full object-cover"
          data-testid="case-study-hero-image"
        />
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {caseStudy.metrics.map((metric, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-light-gray rounded-xl"
                data-testid={`metric-${index}`}
              >
                <div className="text-3xl font-bold text-forest-green mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Challenge */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-6">The Challenge</h2>
            <p className="text-lg text-gray-700 leading-relaxed" data-testid="challenge-content">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-6">Our Solution</h2>
            <p className="text-lg text-gray-700 leading-relaxed" data-testid="solution-content">
              {caseStudy.solution}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3" data-testid="technologies-list">
              {caseStudy.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="bg-bright-teal text-white px-4 py-2 rounded-lg font-medium"
                  data-testid={`technology-${index}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-6">Results & Impact</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {caseStudy.results.map((result, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 p-4 bg-light-gray rounded-lg"
                  data-testid={`result-${index}`}
                >
                  <CheckCircle className="w-6 h-6 text-forest-green flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-forest-green to-bright-teal rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Achieve Similar Results?</h3>
            <p className="text-lg mb-6 opacity-90">
              Let's discuss how we can help transform your business with innovative AI solutions.
            </p>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="bg-white text-forest-green hover:bg-gray-100">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
