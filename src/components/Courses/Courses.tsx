'use client';
import { useState } from 'react';
import './Courses.css';

const coursesData = [
  { id: 1, class: 'Class 5 to 7', category: 'Primary', tags: ['Maths', 'Science', 'English'], time: '4 PM - 6 PM', board: 'GSEB & CBSE', duration: '1 Year', videoId: 'cJuwN7bh_GA' },
  { id: 2, class: 'Class 8', category: 'Secondary', tags: ['Maths', 'Science', 'Languages'], time: '4 PM - 7 PM', board: 'GSEB & CBSE', duration: '1 Year', videoId: 'fWrqGKUyPt8' },
  { id: 3, class: 'Class 9', category: 'Secondary', tags: ['Maths', 'Science', 'Languages'], time: '4 PM - 7 PM', board: 'GSEB & CBSE', duration: '1 Year', videoId: 'JJeFfFoghIo' },
  { id: 4, class: 'Class 10', category: 'Secondary', tags: ['Maths', 'Science', 'English', 'SST'], time: '5 PM - 8 PM', board: 'GSEB & CBSE', duration: '1 Year (Board Prep)', videoId: 'KQoaQ9QDB-4' },
  { id: 5, class: 'Class 11 (Science)', category: 'Higher Secondary', tags: ['Physics', 'Chemistry', 'Maths/Bio'], time: '7 AM - 12 PM', board: 'GSEB', duration: '1 Year', videoId: 'U5PGuVDYbXc' },
  { id: 6, class: 'Class 12 (Science)', category: 'Higher Secondary', tags: ['Physics', 'Chemistry', 'Maths/Bio'], time: '7 AM - 1 PM', board: 'GSEB', duration: '1 Year (Board Prep)', videoId: 'bfSoopCm0i8' },
];

const tabs = ['All', 'Primary', 'Secondary', 'Higher Secondary'];

export default function Courses() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredCourses = activeTab === 'All' 
    ? coursesData 
    : coursesData.filter(c => c.category === activeTab);

  const openVideo = (videoId: string) => {
    setSelectedVideo(videoId);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="courses" className="courses-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Krishna Academy Upleta Courses</h2>
          <p className="section-subtitle">Explore the best coaching & tuition classes in Upleta for commerce and science.</p>
        </div>

        <div className="courses-filter">
          {tabs.map(tab => (
            <button 
              key={tab}
              className={`filter-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Primary' ? 'Primary (5-7)' : tab === 'Secondary' ? 'Secondary (8-10)' : tab === 'Higher Secondary' ? 'Higher Secondary (11-12)' : tab}
            </button>
          ))}
        </div>

        <div className="courses-grid">
          {filteredCourses.map((course, index) => (
            <div key={course.id} className="course-card">
              <div className="course-thumbnail" onClick={() => course.videoId && openVideo(course.videoId)}>
                <img 
                  src={`https://img.youtube.com/vi/${course.videoId}/hqdefault.jpg`} 
                  alt={course.class} 
                  className="thumbnail-img" 
                />
                <div className="thumbnail-overlay">
                  <div className="play-circle">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <span className="play-text">Watch Demo</span>
                </div>
              </div>
              <div className={`course-banner ${index % 2 === 0 ? 'banner-brown' : 'banner-gold'}`}></div>
              <div className="course-content">
                <div className="course-header">
                  <div className="course-header-top">
                    <span className="course-board">{course.board}</span>
                    {course.videoId && (
                      <button className="demo-btn" onClick={() => openVideo(course.videoId)}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        Demo Class
                      </button>
                    )}
                  </div>
                  <h3 className="course-title">{course.class}</h3>
                </div>
                
                <div className="course-tags">
                  {course.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                
                <div className="course-details">
                  <div className="detail-item">
                    <span className="icon">⏱️</span> {course.duration}
                  </div>
                  <div className="detail-item">
                    <span className="icon">🕒</span> {course.time}
                  </div>
                </div>

                <div className="course-actions">
                  <button className="btn btn-outline course-btn enroll-btn" onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}>Enroll Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="video-close-btn" onClick={closeVideo}>&times;</button>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

