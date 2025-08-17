import { useState } from 'react';
import { useLocation } from 'wouter';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { HeroSection } from '@/components/ui/hero-section';
import { CaseStudyCard } from '@/components/ui/case-study-card';
import { CaseStudy } from '@/types';
import { Button } from '@/components/ui/button';

const caseStudies: CaseStudy[] = [
  {
    id: 'fraud-detection',
    title: 'AI-Powered Fraud Detection System',
    client: 'Leading Digital Payment Platform',
    category: 'fintech',
    description: 'Reduced fraud losses by 85% for a leading digital payment platform through advanced machine learning algorithms.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    metrics: [
      { label: 'fraud reduction', value: '85%' }
    ],
    challenge: 'The client was experiencing significant losses due to fraudulent transactions, with manual review processes unable to keep pace with transaction volume.',
    solution: 'We implemented a real-time AI fraud detection system using ensemble machine learning models that analyze transaction patterns, user behavior, and risk factors.',
    technologies: ['Python', 'TensorFlow', 'Apache Kafka', 'Redis', 'PostgreSQL'],
    results: [
      '85% reduction in fraud losses',
      '99.2% accuracy in fraud detection',
      '50ms average response time',
      '40% reduction in false positives'
    ]
  },
  {
    id: 'medical-imaging',
    title: 'Medical Imaging AI Assistant',
    client: 'Regional Healthcare Network',
    category: 'healthcare',
    description: 'Improved diagnostic accuracy by 40% while reducing analysis time from hours to minutes for radiology departments.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    metrics: [
      { label: 'accuracy improvement', value: '40%' }
    ],
    challenge: 'Radiologists were overwhelmed with imaging volumes, leading to delayed diagnoses and potential missed findings.',
    solution: 'We developed an AI-powered imaging analysis system using computer vision models trained on medical datasets to assist radiologists in identifying abnormalities.',
    technologies: ['PyTorch', 'OpenCV', 'DICOM', 'FastAPI', 'Docker'],
    results: [
      '40% improvement in diagnostic accuracy',
      '75% reduction in analysis time',
      '95% radiologist satisfaction rate',
      '30% increase in patient throughput'
    ]
  },
  {
    id: 'recommendation-engine',
    title: 'Smart Recommendation Engine',
    client: 'Major Online Retailer',
    category: 'ecommerce',
    description: 'Increased conversion rates by 60% for a major online retailer through personalized AI-driven product recommendations.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    metrics: [
      { label: 'conversion increase', value: '60%' }
    ],
    challenge: 'Low conversion rates and poor customer engagement due to generic product recommendations that didn\'t match user preferences.',
    solution: 'We built a sophisticated recommendation engine using collaborative filtering and deep learning to provide personalized product suggestions.',
    technologies: ['Python', 'Apache Spark', 'MLflow', 'Elasticsearch', 'AWS'],
    results: [
      '60% increase in conversion rates',
      '45% boost in average order value',
      '25% improvement in customer retention',
      '200% increase in click-through rates'
    ]
  },
  {
    id: 'predictive-maintenance',
    title: 'Predictive Maintenance System',
    client: 'Fortune 500 Manufacturing Company',
    category: 'manufacturing',
    description: 'Reduced equipment downtime by 75% and maintenance costs by 45% for a Fortune 500 manufacturing company.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    metrics: [
      { label: 'downtime reduction', value: '75%' }
    ],
    challenge: 'Unexpected equipment failures were causing costly downtime and disrupting production schedules.',
    solution: 'We implemented an IoT-based predictive maintenance system that monitors equipment health and predicts failures before they occur.',
    technologies: ['Python', 'TensorFlow', 'InfluxDB', 'Grafana', 'Azure IoT'],
    results: [
      '75% reduction in equipment downtime',
      '45% decrease in maintenance costs',
      '90% prediction accuracy',
      '$2M annual savings'
    ]
  },
  {
    id: 'algorithmic-trading',
    title: 'Algorithmic Trading Platform',
    client: 'Investment Management Firm',
    category: 'fintech',
    description: 'Improved trading performance by 120% while reducing energy consumption by 30% through optimized algorithms.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    metrics: [
      { label: 'performance boost', value: '120%' }
    ],
    challenge: 'Existing trading algorithms were inefficient and couldn\'t adapt quickly to market changes.',
    solution: 'We developed a sophisticated algorithmic trading platform with machine learning models that adapt to market conditions in real-time.',
    technologies: ['Python', 'NumPy', 'Pandas', 'Redis', 'PostgreSQL'],
    results: [
      '120% improvement in trading performance',
      '30% reduction in energy consumption',
      '15% increase in profit margins',
      '99.9% system uptime'
    ]
  },
  {
    id: 'telemedicine',
    title: 'Telemedicine Platform',
    client: 'Healthcare Consortium',
    category: 'healthcare',
    description: 'Enabled 250% increase in patient consultations while maintaining 98% satisfaction rates during pandemic response.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    metrics: [
      { label: 'consultation increase', value: '250%' }
    ],
    challenge: 'Healthcare providers needed to rapidly scale remote consultation capabilities during the pandemic.',
    solution: 'We developed a comprehensive telemedicine platform with video conferencing, patient management, and integration with existing healthcare systems.',
    technologies: ['React', 'Node.js', 'WebRTC', 'MongoDB', 'AWS'],
    results: [
      '250% increase in patient consultations',
      '98% patient satisfaction rate',
      '60% reduction in wait times',
      '45% cost savings on infrastructure'
    ]
  },
  {
    id: 'supply-chain-optimization',
    title: 'AI-Powered Supply Chain Optimization',
    client: 'Global Logistics Company',
    category: 'manufacturing',
    description: 'Reduced supply chain costs by 25% and improved delivery times by 40% through AI-powered logistics optimization.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    metrics: [
      { label: 'cost reduction', value: '25%' }
    ],
    challenge: 'Complex global supply chain with multiple vendors, routes, and delivery constraints causing delays and increased costs.',
    solution: 'We implemented an AI-powered supply chain optimization system that analyzes real-time data to optimize routes, inventory, and vendor selection.',
    technologies: ['Python', 'TensorFlow', 'Apache Airflow', 'Kubernetes', 'GCP'],
    results: [
      '25% reduction in supply chain costs',
      '40% improvement in delivery times',
      '30% reduction in inventory waste',
      '95% on-time delivery rate'
    ]
  },
  {
    id: 'customer-sentiment-analysis',
    title: 'Real-time Customer Sentiment Analysis',
    client: 'E-commerce Platform',
    category: 'ecommerce',
    description: 'Improved customer satisfaction by 35% through real-time sentiment analysis and automated response system.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    metrics: [
      { label: 'satisfaction improvement', value: '35%' }
    ],
    challenge: 'Unable to monitor and respond to customer feedback in real-time, leading to escalated issues and decreased satisfaction.',
    solution: 'We developed a real-time sentiment analysis system that monitors customer interactions and automatically escalates negative sentiment.',
    technologies: ['Python', 'BERT', 'Kafka', 'Redis', 'Docker'],
    results: [
      '35% improvement in customer satisfaction',
      '50% faster response to negative feedback',
      '80% reduction in escalated issues',
      '20% increase in customer retention'
    ]
  }
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'fintech', label: 'FinTech' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'manufacturing', label: 'Manufacturing' }
];

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [, setLocation] = useLocation();
  const filterRef = useIntersectionObserver();
  const gridRef = useIntersectionObserver();

  const filteredCaseStudies = selectedCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === selectedCategory);

  const handleCaseStudyClick = (id: string) => {
    setLocation(`/case-studies/${id}`);
  };

  return (
    <div>
      <HeroSection
        title="Proven Results and Client Success"
        subtitle="See how we've helped organizations across industries achieve remarkable results with our AI and technology solutions."
      />

      <div className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div 
            ref={filterRef.elementRef}
            className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 ${
              filterRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card text-card-foreground hover:bg-muted'
                } transition-colors duration-200`}
                data-testid={`filter-${category.id}`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Case Studies Grid */}
          <div 
            ref={gridRef.elementRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
              gridRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-testid="case-studies-grid"
          >
            {filteredCaseStudies.map((caseStudy, index) => (
              <div
                key={caseStudy.id}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CaseStudyCard 
                  caseStudy={caseStudy} 
                  onClick={handleCaseStudyClick}
                />
              </div>
            ))}
          </div>

          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No case studies found for the selected category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
