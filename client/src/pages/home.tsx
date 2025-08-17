import { Link } from 'wouter';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { HeroSection } from '@/components/ui/hero-section';
import { ServiceCard } from '@/components/ui/service-card';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { submitContactForm } from '@/lib/contact-api';
import { Service, Testimonial } from '@/types';
import { Brain, TrendingUp, Code, Settings } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const services: Service[] = [
  {
    icon: '🤖',
    title: 'AI & Automation',
    description: 'Custom models and intelligent agents that transform your operations with cutting-edge machine learning.',
    features: ['Custom AI Models', 'Generative AI Agents', 'Process Automation'],
    color: 'forest'
  },
  {
    icon: '📊',
    title: 'Data Intelligence',
    description: 'BI dashboards and predictive analytics that turn your data into actionable insights.',
    features: ['Business Intelligence', 'Predictive Analytics', 'Data Visualization'],
    color: 'teal'
  },
  {
    icon: '💻',
    title: 'Full-Stack Development',
    description: 'Web apps and cloud solutions built with modern technologies and best practices.',
    features: ['Custom Web Applications', 'Cloud-Native Architecture', 'API Development'],
    color: 'forest'
  },
  {
    icon: '⚙️',
    title: 'Managed AI & Support',
    description: 'Continuous monitoring and maintenance to ensure optimal performance of your systems.',
    features: ['24/7 Monitoring', 'Model Maintenance', 'Performance Optimization'],
    color: 'teal'
  }
];

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechCorp Industries',
    content: 'Green AI Solutions transformed our data infrastructure completely. Their sustainable approach to AI development aligns perfectly with our company values, and the results speak for themselves.',
    avatar: '',
    rating: 5
  },
  {
    name: 'Michael Rodriguez',
    role: 'VP of Operations',
    company: 'DataFlow Systems',
    content: 'The team\'s expertise in both AI and sustainable practices is unmatched. They delivered a solution that not only improved our efficiency but also reduced our computational costs by 40%.',
    avatar: '',
    rating: 5
  },
  {
    name: 'Jennifer Park',
    role: 'CEO',
    company: 'Innovation Labs',
    content: 'Working with Green AI Solutions was a game-changer. Their commitment to ethical AI development and their technical excellence made them the perfect partner for our digital transformation.',
    avatar: '',
    rating: 5
  }
];

export default function Home() {
  const { toast } = useToast();
  const trustBarRef = useIntersectionObserver();
  const servicesRef = useIntersectionObserver();
  const greenDifferenceRef = useIntersectionObserver();
  const caseStudyRef = useIntersectionObserver();
  const testimonialsRef = useIntersectionObserver();
  const contactRef = useIntersectionObserver();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast({
        title: 'Message sent successfully!',
        description: 'We\'ll get back to you within 24 hours.',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error sending message',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    contactMutation.mutate(data);
  };

  return (
    <div>
      <HeroSection
        title="Building Smarter, Sustainable Futures with AI"
        subtitle="We translate complex data into tangible growth, delivering custom AI, data analytics, and full-stack solutions with unparalleled efficiency and ethical responsibility."
        primaryButtonText="Schedule a Free Consultation"
        secondaryButtonText="Explore Our Services"
        backgroundPattern={true}
        onPrimaryClick={() => window.location.href = '/contact'}
        onSecondaryClick={() => window.location.href = '/services'}
      />

      {/* Trust Bar */}
      <section 
        ref={trustBarRef.elementRef}
        className="bg-muted py-12"
        data-testid="trust-bar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={`text-center text-gray-600 mb-8 text-lg transition-all duration-700 ${
            trustBarRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Trusted by industry leaders, powered by cutting-edge technology
          </p>
          <div className={`flex justify-center items-center space-x-12 flex-wrap gap-8 transition-all duration-700 delay-200 ${
            trustBarRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex items-center space-x-2 text-gray-700">
              <Brain className="text-3xl" />
              <span className="font-medium">Python</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <TrendingUp className="text-3xl" />
              <span className="font-medium">TensorFlow</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Code className="text-3xl" />
              <span className="font-medium">AWS</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Settings className="text-3xl" />
              <span className="font-medium">Google Cloud</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section 
        ref={servicesRef.elementRef}
        className="py-20 bg-background"
        data-testid="services-overview"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            servicesRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your End-to-End Technology Partner
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From AI automation to full-stack development, we deliver comprehensive solutions that drive sustainable growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.title}
                service={service} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The Green AI Difference */}
      <section 
        ref={greenDifferenceRef.elementRef}
        className="py-20 bg-muted"
        data-testid="green-difference"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            greenDifferenceRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Makes Us <span className="text-primary">Green</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to sustainable technology goes beyond just environmental impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 delay-200 ${
              greenDifferenceRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-forest-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🌱</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-charcoal">Computationally Efficient Code</h3>
                  <p className="text-gray-600">
                    Our algorithms are optimized for minimal resource consumption, reducing both costs and environmental impact while maximizing performance.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-bright-teal rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">⚖️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-charcoal">Ethical & Transparent AI</h3>
                  <p className="text-gray-600">
                    We build AI models with fairness, accountability, and transparency at their core, ensuring responsible innovation that benefits everyone.
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-400 ${
              greenDifferenceRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern sustainable technology workspace" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Snippet */}
      <section 
        ref={caseStudyRef.elementRef}
        className="py-20 bg-offwhite"
        data-testid="case-study-snippet"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-r from-forest-green to-bright-teal rounded-2xl p-12 text-white transition-all duration-700 ${
            caseStudyRef.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Success Story</h2>
                <h3 className="text-2xl font-semibold mb-6 text-bright-teal">
                  Increased Operational Efficiency by 35%
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  We helped a leading fintech company automate their compliance processes using AI-powered document analysis, 
                  reducing manual review time from 4 hours to 45 minutes per case.
                </p>
                <div className="flex items-center space-x-6 mb-8">
                  <div>
                    <div className="text-3xl font-bold">35%</div>
                    <div className="text-sm opacity-75">Efficiency Increase</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">85%</div>
                    <div className="text-sm opacity-75">Time Reduction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">99.2%</div>
                    <div className="text-sm opacity-75">Accuracy Rate</div>
                  </div>
                </div>
                <Link href="/case-studies">
                  <Button variant="secondary" className="bg-white text-forest-green hover:bg-gray-100">
                    View Full Case Study
                  </Button>
                </Link>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Data analytics dashboard showing performance metrics" 
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        ref={testimonialsRef.elementRef}
        className="py-20 bg-muted"
        data-testid="testimonials"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            testimonialsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">Trusted by industry leaders worldwide</p>
          </div>
          
          <div className="overflow-x-auto">
            <div className={`flex space-x-8 pb-4 transition-all duration-700 delay-300 ${
              testimonialsRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`} style={{ width: 'max-content' }}>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        ref={contactRef.elementRef}
        className="py-20 bg-background"
        data-testid="contact-form-section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            contactRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss how AI can drive sustainable growth for your organization
            </p>
          </div>
          
          <div className={`bg-muted p-8 rounded-xl transition-all duration-700 delay-300 ${
            contactRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your.email@company.com" 
                            {...field} 
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your company name" 
                          {...field} 
                          data-testid="input-company"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4}
                          placeholder="Tell us about your project or what you'd like to discuss..." 
                          {...field} 
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={contactMutation.isPending}
                    className="bg-forest-green hover:bg-green-800 text-white px-8 py-4 text-lg"
                    data-testid="button-submit"
                  >
                    {contactMutation.isPending ? 'Sending...' : "Let's Talk"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
