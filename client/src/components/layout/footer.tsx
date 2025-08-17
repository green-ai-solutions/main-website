import { Link } from 'wouter';
import { Linkedin, Twitter, Github } from 'lucide-react';
import logoImage from '@assets/LOGO_1755352254706.jpg';

export function Footer() {
  return (
    <footer className="bg-offwhite text-gray-900 py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={logoImage} 
                alt="Green AI Solutions Logo" 
                className="h-8 w-8 mr-3 brightness-0 invert"
                data-testid="footer-logo"
              />
              <span className="font-bold text-xl">Green AI Solutions</span>
            </div>
            <p className="text-gray-600 max-w-md mb-6">
              Empowering businesses with sustainable AI solutions that drive growth while maintaining ethical responsibility and computational efficiency.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-bright-teal transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-bright-teal transition-colors"
                data-testid="social-twitter"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-bright-teal transition-colors"
                data-testid="social-github"
              >
                <Github size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/services" className="hover:text-bright-teal transition-colors">AI & Automation</Link></li>
              <li><Link href="/services" className="hover:text-bright-teal transition-colors">Data Intelligence</Link></li>
              <li><Link href="/services" className="hover:text-bright-teal transition-colors">Full-Stack Development</Link></li>
              <li><Link href="/services" className="hover:text-bright-teal transition-colors">Managed AI & Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/about" className="hover:text-bright-purple transition-colors">About Us</Link></li>
              <li><Link href="/case-studies" className="hover:text-bright-purple transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="hover:text-bright-purple transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-bright-purple transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-bright-purple transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Green AI Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-bright-purple-600 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-bright-purple-600 text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
