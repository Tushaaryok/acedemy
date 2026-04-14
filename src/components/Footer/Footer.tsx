import './Footer.css';
import logo from '../../assets/logo.jpeg';

export default function Footer() {
  return (
    <footer className="footer bg-dark">
      <div className="container">
        <div className="footer-top">
          
          <div className="footer-col footer-brand">
            <img src={logo} alt="Krishna Academy Upleta Coaching" className="footer-logo" />
            <p className="footer-tagline">
              Shape Your Future With Excellence. Best coaching institute in Upleta for standard 5 to 12.
            </p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/share/1KqsMzi9CW/" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.039C6.5 2.039 2 6.539 2 12.04c0 5.004 3.657 9.143 8.438 9.878v-6.987h-2.54V12.04h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.89h-2.33v6.988C18.343 21.182 22 17.044 22 12.04c0-5.5-4.5-10.001-10-10.001z"/></svg>
              </a>
              <a href="https://www.instagram.com/shreeram_singh901?igsh=MXBoMWR0bGd3cHhxNQ==" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.95C18.88 4 12 4 12 4s-6.88 0-8.6.47a2.78 2.78 0 0 0-1.94 1.95A29.04 29.04 0 0 0 1 12a29.04 29.04 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.94C5.12 20 12 20 12 20s6.88 0 8.6-.48a2.78 2.78 0 0 0 1.94-1.94A29.04 29.04 0 0 0 23 12a29.04 29.04 0 0 0-.46-5.58zM9.5 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#faculty">Faculty</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Our Courses</h4>
            <ul className="footer-links">
              <li><a href="#courses">Class 8</a></li>
              <li><a href="#courses">Class 9</a></li>
              <li><a href="#courses">Class 10</a></li>
              <li><a href="#courses">Class 11</a></li>
              <li><a href="#courses">Class 12</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📍</span>
                <a 
                  href="https://share.google/UQtN9ZsU4HPDbJjRI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Shaligram Complex, Adarsh Street, Vadchok, Upleta, Gujarat 360490
                </a>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <a href="tel:+918160991166">+91 81609 91166</a>, <a href="tel:+919409668196">+91 94096 68196</a>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <a href="mailto:upletakrishnaacademy@gmail.com">upletakrishnaacademy@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Krishna Academy Upleta. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
