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
          <span className="char">K</span>
          <span className="char">R</span>
          <span className="char">I</span>
          <span className="char">S</span>
          <span className="char">H</span>
          <span className="char">N</span>
          <span className="char">A</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}
