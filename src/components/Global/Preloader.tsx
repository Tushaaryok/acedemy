'use client';
import { useState, useEffect } from 'react';
import './Preloader.css';
import logo from '../../assets/logo.jpeg';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    
    // Completely remove from DOM after animation finishes
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`preloader-overlay ${!loading ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <div className="logo-wrapper">
          <img src={logo} alt="Krishna Academy" className="preloader-logo" />
        </div>
        <div className="preloader-text">
          {"KRISHNA ACADEMY".split('').map((char, index) => (
            <span 
              key={index} 
              className="char" 
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}
