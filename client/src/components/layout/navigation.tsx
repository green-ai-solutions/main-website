import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Moon, Sun } from 'lucide-react';
import logoImage from '@assets/LOGO_1755352254706.jpg';
import { useTheme } from '@/contexts/theme-context';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="fixed top-0 w-full glass-morphism border-b border-white/10 z-50 transition-all duration-300" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" data-testid="logo-link">
              <div className="flex items-center group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl p-1 transition-all duration-300 group-hover:scale-110">
                  <img 
                    src={logoImage} 
                    alt="Green AI Solutions Logo" 
                    className="h-10 w-10"
                    data-testid="logo-image"
                  />
                </div>
                <span className="font-bold text-xl text-foreground ml-3 transition-all duration-300 group-hover:text-primary">
                  Green AI Solutions
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {navigation.map((item, index) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  data-testid={`nav-link-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  <div className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive(item.href) 
                      ? 'text-primary bg-primary/10 shadow-lg' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-3 ml-6">
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl glass-morphism hover:bg-primary/10 transition-all duration-300 transform hover:scale-110"
                data-testid="theme-toggle"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-foreground" />
                ) : (
                  <Sun className="h-5 w-5 text-foreground" />
                )}
              </button>
              
              <Link href="/contact">
                <button 
                  className="glow-effect bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
                  data-testid="contact-button"
                >
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass-morphism"
              data-testid="mobile-theme-toggle"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-foreground" />
              )}
            </button>
            
            <button 
              className="p-2 rounded-lg glass-morphism text-foreground hover:text-primary transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-morphism border-t border-white/10" data-testid="mobile-menu">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`mobile-nav-link-${item.name.toLowerCase().replace(' ', '-')}`}
              >
                <div className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(item.href) 
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                }`}>
                  {item.name}
                </div>
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="mt-4">
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold">
                  Contact Us
                </button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
