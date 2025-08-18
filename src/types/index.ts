export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: 'forest' | 'teal';
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'fintech' | 'healthcare' | 'ecommerce' | 'manufacturing';
  description: string;
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
  challenge: string;
  solution: string;
  technologies: string[];
  results: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  image: string;
  readTime: number;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}
