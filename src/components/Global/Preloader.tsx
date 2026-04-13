import { useState, useEffect } from 'react';
import './Preloader.css';
import logo from '../../assets/logo.png';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader-overlay">
      <div className="preloader-content">
        <img src={logo} alt="Krishna Academy" className="preloader-logo" />
        <div className="preloader-spinner"></div>
      </div>
    </div>
  );
}
