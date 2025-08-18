import { useParams } from 'wouter';
import { HeroSection } from '@/components/ui/hero-section';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { subscribeToNewsletter } from '@/lib/contact-api';
import { Calendar, Clock, ArrowLeft, User, Tag } from 'lucide-react';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const blogContent: Record<string, any> = {
  'what-is-green-ai': {
    title: 'What is Green AI and Why Does It Matter?',
    author: 'Dr. Sarah Chen',
    publishedAt: '2023-12-15',
    category: 'Sustainability',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    content: `
      <p class="text-lg mb-6">As artificial intelligence becomes increasingly central to business operations worldwide, the environmental impact of AI systems has emerged as a critical concern. Green AI represents a paradigm shift towards developing and deploying AI solutions that minimize environmental impact while maximizing efficiency and performance.</p>

      <h2 class="text-3xl font-bold mb-4 mt-8">Understanding Green AI</h2>
      <p class="mb-6">Green AI encompasses several key principles:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Energy Efficiency:</strong> Designing algorithms that require less computational power</li>
        <li><strong>Resource Optimization:</strong> Maximizing output while minimizing hardware requirements</li>
        <li><strong>Sustainable Infrastructure:</strong> Utilizing renewable energy sources for AI workloads</li>
        <li><strong>Lifecycle Awareness:</strong> Considering environmental impact from development to deployment</li>
      </ul>

      <h2 class="text-3xl font-bold mb-4 mt-8">The Environmental Impact of Traditional AI</h2>
      <p class="mb-6">Traditional AI development often prioritizes performance over efficiency, leading to significant environmental costs:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Training large language models can emit as much CO2 as five cars over their lifetime</li>
        <li>Data centers consume approximately 1% of global electricity</li>
        <li>The computational demand for AI is doubling every 3.4 months</li>
      </ul>

      <h2 class="text-3xl font-bold mb-4 mt-8">Practical Green AI Strategies</h2>
      <p class="mb-6">Organizations can implement several strategies to reduce their AI environmental footprint:</p>
      
      <h3 class="text-2xl font-semibold mb-3 mt-6">1. Algorithm Optimization</h3>
      <p class="mb-4">Focus on developing more efficient algorithms that achieve similar or better results with fewer computational resources.</p>
      
      <h3 class="text-2xl font-semibold mb-3 mt-6">2. Model Compression</h3>
      <p class="mb-4">Techniques like pruning, quantization, and knowledge distillation can significantly reduce model size without sacrificing performance.</p>
      
      <h3 class="text-2xl font-semibold mb-3 mt-6">3. Renewable Energy</h3>
      <p class="mb-4">Powering AI infrastructure with renewable energy sources dramatically reduces carbon footprint.</p>
      
      <h3 class="text-2xl font-semibold mb-3 mt-6">4. Efficient Hardware Utilization</h3>
      <p class="mb-4">Optimizing hardware usage and selecting appropriate computing resources for specific tasks.</p>

      <h2 class="text-3xl font-bold mb-4 mt-8">The Business Case for Green AI</h2>
      <p class="mb-6">Green AI isn't just about environmental responsibility—it also makes business sense:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Cost Reduction:</strong> Lower energy consumption directly translates to reduced operational costs</li>
        <li><strong>Regulatory Compliance:</strong> Staying ahead of environmental regulations</li>
        <li><strong>Brand Value:</strong> Demonstrating corporate responsibility and sustainability</li>
        <li><strong>Performance Benefits:</strong> Efficient algorithms often perform better and respond faster</li>
      </ul>

      <h2 class="text-3xl font-bold mb-4 mt-8">Looking Forward</h2>
      <p class="mb-6">The future of AI development must balance innovation with sustainability. Organizations that embrace Green AI principles today will be better positioned for tomorrow's challenges, combining technological advancement with environmental stewardship.</p>
      
      <p class="mb-6">As we continue to push the boundaries of what's possible with AI, we must also ensure that our progress doesn't come at the expense of our planet. Green AI represents not just a technical approach, but a fundamental shift in how we think about technology development and deployment.</p>
    `
  },
  'ai-agents-business': {
    title: '5 Ways AI Agents Can Revolutionize Your Business',
    author: 'Michael Rodriguez',
    publishedAt: '2023-12-10',
    category: 'AI & Automation',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    content: `
      <p class="text-lg mb-6">AI agents are autonomous software entities that can perceive their environment, make decisions, and take actions to achieve specific goals. They represent the next evolution in business automation, offering unprecedented capabilities for organizations across all industries.</p>

      <h2 class="text-3xl font-bold mb-4 mt-8">1. Customer Service Revolution</h2>
      <p class="mb-6">AI agents are transforming customer service by providing 24/7 support with human-like understanding and response capabilities:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Handle complex customer inquiries with natural language processing</li>
        <li>Provide instant responses across multiple channels (chat, email, voice)</li>
        <li>Learn from interactions to continuously improve service quality</li>
        <li>Escalate complex issues to human agents when necessary</li>
      </ul>
      <div class="bg-primary/5 p-6 rounded-lg mb-6">
        <p class="font-semibold">Real Impact:</p>
        <p>Companies using AI customer service agents report 40% reduction in response time and 35% increase in customer satisfaction scores.</p>
      </div>

      <h2 class="text-3xl font-bold mb-4 mt-8">2. Sales Process Automation</h2>
      <p class="mb-6">AI agents can handle various aspects of the sales process, from lead qualification to deal closure:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Qualify leads based on predefined criteria and behavioral patterns</li>
        <li>Personalize outreach messages for higher engagement rates</li>
        <li>Schedule meetings and follow up with prospects automatically</li>
        <li>Analyze sales conversations to identify improvement opportunities</li>
      </ul>

      <h2 class="text-3xl font-bold mb-4 mt-8">3. Financial Analysis and Reporting</h2>
      <p class="mb-6">AI agents excel at processing large volumes of financial data and generating actionable insights:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Automated financial statement analysis and variance reporting</li>
        <li>Real-time budget monitoring and expense tracking</li>
        <li>Fraud detection and risk assessment</li>
        <li>Investment portfolio optimization and rebalancing</li>
      </ul>

      <h2 class="text-3xl font-bold mb-4 mt-8">4. Supply Chain Optimization</h2>
      <p class="mb-6">AI agents can monitor and optimize complex supply chain operations in real-time:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Predict demand fluctuations and adjust inventory levels</li>
        <li>Optimize routing and logistics for cost efficiency</li>
        <li>Monitor supplier performance and identify risks</li>
        <li>Automate procurement processes and vendor negotiations</li>
      </ul>

      <h2 class="text-3xl font-bold mb-4 mt-8">5. HR and Talent Management</h2>
      <p class="mb-6">AI agents are revolutionizing human resources by automating routine tasks and providing data-driven insights:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Screen resumes and identify top candidates automatically</li>
        <li>Conduct initial interviews using natural language processing</li>
        <li>Monitor employee sentiment and predict turnover risks</li>
        <li>Personalize learning and development recommendations</li>
      </ul>

      <h2 class="text-3xl font-bold mb-4 mt-8">Implementation Best Practices</h2>
      <p class="mb-6">To successfully implement AI agents in your business:</p>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><strong>Start Small:</strong> Begin with a single use case and expand gradually</li>
        <li><strong>Define Clear Goals:</strong> Establish measurable objectives for your AI agents</li>
        <li><strong>Ensure Data Quality:</strong> AI agents require clean, well-structured data to function effectively</li>
        <li><strong>Plan for Integration:</strong> Consider how AI agents will work with existing systems</li>
        <li><strong>Monitor and Optimize:</strong> Continuously track performance and make improvements</li>
      </ol>

      <h2 class="text-3xl font-bold mb-4 mt-8">The Future is Autonomous</h2>
      <p class="mb-6">AI agents represent a fundamental shift towards autonomous business operations. Organizations that embrace this technology today will gain significant competitive advantages, including reduced operational costs, improved efficiency, and enhanced customer experiences.</p>
      
      <p class="mb-6">The key to success lies in thoughtful implementation, continuous learning, and maintaining the right balance between automation and human oversight. As AI agent technology continues to evolve, the possibilities for business transformation are virtually limitless.</p>
    `
  }
};

export default function BlogDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const contentRef = useIntersectionObserver();
  const newsletterRef = useIntersectionObserver();

  const blog = blogContent[id || ''];

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

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Image */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${blog.image})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <Link href="/blog">
              <Button variant="outline" className="mb-6 text-white border-white hover:bg-white hover:text-black">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center space-x-6 text-gray-200">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>{blog.category}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section 
        ref={contentRef.elementRef}
        className="py-16 bg-background"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`prose prose-lg max-w-none transition-all duration-700 ${
            contentRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section 
        ref={newsletterRef.elementRef}
        className="py-16 bg-muted"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-700 ${
            newsletterRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get the latest insights on AI, sustainability, and technology delivered to your inbox.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onNewsletterSubmit)} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          {...field} 
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={newsletterMutation.isPending}
                  className="whitespace-nowrap"
                >
                  {newsletterMutation.isPending ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}