import { useState } from 'react';
import type { FormEvent } from 'react';
import './Admission.css';
const API_URL = import.meta.env.VITE_API_URL || '';

export default function Admission() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    classVal: '',
    board: '',
    message: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.studentName || !formData.parentName || !formData.phone || !formData.classVal || !formData.board) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      showToast('Please enter a valid 10-digit Indian phone number.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        showToast(data.message || 'Enquiry sent successfully! We will contact you soon.', 'success');
        alert(data.message || 'Enquiry sent successfully! We will contact you soon.');
        setFormData({ studentName: '', parentName: '', phone: '', classVal: '', board: '', message: '' });
      } else {
        showToast(data.message || 'Failed to submit enquiry. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      showToast('Connection error. Please call us at +91 81609 91166 / +91 94096 68196 or WhatsApp us directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showToast = (message: string, type: string) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  return (
    <section id="admissions" className="admission-section">
      <div className="container admission-container">
        
        <div className="admission-benefits">
          <h2 className="benefits-title">Join Krishna Academy</h2>
          <p className="benefits-subtitle">Take the first step towards a brilliant academic future.</p>
          
          <ul className="benefits-list">
            <li>
              <span className="check-icon">✓</span>
              <div>
                <strong>Expert Coaching</strong>
                <p>Learn from highly experienced faculty dedicated to your success.</p>
              </div>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <div>
                <strong>Small Batch Sizes</strong>
                <p>Personalized attention to ensure no student is left behind.</p>
              </div>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <div>
                <strong>Regular Assessments</strong>
                <p>Weekly tests directly mirroring board exam patterns.</p>
              </div>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <div>
                <strong>Modern Infrastructure</strong>
                <p>Air-conditioned classrooms with smart digital learning boards.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="admission-form-wrapper">
          <form className="admission-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Admission Enquiry</h3>
            
            <div className="form-group">
              <label htmlFor="studentName">Student Name *</label>
              <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="Enter student's full name" />
            </div>
            
            <div className="form-group">
              <label htmlFor="parentName">Parent Name *</label>
              <input type="text" id="parentName" name="parentName" value={formData.parentName} onChange={handleInputChange} placeholder="Enter parent's full name" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">WhatsApp Number *</label>
                <div className="input-icon-wrapper">
                  <span className="input-icon">📱</span>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="10-digit number" />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="classVal">Class Applying For *</label>
                <select id="classVal" name="classVal" value={formData.classVal} onChange={handleInputChange}>
                  <option value="">Select Class</option>
                  <option value="Std 5">Std 5</option>
                  <option value="Std 6">Std 6</option>
                  <option value="Std 7">Std 7</option>
                  <option value="Std 8">Std 8</option>
                  <option value="Std 9">Std 9</option>
                  <option value="Std 10">Std 10</option>
                  <option value="Std 11 Science">Std 11 Science</option>
                  <option value="Std 11 Commerce">Std 11 Commerce</option>
                  <option value="Std 12 Science">Std 12 Science</option>
                  <option value="Std 12 Commerce">Std 12 Commerce</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="board">Board *</label>
                <select id="board" name="board" value={formData.board} onChange={handleInputChange}>
                  <option value="">Select Board</option>
                  <option value="GSEB">GSEB (Gujarat Board)</option>
                  <option value="CBSE">CBSE</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message (Optional)</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Any specific doubts or questions..." rows={3}></textarea>
            </div>

            <button type="submit" className="btn submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Enquiry'}
            </button>
          </form>
        </div>
      </div>

      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </section>
  );
}
