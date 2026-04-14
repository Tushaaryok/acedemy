import { useEffect, useState } from 'react';
import './Hero.css';
import heroImg from '../../assets/hero-image.png';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Slight delay to ensure smooth entrance animation triggered after render
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className={`hero ${isLoaded ? 'animate-in' : ''}`}>
      <div className="hero-pattern-overlay"></div>
      
      <div className="container hero-wrapper">
        {/* Left side content */}
        <div className="hero-content">
          <div className="hero-badge">
            #1 Coaching Institute in Upleta, Gujarat
          </div>
          
          <h1 className="hero-heading">
            Krishna Academy Upleta: Best Coaching Classes
          </h1>
          
          <p className="hero-subheading">
            Top Tuition Classes in Upleta | Std 5 to 12 | Commerce & Science Coaching
          </p>
          
          <div className="hero-btn-group">
            <button className="btn-gold" onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}>Enroll Now</button>
            <button className="btn-outline-white" onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>View Courses</button>
          </div>
        </div>
        
        {/* Right side visual */}
        <div className="hero-visual">
          <img src={heroImg} alt="Students studying at Krishna Academy" className="floating-img" />
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
}
