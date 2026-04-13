import './Contact.css';

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title text-center" style={{ color: '#5C4036', marginBottom: '40px', fontFamily: '"Playfair Display", serif', textAlign: 'center' }}>
          Get In Touch
        </h2>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-text">
                <h3>Visit Us</h3>
                <a 
                  href="https://share.google/UQtN9ZsU4HPDbJjRI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Shaligram Complex, Adarsh Street,<br />Vadchok, Upleta, Gujarat 360490
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-text">
                <h3>Call Us</h3>
                <p><a href="tel:+918160991166">+91 81609 91166</a></p>
                <p><a href="tel:+919876543211">+91 98765 43211</a></p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-text">
                <h3>Email Us</h3>
                <p><a href="mailto:upletakrishnaacademy@gmail.com">upletakrishnaacademy@gmail.com</a></p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">⏰</div>
              <div className="contact-text">
                <h3>Working Hours</h3>
                <p>Mon - Sat: 7:00 AM - 8:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="contact-social-flex">
              <a href="#fb" className="contact-social-btn fb">f</a>
              <a href="#ig" className="contact-social-btn ig">in</a>
              <a href="#yt" className="contact-social-btn yt">▶</a>
              <a href="https://wa.me/918160991166" className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="contact-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3706.005308410333!2d70.2792087!3d21.7413199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3957f3822b0d7fbd%3A0xbcc8e2cbeab797e6!2sKrishna%20academy%2C%20upleta!5e0!3m2!1sen!2sin!4v1776083155662!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Krishna Academy Upleta Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
