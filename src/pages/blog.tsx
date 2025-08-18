import { useState } from 'react';
import { Link } from 'wouter';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { HeroSection } from '@/components/ui/hero-section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { subscribeToNewsletter } from '@/lib/contact-api';
import { BlogPost } from '@/types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const blogPosts: BlogPost[] = [
  {
    id: 'what-is-green-ai',
    title: 'What is Green AI and Why Does It Matter?',
    excerpt: 'Explore the intersection of artificial intelligence and environmental sustainability. Learn how Green AI principles can reduce computational costs while maintaining performance.',
    content: 'Full content available on detail page',
    author: 'Dr. Sarah Chen',
    publishedAt: '2023-12-15',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    readTime: 8
  },
  {
    id: 'ai-agents-business',
    title: '5 Ways AI Agents Can Revolutionize Your Business',
    excerpt: 'Discover how intelligent AI agents can automate complex tasks, improve customer experiences, and drive operational efficiency across different business functions.',
    content: 'Full content available on detail page',
    author: 'Michael Rodriguez',
    publishedAt: '2023-12-10',
    category: 'AI & Automation',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    readTime: 6
  },
  {
    id: 'predictive-analytics-future',
    title: 'The Future of Predictive Analytics in Business Intelligence',
    excerpt: 'Learn how advanced predictive analytics are transforming decision-making processes and enabling businesses to anticipate market trends and customer behavior.',
    content: 'Advanced predictive analytics represents a paradigm shift in how businesses approach decision-making. By leveraging machine learning algorithms and statistical models, organizations can now anticipate future trends, customer behaviors, and market dynamics with unprecedented accuracy. This comprehensive analysis explores the current state and future potential of predictive analytics in modern business intelligence.',
    author: 'Dr. Emily Thompson',
    publishedAt: '2023-12-05',
    category: 'Data Intelligence',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    readTime: 7
  },
  {
    id: 'sustainable-cloud-architectures',
    title: 'Building Sustainable Cloud Architectures',
    excerpt: 'Explore best practices for designing cloud-native applications that are both scalable and environmentally responsible, reducing energy consumption and costs.',
    content: 'As cloud computing becomes the backbone of modern business operations, the need for sustainable cloud architectures has never been more critical. This comprehensive guide explores proven strategies for building cloud-native applications that balance performance, scalability, and environmental responsibility.',
    author: 'Michael Rodriguez',
    publishedAt: '2023-11-28',
    category: 'Cloud Solutions',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    readTime: 9
  },
  {
    id: 'ethical-ai-trust',
    title: 'Ethical AI: Building Trust in Machine Learning',
    excerpt: 'Understand the importance of ethical AI development, including bias mitigation, transparency, and accountability in machine learning systems.',
    content: 'Ethical AI development has emerged as a critical concern in the rapidly evolving landscape of artificial intelligence. As AI systems become more pervasive and influential in decision-making processes, ensuring these systems are fair, transparent, and accountable is essential for building trust and maintaining social responsibility.',
    author: 'Dr. Sarah Chen',
    publishedAt: '2023-11-20',
    category: 'Ethics',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    readTime: 5
  },
  {
    id: 'iot-ai-manufacturing',
    title: 'How IoT and AI Are Transforming Manufacturing',
    excerpt: 'Discover how the convergence of Internet of Things and artificial intelligence is revolutionizing manufacturing processes, improving efficiency and reducing waste.',
    content: 'The manufacturing industry is experiencing a digital transformation powered by the convergence of Internet of Things (IoT) and Artificial Intelligence (AI) technologies. This powerful combination is enabling unprecedented levels of automation, efficiency, and intelligence in manufacturing processes.',
    author: 'Dr. Emily Thompson',
    publishedAt: '2023-11-15',
    category: 'Manufacturing',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    readTime: 6
  },
  {
    id: 'machine-learning-finance',
    title: 'Machine Learning Applications in Financial Services',
    excerpt: 'Explore how machine learning is revolutionizing fraud detection, risk assessment, and algorithmic trading in the financial sector.',
    content: 'Machine learning has become a game-changer in the financial services industry, transforming everything from fraud detection to investment strategies. Financial institutions are leveraging ML algorithms to enhance security, improve customer experiences, and make more informed decisions.',
    author: 'Dr. Sarah Chen',
    publishedAt: '2023-11-10',
    category: 'AI & Automation',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    readTime: 8
  },
  {
    id: 'digital-transformation-healthcare',
    title: 'Digital Transformation in Healthcare: AI-Powered Solutions',
    excerpt: 'Learn how AI and digital technologies are improving patient outcomes and streamlining healthcare operations.',
    content: 'Healthcare is undergoing a digital revolution driven by AI-powered solutions that are improving patient outcomes, reducing costs, and streamlining operations. From diagnostic imaging to personalized treatment plans, AI is transforming every aspect of healthcare delivery.',
    author: 'Dr. Emily Thompson',
    publishedAt: '2023-11-05',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    readTime: 7
  }
];

