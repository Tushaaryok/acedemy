import { useState, useEffect, useRef } from 'react';
import './StatsCounter.css';

const statsData = [
  { id: 1, target: 2000, label: 'Happy Students', suffix: '+' },
  { id: 2, target: 15, label: 'Expert Teachers', suffix: '+' },
  { id: 3, target: 10, label: 'Years of Excellence', suffix: '+' },
  { id: 4, target: 95, label: 'Board Result Rate', suffix: '%' }
];

export default function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="container stats-container">
        {statsData.map((stat, index) => (
          <div key={stat.id} className="stat-wrapper">
            <div className="stat-item">
              <span className="stat-number">
                {isVisible ? <CountUp target={stat.target} /> : 0}{stat.suffix}
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
            {index < statsData.length - 1 && <div className="stat-divider"></div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    // Safety against division by zero or negative targets
    if (target <= 0) return;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
}
