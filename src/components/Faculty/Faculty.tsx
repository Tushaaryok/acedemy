import './Faculty.css';

const facultyData = [
  { id: 1, name: 'Dr. Vivek Joshi', subject: 'Physics', exp: '15 Years', initials: 'VJ', bio: 'Renowned expert in simplifying complex quantum physics concepts.' },
  { id: 2, name: 'Megha Vyas', subject: 'Mathematics', exp: '10 Years', initials: 'MV', bio: 'Specialist in shortcut techniques for IIT-JEE and board exams.' },
  { id: 3, name: 'Prof. Ramesh Patel', subject: 'Chemistry', exp: '12 Years', initials: 'RP', bio: 'Known for masterclass practical sessions and organic chemistry.' },
  { id: 4, name: 'Sonal Desai', subject: 'Biology', exp: '8 Years', initials: 'SD', bio: 'Helps students achieve top medical entrance exam scores seamlessly.' },
];

export default function Faculty() {
  return (
    <section id="faculty" className="faculty-section">
      <div className="container">
        <h2 className="section-title text-center" style={{ color: '#5C4036', marginBottom: '48px', fontFamily: '"Playfair Display", serif', textAlign: 'center' }}>
          Meet Our Expert Faculty
        </h2>
        
        <div className="faculty-grid">
          {facultyData.map(teacher => (
            <div key={teacher.id} className="faculty-card">
              <div className="faculty-avatar">
                {teacher.initials}
              </div>
              <h3 className="faculty-name">{teacher.name}</h3>
              <div className="faculty-badge">
                {teacher.subject} <span className="badge-divider">|</span> {teacher.exp}
              </div>
              <p className="faculty-bio">{teacher.bio}</p>
              <div className="faculty-socials">
                <a href="#linkedin" className="social-icon">in</a>
                <a href="#twitter" className="social-icon">tw</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
