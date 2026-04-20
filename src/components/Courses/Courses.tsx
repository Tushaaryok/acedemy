'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import './Courses.css';

export default function Courses() {
  const [batches, setBatches] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchBatches() {
      const { data } = await supabase.from('batches').select('*').order('name');
      if (data) setBatches(data);
      setLoading(false);
    }
    fetchBatches();
  }, [supabase]);

  const tabs = ['All', 'Secondary', 'Higher Secondary'];

  const filteredCourses = activeTab === 'All' 
    ? batches 
    : batches.filter(c => c.name.includes(activeTab));

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
              <div className="course-thumbnail" onClick={() => (course.demo_video_id || 'bfSoopCm0i8') && openVideo(course.demo_video_id || 'bfSoopCm0i8')}>
                <img 
                   src={`https://img.youtube.com/vi/${course.demo_video_id || 'bfSoopCm0i8'}/hqdefault.jpg`} 
                   alt={course.name} 
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
                      <span className="course-board">GSEB / CBSE</span>
                      <button className="demo-btn" onClick={() => openVideo(course.demo_video_id || 'bfSoopCm0i8')}>
                         <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                         Demo Class
                      </button>
                   </div>
                   <h3 className="course-title">{course.name}</h3>
                </div>
                
                <div className="course-tags">
                   {(course.tags || ['Maths', 'Science', 'English']).map((tag: string) => (
                      <span key={tag} className="tag">{tag}</span>
                   ))}
                </div>
                
                <div className="course-details">
                   <div className="detail-item">
                      <span className="icon">⏱️</span> Academic Session {course.year}
                   </div>
                   <div className="detail-item">
                      <span className="icon">🕒</span> Flexible Batches
                   </div>
                </div>

                <div className="course-actions">
                   <button className="btn btn-outline course-btn enroll-btn" onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}>Enroll Now</button>
                </div>
              </div>
            </div>
          ))}
          {filteredCourses.length === 0 && !loading && (
             <div className="col-span-full py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs opacity-50">
                Syncing Academic Catalogs...
             </div>
          )}
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

