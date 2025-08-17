import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { HeroSection } from '@/components/ui/hero-section';
import { Leaf, Shield, TrendingUp } from 'lucide-react';
import SunitaReddy from '@assets/SunitaReddy.png';
import AishaKhan from '@assets/AishaKhan.png';
import RohanVerma from '@assets/RohanVerma.png';

const leadership = [
  {
    name: 'Dr. Sunita Reddy',
    role: 'Chief Executive Officer',
    bio: 'Former Director of AI Ethics at Google, leading our mission to create responsible and sustainable AI solutions that benefit society and the environment.',
    avatar: SunitaReddy
  },
  {
    name: 'Rohan Verma',
    role: 'Chief Technology Officer',
    bio: 'Ex-Microsoft Principal Engineer with 15+ years in machine learning and cloud architecture, driving our technical innovation and scalable solutions.',
    avatar: RohanVerma
  },
  {
    name: 'Aisha Khan',
    role: 'Head of Sustainability',
    bio: 'Environmental scientist and former Tesla sustainability lead, ensuring all our solutions meet the highest standards for environmental responsibility.',
    avatar: AishaKhan
  }
];

const philosophyPillars = [
  {
    icon: Leaf,
    title: 'Environmental Responsibility',
    description: 'We design algorithms that minimize computational overhead, reducing energy consumption and carbon footprint. Every solution is optimized for efficiency without compromising performance.'
  },
  {
    icon: Shield,
    title: 'Ethical AI Development',
    description: 'Our AI models are transparent, explainable, and free from bias. We prioritize fairness, privacy, and accountability in every algorithm we develop, ensuring responsible AI deployment.'
  },
  {
    icon: TrendingUp,
    title: 'Sustainable Growth',
    description: 'We believe that business success and environmental stewardship go hand in hand. Our solutions help organizations achieve profitable growth while reducing their environmental impact.'
  }
];

const stats = [
  { value: '50+', label: 'Expert Team Members' },
  { value: '15+', label: 'Countries Served' },
  { value: '200+', label: 'Successful Projects' },
  { value: '98%', label: 'Client Satisfaction' }
];

export default function About() {
  const missionRef = useIntersectionObserver();
  const philosophyRef = useIntersectionObserver();
  const leadershipRef = useIntersectionObserver();
  const statsRef = useIntersectionObserver();

  return (
    <div>
      <HeroSection
        title="Driving Progress Through Innovation and Integrity"
        subtitle="At Green AI Solutions, we believe that technology should create a better world. Our mission is to develop AI solutions that are not only powerful but also ethical, sustainable, and accessible."
      />

      {/* Mission Section */}
      <section 
        ref={missionRef.elementRef}
        className="py-20 bg-white"
        data-testid="mission-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${
            missionRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-gradient-to-br from-forest-green to-bright-teal rounded-xl p-8 lg:p-12 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-xl leading-relaxed">
                  To empower businesses with sustainable and ethical AI solutions that drive meaningful growth while preserving our planet for future generations. We are committed to building technology that serves humanity, promotes transparency, and operates with minimal environmental impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Green Philosophy Section */}
      <section 
        ref={philosophyRef.elementRef}
        className="py-20 bg-light-gray"
        data-testid="philosophy-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${
            philosophyRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-charcoal mb-6">Our "Green" Philosophy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Green isn't just our name—it's our core commitment to responsible technology development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.title}
                  className={`text-center transition-all duration-700 ${
                    philosophyRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  data-testid={`philosophy-pillar-${index}`}
                >
                  <div className={`w-16 h-16 ${
                    index === 1 ? 'bg-bright-teal' : 'bg-forest-green'
                  } rounded-xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-4">{pillar.title}</h3>
                  <p className="text-gray-600">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section 
        ref={leadershipRef.elementRef}
        className="py-20 bg-white"
        data-testid="leadership-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${
            leadershipRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-charcoal mb-6">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedicated global team of experts brings together decades of experience in AI, software development, and sustainable business practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {leadership.map((leader, index) => (
              <div 
                key={leader.name}
                className={`bg-light-gray rounded-xl p-8 text-center transition-all duration-700 ${
                  leadershipRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                data-testid={`leader-${index}`}
              >
                <img 
                  src={leader.avatar} 
                  alt={leader.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-charcoal mb-2">{leader.name}</h3>
                <p className="text-bright-teal font-medium mb-4">{leader.role}</p>
                <p className="text-gray-600 text-sm">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section 
        ref={statsRef.elementRef}
        className="py-20 bg-light-gray"
        data-testid="stats-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-r from-forest-green to-bright-teal rounded-xl p-8 text-white transition-all duration-700 ${
            statsRef.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`transition-all duration-700 ${
                    statsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <p className="text-sm opacity-90">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
