import './Contact.css';

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title text-center" style={{ color: '#6C6058', marginBottom: '40px', fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: 'center' }}>
          Contact Krishna Academy Upleta
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
                <h3>Krishna Academy Upleta Contact Number</h3>
                <p><a href="tel:+918160991166">+91 81609 91166</a></p>
                <p><a href="tel:+919409668196">+91 94096 68196</a></p>
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
              <a href="https://www.facebook.com/share/1KqsMzi9CW/" target="_blank" rel="noopener noreferrer" className="contact-social-btn fb">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.039C6.5 2.039 2 6.539 2 12.04c0 5.004 3.657 9.143 8.438 9.878v-6.987h-2.54V12.04h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.89h-2.33v6.988C18.343 21.182 22 17.044 22 12.04c0-5.5-4.5-10.001-10-10.001z"/></svg>
              </a>
              <a href="https://www.instagram.com/shreeram_singh901?igsh=MXBoMWR0bGd3cHhxNQ==" target="_blank" rel="noopener noreferrer" className="contact-social-btn ig">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="contact-social-btn yt">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.95C18.88 4 12 4 12 4s-6.88 0-8.6.47a2.78 2.78 0 0 0-1.94 1.95A29.04 29.04 0 0 0 1 12a29.04 29.04 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.94C5.12 20 12 20 12 20s6.88 0 8.6-.48a2.78 2.78 0 0 0 1.94-1.94A29.04 29.04 0 0 0 23 12a29.04 29.04 0 0 0-.46-5.58zM9.5 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
              </a>
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
