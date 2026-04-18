import Image from 'next/image';
import './Faculty.css';

const facultyData = [
  { 
    id: 1, name: 'Ram Sir', subject: 'Maths & Science', exp: '14 Years', initials: 'RS', 
    img: '/imgs/ram_new.jpeg', 
    imgStyle: { objectFit: 'cover', objectPosition: 'center 15%', transform: 'scale(1)', width: '100%', height: '100%' }, 
    bio: <>Std 9 & 10: Maths & Science<br/>Std 11 & 12: Account & Stat</>, 
    fb: 'https://www.facebook.com/share/19uF9nXqPV/', ig: 'https://www.instagram.com/ramsinghvihara?igsh=MXJiNTR0cnhpejA1cw==' 
  },
  { 
    id: 2, name: 'Yashvant Sir', subject: 'English', exp: '14 Years', initials: 'YS', 
    img: '/imgs/yashwant_new.jpeg', 
    imgStyle: { objectFit: 'cover', objectPosition: 'center 15%', transform: 'scale(1)', width: '100%', height: '100%' }, 
    bio: 'Std 9 to 12: English', 
    fb: 'https://www.facebook.com/share/1J2HGLatr6/', ig: 'https://www.instagram.com/yashvant_singh_vihara?igsh=MTJtbG5sem56cDNhdg==' 
  },
  { 
    id: 3, name: 'Jayesh Sir', subject: 'Social Science', exp: '9 Years', initials: 'JS', 
    img: '/imgs/jayesh_new.jpeg', 
    imgStyle: { objectFit: 'cover', objectPosition: 'center 15%', transform: 'scale(1)', width: '100%', height: '100%' }, 
    bio: <>Std 9 & 10: Social Science<br/>Std 11 & 12: Economics, Sociology, Geography, Psychology</>, 
    fb: 'https://www.facebook.com/share/1BDVtYnq8C/', ig: 'https://www.instagram.com/jb_ahir__8?igsh=MTE2cTl2eTdrenRpaA==' 
  }
];

export default function Faculty() {
  return (
    <section id="faculty" className="faculty-section">
      <div className="container">
        <h2 className="section-title text-center" style={{ color: '#6C6058', marginBottom: '48px', fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: 'center' }}>
          Meet Our Expert Faculty
        </h2>
        
        <div className="faculty-grid">
          {facultyData.map(teacher => (
            <div key={teacher.id} className="faculty-card">
              <div className="faculty-avatar" style={teacher.img ? { padding: 0, overflow: 'hidden', position: 'relative' } : {}}>
                {teacher.img ? (
                  <Image 
                    src={teacher.img} 
                    alt={teacher.name} 
                    width={100} 
                    height={100} 
                    style={teacher.imgStyle as any}
                  />
                ) : (
                  teacher.initials
                )}
              </div>
              <h3 className="faculty-name">{teacher.name}</h3>
              <div className="faculty-badge">
                {teacher.subject} <span className="badge-divider">|</span> {teacher.exp}
              </div>
              <p className="faculty-bio">{teacher.bio}</p>
              <div className="faculty-socials">
                <a href={teacher.fb} target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.039C6.5 2.039 2 6.539 2 12.04c0 5.004 3.657 9.143 8.438 9.878v-6.987h-2.54V12.04h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.89h-2.33v6.988C18.343 21.182 22 17.044 22 12.04c0-5.5-4.5-10.001-10-10.001z"/></svg>
                </a>
                <a href={teacher.ig} target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
