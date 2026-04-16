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
              <a href="https://www.facebook.com/share/1KqsMzi9CW/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.039C6.5 2.039 2 6.539 2 12.04c0 5.004 3.657 9.143 8.438 9.878v-6.987h-2.54V12.04h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.89h-2.33v6.988C18.343 21.182 22 17.044 22 12.04c0-5.5-4.5-10.001-10-10.001z"/></svg>
              </a>
              <a href="https://www.instagram.com/shreeram_singh901?igsh=MXBoMWR0bGd3cHhxNQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
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
                <span className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <a 
                  href="https://share.google/UQtN9ZsU4HPDbJjRI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Shaligram Complex, Vadchok, Upleta
                </a>
              </li>
              <li>
                <span className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <a href="tel:+918160991166">+91 81609 91166</a>
              </li>
              <li>
                <span className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <a href="mailto:upletakrishnaacademy@gmail.com">Email Us</a>
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
