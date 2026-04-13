import './Results.css';

const topStudents = [
  { id: 1, name: 'Aarushi Patel', class: 'Std 12 Science', percent: '98.5%', img: 'https://images.unsplash.com/photo-1544717297-fa3274296901?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 2, name: 'Siddharth Rao', class: 'Std 10 Board', percent: '97.2%', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 3, name: 'Kavya Shah', class: 'Std 12 Commerce', percent: '96.8%', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 4, name: 'Dev Joshi', class: 'Std 12 Science', percent: '96.5%', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 5, name: 'Prisha Mehta', class: 'Std 10 Board', percent: '95.9%', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 6, name: 'Rohan Desai', class: 'Std 12 Science', percent: '95.1%', img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&h=200&auto=format&fit=crop' },
];

export default function Results() {
  return (
    <section id="results-wall" className="results-section">
      <div className="container">
        <div className="results-header">
          <h2 className="results-title">Our Students, Our Pride</h2>
          <p className="results-subtitle">Consistently producing city toppers year after year.</p>
        </div>
        
        {/* Infinite CSS Marquee */}
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {/* Double the array for seamless infinite scroll */}
            {[...topStudents, ...topStudents].map((student, idx) => (
              <div key={`${student.id}-${idx}`} className="topper-card">
                <div className="topper-photo">
                  <img src={student.img} alt={student.name} />
                </div>
                <div className="topper-info">
                  <h4 className="topper-name">{student.name}</h4>
                  <p className="topper-class">{student.class}</p>
                </div>
                <div className="topper-score">{student.percent}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="results-highlights">
          <div className="highlight">
            <span className="hl-value">GSEB Board</span>
            <span className="hl-label">Curriculum</span>
          </div>
          <div className="highlight-divider"></div>
          <div className="highlight">
            <span className="hl-value">2024</span>
            <span className="hl-label">Recent Batch</span>
          </div>
          <div className="highlight-divider"></div>
          <div className="highlight">
            <span className="hl-value">95%+</span>
            <span className="hl-label">Pass Rate</span>
          </div>
        </div>
        
        <div className="results-action">
          <button className="btn-outline-gold">See All Results</button>
        </div>
      </div>
    </section>
  );
}
