import { useEffect, useState } from 'react';
import './Hero.css';
import ramImg from '/imgs/ram_new.jpeg';
import yashwantImg from '/imgs/yashwant_new.jpeg';
import jayeshImg from '/imgs/jayesh_new.jpeg';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className={`hero ${isLoaded ? 'animate-in' : ''}`}>
      <div className="container hero-wrapper">
        {/* Left: Content Side */}
        <div className="hero-content">
          <div className="hero-badge-pw">
            Upleta’s #1 Coaching Institute
          </div>
          
          <h1 className="hero-heading">
            Expert Faculty • Proven Results • Affordable Fees
          </h1>
          
          <p className="hero-description">
            Join Krishna Academy and achieve your academic goals with experienced teachers and structured learning. We provide the best tuition classes for Std 5 to 12.
          </p>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="badge-item">
              <span>👥</span> 500+ Students
            </div>
            <div className="badge-item">
              <span>🏆</span> Top Results
            </div>
          </div>
          
          <div className="hero-btn-group">
            <button className="btn-pw-primary" onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}>
              Enroll Now
            </button>
            <button className="btn-pw-secondary" onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Courses
            </button>
          </div>
        </div>
        
        {/* Right: Faculty Stack Visual */}
        <div className="hero-visual">
          <div className="faculty-card-stack">
            <div className="fac-card fac-1">
              <img src={ramImg} alt="Ram Sir" />
            </div>
            <div className="fac-card fac-2">
              <img src={yashwantImg} alt="Yashwant Sir" />
            </div>
            <div className="fac-card fac-3">
              <img src={jayeshImg} alt="Jayesh Sir" />
            </div>
          </div>
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
