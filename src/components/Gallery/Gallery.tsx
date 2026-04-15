import { useState } from 'react';
import './Gallery.css';

const galleryData = [
  { id: 1, category: 'Classroom', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop' },
  { id: 2, category: 'Events', src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop' },
  { id: 3, category: 'Results Day', src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop' },
  { id: 4, category: 'Sports', src: 'https://images.unsplash.com/photo-1517649763962-0c6234278a0b?q=80&w=800&auto=format&fit=crop' },
  { id: 5, category: 'Classroom', src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop' },
  { id: 6, category: 'Events', src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop' },
  { id: 7, category: 'Classroom', src: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800&auto=format&fit=crop' },
  { id: 8, category: 'Sports', src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop' },
  { id: 9, category: 'Results Day', src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop' },
];

const tabs = ['All', 'Classroom', 'Events', 'Results Day', 'Sports'];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  const filteredData = activeTab === 'All' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeTab);

  const openLightbox = (src: string) => {
    setCurrentImg(src);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <h2 className="section-title text-center" style={{ color: '#6C6058', marginBottom: '40px', fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: 'center' }}>
          Life at Krishna Academy
        </h2>
        
        <div className="gallery-filter">
          {tabs.map(tab => (
            <button 
              key={tab}
              className={`filter-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="gallery-grid">
          {filteredData.map((item) => (
            <div key={item.id} className="gallery-item" onClick={() => openLightbox(item.src)}>
              <img src={item.src} alt={item.category} loading="lazy" />
              <div className="gallery-overlay">
                <span className="expand-icon">⤢</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox" onClick={() => setLightboxOpen(false)}>
          <button className="close-lightbox" onClick={() => setLightboxOpen(false)}>✕</button>
          <img src={currentImg} alt="Expanded view" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