const categories = ['All', 'Sustainability', 'AI & Automation', 'Data Intelligence', 'Cloud Solutions', 'Ethics', 'Manufacturing', 'Healthcare'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();
  
  const featuredRef = useIntersectionObserver();
  const postsRef = useIntersectionObserver();
  const newsletterRef = useIntersectionObserver();

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const newsletterMutation = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => {
      toast({
        title: 'Successfully subscribed!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Subscription failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onNewsletterSubmit = (data: z.infer<typeof newsletterSchema>) => {
    newsletterMutation.mutate(data);
  };

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <div>
      <HeroSection
        title="Insights on AI, Technology, and Growth"
        subtitle="Stay informed with the latest trends, insights, and best practices in artificial intelligence, sustainable technology, and business transformation."
      />

      <div className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Blog Post */}
          <div 
            ref={featuredRef.elementRef}
            className={`mb-16 transition-all duration-700 ${
              featuredRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-card rounded-xl shadow-lg overflow-hidden" data-testid="featured-post">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 lg:p-12">
                  <div className="flex items-center mb-4">
                    <span className="bg-forest-green text-white text-xs px-3 py-1 rounded-full font-medium mr-3">
                      Featured
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-charcoal mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime} min read
                    </div>
                    <Link href={`/blog/${featuredPost.id}`}>
                      <Button className="bg-bright-teal hover:bg-teal-600 text-white" data-testid="read-featured-post">
                        Read Full Article
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category 
                    ? 'bg-forest-green text-white' 
                    : 'bg-white text-charcoal hover:bg-gray-100'
                } transition-colors duration-200`}
                data-testid={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div 
            ref={postsRef.elementRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
              postsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-testid="blog-posts-grid"
          >
            {filteredPosts.map((post, index) => (
              <article 
                key={post.id}
                className="bg-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                style={{ transitionDelay: `${index * 100}ms` }}
                data-testid={`blog-post-${post.id}`}
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-bright-teal text-sm font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime} min read
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <button className="text-forest-green hover:text-green-800 font-medium flex items-center">
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No blog posts found for the selected category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div 
        ref={newsletterRef.elementRef}
        className="py-20 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-r from-forest-green to-bright-teal rounded-xl p-8 lg:p-12 text-white text-center transition-all duration-700 ${
            newsletterRef.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter for the latest insights on AI, technology trends, and sustainable innovation.
            </p>
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onNewsletterSubmit)} 
                className="max-w-md mx-auto flex"
                data-testid="newsletter-form"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="Enter your email" 
                          className="rounded-l-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-white border-0"
                          {...field}
                          data-testid="newsletter-email-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={newsletterMutation.isPending}
                  className="bg-white text-forest-green px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors duration-200 border-0"
                  data-testid="newsletter-submit-button"
                >
                  {newsletterMutation.isPending ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
