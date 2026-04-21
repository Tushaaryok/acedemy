'use client';
import { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../public/assets/logo.jpeg';
import Link from 'next/link';
import { Menu, X, ArrowRight, Sparkles, Search } from 'lucide-react';
import SearchModal from '../ui/SearchModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Courses', href: '#courses' },
    { name: 'Faculty', href: '#faculty' },
    { name: 'Results', href: '#results' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled shadow-lg shadow-black/5' : ''}`}>
      <div className="container header-container">
        {/* Left: Logo & Brand */}
        <Link href="/" className="header-brand group">
          <div className="relative">
            <img src={logo.src} alt="Krishna Academy" className="header-logo transition-all hover:scale-105" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center animate-bounce">
              <Sparkles size={8} className="text-white" fill="currentColor" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="header-title transition-colors">Krishna Academy</span>
            <span className="text-[10px] font-bold text-amber-600 tracking-[1px] uppercase -mt-1 opacity-0 group-hover:opacity-100 transition-all">Upleta's Pride</span>
          </div>
        </Link>
        
        {/* Center: Desktop Nav */}
        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="mobile-menu-header">
            <span className="header-title">Navigation</span>
            <button 
              className="close-menu-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
              onClick={() => handleNavClick(link.href)}
            >
              {link.name}
            </a>
          ))}
          {/* Mobile Enroll Button */}
          <Link 
            href="/login" 
            className="btn btn-enroll mobile-only text-center flex items-center justify-center gap-2 mt-8 shadow-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Student Portal <ArrowRight size={18} />
          </Link>
        </nav>
        
        {/* Right: Actions */}
        <div className="header-actions">
           <button 
             onClick={() => setIsSearchOpen(true)}
             className="p-3 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all"
             aria-label="Open search"
           >
              <Search size={22} />
           </button>

           <Link 
             href="/login" 
             className="btn btn-enroll desktop-only flex items-center gap-2 group"
           >
             Student Portal 
             <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </Link>
           
           {/* Hamburger Menu Toggle */}
           <button 
             className="hamburger-btn"
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             aria-label="Toggle menu"
           >
             {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
           </button>
        </div>
      </div>
      
      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="overlay animate-in fade-in duration-300" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
