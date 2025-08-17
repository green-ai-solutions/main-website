import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { HeroSection } from '@/components/ui/hero-section';
import { Button } from '@/components/ui/button';
import { Job } from '@/types';
import { MapPin, Clock, Building, Users, Heart, Zap } from 'lucide-react';

const jobs: Job[] = [
  {
    id: 'senior-ai-engineer',
    title: 'Senior AI Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'full-time',
    description: 'Lead the development of cutting-edge AI models and systems that drive sustainable business solutions. Work with our team to create ethical, efficient, and scalable AI applications.',
    requirements: [
      '5+ years of experience in machine learning and AI development',
      'Strong proficiency in Python, TensorFlow, and PyTorch',
      'Experience with cloud platforms (AWS, Google Cloud, Azure)',
      'Knowledge of MLOps and model deployment best practices',
      'Passion for sustainable and ethical AI development'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work arrangements and unlimited PTO',
      'Professional development budget',
      'Work on cutting-edge AI technology with positive impact'
    ]
  },
  {
    id: 'full-stack-developer',
    title: 'Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'full-time',
    description: 'Build and maintain scalable web applications that showcase our AI capabilities. Collaborate with our design and AI teams to create exceptional user experiences.',
    requirements: [
      '3+ years of full-stack development experience',
      'Proficiency in React, Node.js, and TypeScript',
      'Experience with cloud infrastructure and deployment',
      'Understanding of AI/ML concepts and APIs',
      'Strong problem-solving skills and attention to detail'
    ],
    benefits: [
      'Competitive salary and benefits',
      'Remote-first culture with flexible hours',
      'Latest development tools and equipment',
      'Quarterly team retreats and events',
      'Opportunity to work with AI technology'
    ]
  },
  {
    id: 'sustainability-consultant',
    title: 'Sustainability Consultant',
    department: 'Consulting',
    location: 'New York, NY / Remote',
    type: 'full-time',
    description: 'Help clients implement sustainable AI practices and reduce their environmental footprint through optimized algorithms and green computing strategies.',
    requirements: [
      'Background in environmental science or sustainability',
      'Understanding of technology and AI environmental impact',
      'Excellent communication and presentation skills',
      'Experience in consulting or client-facing roles',
      'Passion for environmental responsibility'
    ],
    benefits: [
      'Make a real impact on environmental sustainability',
      'Travel opportunities to work with diverse clients',
      'Competitive compensation and benefits',
      'Professional development in emerging field',
      'Collaborative and mission-driven team'
    ]
  }
];

const values = [
  {
    icon: Heart,
    title: 'Purpose-Driven Work',
    description: 'Every project we work on has a positive impact on businesses and the environment.'
  },
  {
    icon: Users,
    title: 'Collaborative Culture',
    description: 'We believe the best solutions come from diverse perspectives working together.'
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We encourage experimentation and learning from both successes and failures.'
  },
  {
    icon: Building,
    title: 'Growth Opportunities',
    description: 'We invest in our team members\' professional development and career advancement.'
  }
];

export default function Careers() {
  const valuesRef = useIntersectionObserver();
  const jobsRef = useIntersectionObserver();
  const cultureRef = useIntersectionObserver();

  return (
    <div>
      <HeroSection
        title="Build the Future with Us"
        subtitle="Join our mission to create sustainable AI solutions that drive positive change. Work with cutting-edge technology while making a meaningful impact on the world."
        primaryButtonText="View Open Positions"
        onPrimaryClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Company Culture */}
      <section 
        ref={cultureRef.elementRef}
        className="py-20 bg-white"
        data-testid="company-culture"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            cultureRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl font-bold text-charcoal mb-4">Why Work at Green AI Solutions?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building the future of sustainable technology, and we want passionate, talented people to join us on this journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className={`transition-all duration-700 delay-200 ${
              cultureRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <h3 className="text-2xl font-bold text-charcoal mb-6">Our Mission-Driven Culture</h3>
              <p className="text-gray-600 mb-6">
                At Green AI Solutions, we believe that technology should serve humanity and protect our planet. 
                Our team is passionate about creating AI solutions that are not only powerful but also ethical, 
                sustainable, and accessible to all.
              </p>
              <p className="text-gray-600 mb-6">
                We foster an environment of continuous learning, innovation, and collaboration. Every team member 
                has the opportunity to contribute to groundbreaking projects that make a real difference in the world.
              </p>
              <div className="flex items-center space-x-6">
                <div>
                  <div className="text-2xl font-bold text-forest-green">50+</div>
                  <div className="text-sm text-gray-500">Team Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-bright-teal">15+</div>
                  <div className="text-sm text-gray-500">Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-forest-green">98%</div>
                  <div className="text-sm text-gray-500">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-400 ${
              cultureRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Team collaboration in modern office" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section 
        ref={valuesRef.elementRef}
        className="py-20 bg-light-gray"
        data-testid="company-values"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            valuesRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-charcoal mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape our company culture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={value.title}
                  className={`bg-white p-6 rounded-xl shadow-md text-center transition-all duration-700 ${
                    valuesRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  data-testid={`value-${index}`}
                >
                  <div className={`w-12 h-12 ${
                    index % 2 === 0 ? 'bg-forest-green' : 'bg-bright-teal'
                  } rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section 
        ref={jobsRef.elementRef}
        id="open-positions"
        className="py-20 bg-white"
        data-testid="open-positions"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            jobsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-charcoal mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our team and help shape the future of sustainable AI technology.
            </p>
          </div>

          <div className="space-y-8">
            {jobs.map((job, index) => (
              <div 
                key={job.id}
                className={`bg-light-gray rounded-xl p-8 transition-all duration-700 ${
                  jobsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                data-testid={`job-${job.id}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {job.department}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="bg-forest-green hover:bg-green-800 text-white mt-4 lg:mt-0"
                    data-testid={`apply-${job.id}`}
                  >
                    Apply Now
                  </Button>
                </div>

                <p className="text-gray-700 mb-6">{job.description}</p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-charcoal mb-3">Requirements:</h4>
                    <ul className="space-y-2 text-gray-600">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start">
                          <span className="text-bright-teal mr-2 mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-charcoal mb-3">Benefits:</h4>
                    <ul className="space-y-2 text-gray-600">
                      {job.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <span className="text-bright-teal mr-2 mt-1">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No positions available fallback */}
          {jobs.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-charcoal mb-4">No Open Positions</h3>
              <p className="text-gray-600 mb-6">
                We're not currently hiring, but we're always interested in meeting talented people.
              </p>
              <Button className="bg-bright-teal hover:bg-teal-600 text-white">
                Send Us Your Resume
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
