'use client';
import { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../assets/logo.jpeg';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Left: Logo & Title */}
        <div className="header-brand">
          <img src={logo} alt="Krishna Academy" className="header-logo" />
          <span className="header-title">Krishna Academy</span>
        </div>
        
        {/* Center: Desktop Nav */}
        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="mobile-menu-header">
            <span className="header-title">Menu</span>
            <button 
              className="close-menu-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
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
          <button className="btn btn-enroll mobile-only" onClick={() => { document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }}>Enroll Now</button>
        </nav>
        
        {/* Right: Actions */}
        <div className="header-actions">
           <button className="btn btn-enroll desktop-only" onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}>Enroll Now</button>
           
           {/* Hamburger Menu Toggle */}
           <button 
             className="hamburger-btn"
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             aria-label="Toggle menu"
           >
             ☰
           </button>
        </div>
      </div>
      
      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </header>
  );
}
