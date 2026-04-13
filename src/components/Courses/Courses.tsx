import { useState } from 'react';
import './Courses.css';

const coursesData = [
  { id: 1, class: 'Class 5 to 7', category: 'Primary', tags: ['Maths', 'Science', 'English'], time: '4 PM - 6 PM', board: 'GSEB & CBSE', duration: '1 Year' },
  { id: 2, class: 'Class 8', category: 'Secondary', tags: ['Maths', 'Science', 'Languages'], time: '4 PM - 7 PM', board: 'GSEB & CBSE', duration: '1 Year' },
  { id: 3, class: 'Class 9', category: 'Secondary', tags: ['Maths', 'Science', 'Languages'], time: '4 PM - 7 PM', board: 'GSEB & CBSE', duration: '1 Year' },
  { id: 4, class: 'Class 10', category: 'Secondary', tags: ['Maths', 'Science', 'English', 'SST'], time: '5 PM - 8 PM', board: 'GSEB & CBSE', duration: '1 Year (Board Prep)' },
  { id: 5, class: 'Class 11 (Science)', category: 'Higher Secondary', tags: ['Physics', 'Chemistry', 'Maths/Bio'], time: '7 AM - 12 PM', board: 'GSEB', duration: '1 Year' },
  { id: 6, class: 'Class 12 (Science)', category: 'Higher Secondary', tags: ['Physics', 'Chemistry', 'Maths/Bio'], time: '7 AM - 1 PM', board: 'GSEB', duration: '1 Year (Board Prep)' },
];

const tabs = ['All', 'Primary', 'Secondary', 'Higher Secondary'];

export default function Courses() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredCourses = activeTab === 'All' 
    ? coursesData 
    : coursesData.filter(c => c.category === activeTab);

  return (
    <section id="courses" className="courses-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Courses</h2>
          <p className="section-subtitle">From primary to board exams — we cover it all</p>
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
              <div className={`course-banner ${index % 2 === 0 ? 'banner-brown' : 'banner-gold'}`}></div>
              <div className="course-content">
                <div className="course-header">
                  <span className="course-board">{course.board}</span>
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

                <button className="btn btn-outline course-btn" onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}>Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
