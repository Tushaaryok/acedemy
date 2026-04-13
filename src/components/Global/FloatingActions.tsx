import { useState, useEffect } from 'react';
import './FloatingActions.css';

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 300) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 300) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-actions">
      {showScroll && (
        <button className="back-to-top" onClick={scrollTop} aria-label="Back to top">
          ↑
        </button>
      )}
      <a 
        href="https://wa.me/918160991166" 
        className="floating-whatsapp" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="WhatsApp Us"
      >
        💬
      </a>
    </div>
  );
}
