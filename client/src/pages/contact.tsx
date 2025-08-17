import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { HeroSection } from '@/components/ui/hero-section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { submitContactForm } from '@/lib/contact-api';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacy: z.boolean().refine(val => val === true, {
    message: 'You must agree to the Privacy Policy and Terms of Service'
  })
});

const officeHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM PST' },
  { day: 'Saturday', hours: '10:00 AM - 2:00 PM PST' },
  { day: 'Sunday', hours: 'Closed' }
];

export default function Contact() {
  const { toast } = useToast();
  const formRef = useIntersectionObserver();
  const infoRef = useIntersectionObserver();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      privacy: false,
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
    const { privacy, ...formData } = data;
    contactMutation.mutate(formData);
  };

  return (
    <div>
      <HeroSection
        title="Let's Start a Conversation"
        subtitle="Ready to transform your business with sustainable AI solutions? We're here to help. Get in touch with our team to discuss your project and explore how we can work together."
      />

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div 
              ref={formRef.elementRef}
              className={`transition-all duration-700 ${
                formRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <h2 className="text-2xl font-bold text-black mb-6">Send Us a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              data-testid="contact-name"
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
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="john@company.com" 
                              {...field} 
                              data-testid="contact-email"
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
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your Company" 
                            {...field} 
                            data-testid="contact-company"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="contact-subject">
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ai-solutions">AI & Automation Solutions</SelectItem>
                              <SelectItem value="data-analytics">Data Intelligence</SelectItem>
                              <SelectItem value="full-stack">Full-Stack Development</SelectItem>
                              <SelectItem value="consulting">Consulting Services</SelectItem>
                              <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
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
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={6}
                            placeholder="Tell us about your project, challenges, or goals..." 
                            {...field} 
                            data-testid="contact-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="privacy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="contact-privacy"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            I agree to the{' '}
                            <a href="#" className="text-forest-green hover:underline">Privacy Policy</a>
                            {' '}and{' '}
                            <a href="#" className="text-forest-green hover:underline">Terms of Service</a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={contactMutation.isPending}
                    className="w-full bg-bright-teal hover:bg-teal-600 text-white"
                    data-testid="contact-submit"
                  >
                    {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Information */}
            <div 
              ref={infoRef.elementRef}
              className={`transition-all duration-700 ${
                infoRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <h2 className="text-2xl font-bold text-black mb-6">Get in Touch</h2>
              
              {/* Contact Details */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-forest-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Email</h3>
                    <p className="text-gray-600">sales@greenaisolutions.org</p>
                    <p className="text-gray-600">support@greenaisolutions.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  {/* <div className="w-12 h-12 bg-bright-teal rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div> */}
                  {/* <div>
                    <h3 className="font-semibold text-charcoal mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-500 text-sm">Mon-Fri: 9:00 AM - 6:00 PM PST</p>
                  </div> */}
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-forest-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Address</h3>
                    <p className="text-gray-600">
                      Hinjewadi, IT Park<br />
                      Pune, Maharashtra <br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div 
                className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-8 cursor-pointer hover:bg-gray-300 transition-colors"
                data-testid="map-placeholder"
              >
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p className="font-medium">Interactive Google Map</p>
                  <p className="text-sm">Click to view location</p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-light-gray rounded-lg p-6">
                <h3 className="font-semibold text-charcoal mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Office Hours
                </h3>
                <div className="space-y-2 text-sm">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
