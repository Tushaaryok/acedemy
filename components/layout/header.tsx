'use client';
import { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../public/assets/logo.jpeg';
import Link from 'next/link';
import { Menu, X, ArrowRight, Sparkles, Search, LogOut } from 'lucide-react';
import SearchModal from '../ui/SearchModal';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

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
            href={isAuthenticated ? "/dashboard" : "/login"} 
            className="btn btn-enroll mobile-only text-center flex items-center justify-center gap-2 mt-8 shadow-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {isAuthenticated ? 'Dashboard' : 'Student Portal'} <ArrowRight size={18} />
          </Link>
          {isAuthenticated && (
            <button 
              onClick={() => { logout(); router.push('/'); setIsMobileMenuOpen(false); }}
              className="mt-6 flex items-center justify-center gap-2 text-rose-500 font-black uppercase text-[10px] tracking-widest mobile-only"
            >
              <LogOut size={16} /> Logout Account
            </button>
          )}
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

           <div className="flex items-center gap-4 desktop-only">
             <Link 
               href={isAuthenticated ? (user?.role === 'admin' ? '/admin' : user?.role === 'teacher' ? '/teacher' : '/dashboard') : "/login"} 
               className="btn btn-enroll flex items-center gap-2 group"
             >
               {isAuthenticated ? 'Dashboard' : 'Student Portal'}
               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </Link>
             
             {isAuthenticated && (
               <button 
                 onClick={() => { logout(); router.push('/'); }}
                 className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                 title="Logout"
               >
                 <LogOut size={20} />
               </button>
             )}
           </div>
           
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
