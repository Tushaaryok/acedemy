import './Footer.css';
import logo from '../../assets/logo.jpeg';

export default function Footer() {
  return (
    <footer className="footer bg-dark">
      <div className="container">
        <div className="footer-top">
          
          <div className="footer-col footer-brand">
            <img src={logo} alt="Krishna Academy" className="footer-logo" />
            <p className="footer-tagline">
              Shape Your Future With Excellence. Best coaching institute for standard 5 to 12.
            </p>
            <div className="footer-socials">
              <a href="#fb">f</a>
              <a href="#ig">in</a>
              <a href="#yt">▶</a>
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
                <a href="tel:+918160991166">+91 81609 91166</a>
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
