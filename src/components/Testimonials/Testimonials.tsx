import { useState, useEffect, useCallback } from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Student, Std 10',
    initials: 'RS',
    text: 'Krishna Academy completely transformed my learning approach. The faculty is extremely supportive and the study materials are top-notch.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Meera Patel',
    role: 'Parent of Std 8 Student',
    initials: 'MP',
    text: 'I have seen a remarkable improvement in my daughter\'s grades. The regular parent-teacher interactive sessions keep us well-informed.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Aarav Desai',
    role: 'Student, Std 12 Science',
    initials: 'AD',
    text: 'The best coaching institute for board preparation. Their test series exactly mirrors the final exams and eliminates any exam fear.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sneha Joshi',
    role: 'Student, Std 10',
    initials: 'SJ',
    text: 'Teachers here don\'t just teach to finish the syllabus, they ensure every concept is crystal clear before moving forward.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Parent of Std 12 Student',
    initials: 'VS',
    text: 'Very professional environment with excellent infrastructure. My son was able to crack competitive exams with their expert guidance.',
    rating: 5,
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = testimonialsData.length;
  const maxIndex = Math.max(0, totalSlides - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="results" className="testimonials-section">
      <div className="container">
        <h2 className="section-title text-center">
          Krishna Academy Upleta Reviews
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#555' }}>Read what parents and students say about our institute.</p>
        
        <div className="carousel-container">
          <div 
            className="carousel-track" 
            style={{ 
              transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
              width: `${(totalSlides / itemsPerView) * 100}%` 
            }}
          >
            {testimonialsData.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="carousel-slide"
                style={{ width: `${100 / totalSlides}%` }}
              >
                <div className="testimonial-card">
                  <div className="quote-icon">❝</div>
                  <p className="review-text">"{testimonial.text}"</p>
                  
                  <div className="reviewer-info">
                    <div className="avatar">
                      {testimonial.initials}
                    </div>
                    <div className="details">
                      <div className="name-wrapper">
                        <span className="name">{testimonial.name}</span>
                        <div className="stars">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <span key={i} className="star">★</span>
                          ))}
                        </div>
                      </div>
                      <div className="role">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button 
              key={idx} 
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
