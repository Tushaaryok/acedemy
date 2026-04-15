/**
 * Admission.tsx
 * =============
 * 3-step OTP Admission Enquiry Form
 *
 * STEP 1 → Phone input + "Send OTP" button
 * STEP 2 → 6-box OTP input + 60s countdown + "Verify OTP"
 * STEP 3 → Full enquiry form (name, class, board, message) + submit
 *
 * Backend: Express.js on Railway (VITE_API_URL env var)
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import type { KeyboardEvent, ClipboardEvent, ChangeEvent, FormEvent } from 'react';
import './Admission.css';

// ─── API base URL from env (falls back to empty for same-origin) ───
const API_URL = import.meta.env.VITE_API_URL || '';

// ─── Indian phone regex: starts 6-9, exactly 10 digits ────────────
const PHONE_REGEX = /^[6-9]\d{9}$/;

// ─── OTP countdown duration (seconds) ─────────────────────────────
const OTP_TIMER_SECONDS = 60;

// ──────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3;

interface Toast {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface EnquiryForm {
  studentName: string;
  parentName: string;
  classVal: string;
  board: string;
  message: string;
}

// ══════════════════════════════════════════════════════════════════
// DEFAULT EXPORT — Admission Component
// ══════════════════════════════════════════════════════════════════
export default function Admission() {
  // ── Current wizard step ─────────────────────────────────────────
  const [step, setStep] = useState<Step>(1);

  // ── STEP 1: Phone state ──────────────────────────────────────────
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);

  // ── STEP 2: OTP state ────────────────────────────────────────────
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(''));
  const [otpError, setOtpError] = useState('');
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [timer, setTimer] = useState(OTP_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  // ── STEP 3: Enquiry form state ───────────────────────────────────
  const [formData, setFormData] = useState<EnquiryForm>({
    studentName: '',
    parentName: '',
    classVal: '',
    board: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Toast notification ───────────────────────────────────────────
  const [toast, setToast] = useState<Toast>({ show: false, message: '', type: 'info' });

  // ──────────────────────────────────────────────────────────────────
  // HELPERS
  // ──────────────────────────────────────────────────────────────────

  /** Show a toast message for 4 seconds */
  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 4500);
  }, []);

  /** Start the 60-second OTP countdown timer */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(OTP_TIMER_SECONDS);
    setCanResend(false);

    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setCanResend(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  // Clean up timer on unmount
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  // ──────────────────────────────────────────────────────────────────
  // STEP 1 HANDLERS — Phone Input
  // ──────────────────────────────────────────────────────────────────

  /** Real-time phone validation while typing */
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Strip everything except digits
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);

    if (val.length === 0) {
      setPhoneError('');
    } else if (val.length < 10) {
      setPhoneError('10 digit ka number daalo');
    } else if (!PHONE_REGEX.test(val)) {
      setPhoneError('Valid 10-digit Indian number daalo (6/7/8/9 se shuru)');
    } else {
      setPhoneError('');
    }
  };

  /** POST /api/send-otp */
  const handleSendOtp = async () => {
    if (!PHONE_REGEX.test(phone)) return;
    setSendingOtp(true);
    setOtpError('');

    try {
      const res = await fetch(`${API_URL}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showToast('OTP bheja gaya! Apna email check karein 📧', 'success');
        setStep(2);
        startTimer();
        // Focus first OTP box after a short delay
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
      } else {
        showToast(data.message || 'OTP nahi bheja ja saka. Try again.', 'error');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSendingOtp(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────
  // STEP 2 HANDLERS — OTP Input
  // ──────────────────────────────────────────────────────────────────

  /** Handle digit input in an OTP box */
  const handleOtpChange = (index: number, value: string) => {
    // Accept only single digit
    const digit = value.replace(/\D/g, '').slice(-1);
    const updated = [...otpDigits];
    updated[index] = digit;
    setOtpDigits(updated);
    setOtpError('');

    // Auto-advance to next box
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  /** Handle Backspace — move to previous box */
  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
    // Allow arrow navigation
    if (e.key === 'ArrowLeft' && index > 0) otpInputRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 5) otpInputRefs.current[index + 1]?.focus();
  };

  /** Handle paste — fill all 6 boxes at once */
  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const updated = Array(6).fill('');
    pasted.split('').forEach((d, i) => { updated[i] = d; });
    setOtpDigits(updated);
    setOtpError('');

    // Focus last filled box or box after last
    const focusIdx = Math.min(pasted.length, 5);
    otpInputRefs.current[focusIdx]?.focus();
  };

  /** POST /api/verify-otp */
  const handleVerifyOtp = async () => {
    const otp = otpDigits.join('');
    if (otp.length < 6) {
      setOtpError('Poora 6-digit OTP daalo');
      return;
    }

    setVerifyingOtp(true);
    setOtpError('');

    try {
      const res = await fetch(`${API_URL}/api/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (timerRef.current) clearInterval(timerRef.current);
        showToast('Phone verify ho gaya! ✅ Ab form bharo.', 'success');
        setStep(3);
      } else if (data.expired) {
        setOtpError('OTP expire ho gaya. Naya OTP mangao.');
        setCanResend(true);
        if (timerRef.current) clearInterval(timerRef.current);
        setTimer(0);
      } else {
        setOtpError(data.message || 'OTP galat hai. Dobara try karo.');
      }
    } catch {
      setOtpError('Network error. Please try again.');
    } finally {
      setVerifyingOtp(false);
    }
  };

  /** Resend OTP — reuses handleSendOtp flow but stays on step 2 */
  const handleResendOtp = async () => {
    if (!canResend) return;
    setSendingOtp(true);
    setOtpDigits(Array(6).fill(''));
    setOtpError('');

    try {
      const res = await fetch(`${API_URL}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showToast('Naya OTP bheja gaya! 📧', 'success');
        startTimer();
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
      } else {
        showToast(data.message || 'OTP nahi bheja ja saka.', 'error');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSendingOtp(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────
  // STEP 3 HANDLERS — Enquiry Form
  // ──────────────────────────────────────────────────────────────────

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /** POST /api/submit-enquiry */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { studentName, parentName, classVal, board } = formData;

    if (!studentName || !parentName || !classVal || !board) {
      showToast('Sare required fields bharo.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/submit-enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: studentName.trim(),
          parentName:  parentName.trim(),
          phone,
          classVal,
          board,
          message: formData.message.trim(),
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        showToast('Enquiry successfully submit ho gayi! ✅', 'success');
      } else if (res.status === 403) {
        // OTP not verified — edge case if someone bypasses UI
        showToast('Phone verify nahi hai. Page reload karke dobara karo.', 'error');
      } else {
        showToast(data.message || 'Submit nahi ho pa rahi. Try again.', 'error');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────
  return (
    <section id="admissions" className="admission-section">
      <div className="container admission-container">

        {/* ── Left panel: Benefits ── */}
        <div className="admission-benefits">
          <h2 className="benefits-title">Join Krishna Academy</h2>
          <p className="benefits-subtitle">
            Take the first step towards a brilliant academic future.
          </p>

          <ul className="benefits-list">
            {[
              { title: 'Expert Coaching', desc: 'Learn from highly experienced faculty dedicated to your success.' },
              { title: 'Small Batch Sizes', desc: 'Personalised attention to ensure no student is left behind.' },
              { title: 'Regular Assessments', desc: 'Weekly tests directly mirroring board exam patterns.' },
              { title: 'Modern Infrastructure', desc: 'Air-conditioned classrooms with smart digital learning boards.' },
            ].map(({ title, desc }) => (
              <li key={title}>
                <span className="check-icon">✓</span>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Step indicator */}
          <div className="step-indicator">
            {(['Phone', 'Verify OTP', 'Enquiry'] as const).map((label, i) => (
              <div key={label} className={`step-dot ${step === i + 1 ? 'active' : step > i + 1 ? 'done' : ''}`}>
                <span className="dot-circle">{step > i + 1 ? '✓' : i + 1}</span>
                <span className="dot-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel: wizard ── */}
        <div className="admission-form-wrapper">

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              STEP 1 — Phone Input
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {step === 1 && (
            <div className="wizard-step" key="step1">
              <h3 className="form-title">Admission Enquiry</h3>
              <p className="form-subtitle">
                Apna WhatsApp number daalo — hum aapko OTP bhejenge 📱
              </p>

              <div className="form-group">
                <label htmlFor="phone-input">WhatsApp / Mobile Number *</label>
                <div className={`input-icon-wrapper ${phoneError ? 'has-error' : phone.length === 10 && !phoneError ? 'has-success' : ''}`}>
                  <span className="input-icon">📱</span>
                  <input
                    id="phone-input"
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="10-digit number (e.g. 9876543210)"
                    maxLength={10}
                    autoComplete="tel"
                  />
                  {phone.length === 10 && !phoneError && (
                    <span className="input-suffix-icon valid">✓</span>
                  )}
                </div>
                {phoneError && <p className="field-error">{phoneError}</p>}
                <p className="field-hint">No +91, no spaces — sirf 10 digits</p>
              </div>

              <button
                id="send-otp-btn"
                className="btn submit-btn"
                onClick={handleSendOtp}
                disabled={!PHONE_REGEX.test(phone) || sendingOtp}
              >
                {sendingOtp ? (
                  <span className="btn-loading">
                    <span className="spinner" />
                    OTP bheja ja raha hai…
                  </span>
                ) : (
                  'OTP Bhejo →'
                )}
              </button>
            </div>
          )}

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              STEP 2 — OTP Verification
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {step === 2 && (
            <div className="wizard-step" key="step2">
              <h3 className="form-title">OTP Verify Karein</h3>
              <p className="form-subtitle">
                <strong>+91 {phone}</strong> ke liye OTP bheja gaya hai 📧
                <button
                  className="change-phone-btn"
                  onClick={() => { setStep(1); setOtpDigits(Array(6).fill('')); }}
                >
                  Change
                </button>
              </p>

              {/* 6-box OTP input */}
              <div className="otp-box-group" role="group" aria-label="OTP input">
                {otpDigits.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-box-${i}`}
                    ref={(el) => { otpInputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    autoComplete="one-time-code"
                    className={`otp-box ${otpError ? 'otp-box--error' : ''} ${digit ? 'otp-box--filled' : ''}`}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={handleOtpPaste}
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>

              {otpError && <p className="field-error otp-error">{otpError}</p>}

              {/* Countdown timer */}
              <div className="otp-timer">
                {canResend ? (
                  <button
                    className="resend-btn"
                    onClick={handleResendOtp}
                    disabled={sendingOtp}
                  >
                    {sendingOtp ? 'Bheja ja raha hai…' : '↺ Naya OTP Bhejo'}
                  </button>
                ) : (
                  <p className="timer-text">
                    Naya OTP <strong>{timer}s</strong> baad maang sakte ho
                  </p>
                )}
              </div>

              <button
                id="verify-otp-btn"
                className="btn submit-btn"
                onClick={handleVerifyOtp}
                disabled={otpDigits.join('').length < 6 || verifyingOtp}
              >
                {verifyingOtp ? (
                  <span className="btn-loading">
                    <span className="spinner" />
                    Verify ho raha hai…
                  </span>
                ) : (
                  'OTP Verify Karo ✓'
                )}
              </button>
            </div>
          )}

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              STEP 3 — Enquiry Form
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {step === 3 && !submitted && (
            <div className="wizard-step" key="step3">
              <h3 className="form-title">Enquiry Form</h3>
              <p className="form-subtitle">
                Phone verified ✅ — Ab baaki details bharo
              </p>

              {/* Verified phone badge */}
              <div className="verified-phone-badge">
                <span>📱</span>
                <span>+91 {phone}</span>
                <span className="verified-tag">✅ Verified</span>
              </div>

              <form className="admission-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="studentName">Student Name *</label>
                  <input
                    id="studentName"
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleFormChange}
                    placeholder="Student ka poora naam"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="parentName">Parent / Guardian Name *</label>
                  <input
                    id="parentName"
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleFormChange}
                    placeholder="Parent ka naam"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="classVal">Class Applying For *</label>
                    <select
                      id="classVal"
                      name="classVal"
                      value={formData.classVal}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Class</option>
                      {[5, 6, 7, 8, 9, 10].map((c) => (
                        <option key={c} value={`Std ${c}`}>Std {c}</option>
                      ))}
                      <option value="Std 11 Science">Std 11 Science</option>
                      <option value="Std 11 Commerce">Std 11 Commerce</option>
                      <option value="Std 12 Science">Std 12 Science</option>
                      <option value="Std 12 Commerce">Std 12 Commerce</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="board">Board *</label>
                    <select
                      id="board"
                      name="board"
                      value={formData.board}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Board</option>
                      <option value="GSEB">GSEB (Gujarat Board)</option>
                      <option value="CBSE">CBSE</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Koi sawal ya information…"
                    rows={3}
                  />
                </div>

                <button
                  id="submit-enquiry-btn"
                  type="submit"
                  className="btn submit-btn"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="btn-loading">
                      <span className="spinner" />
                      Submit ho raha hai…
                    </span>
                  ) : (
                    'Enquiry Submit Karo 🚀'
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SUCCESS STATE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {submitted && (
            <div className="wizard-step success-state" key="success">
              <div className="success-icon">🎉</div>
              <h3 className="success-title">Enquiry Submit Ho Gayi!</h3>
              <p className="success-msg">
                Shukriya! Aapki enquiry hum tak pahunch gayi hai.
                Hum <strong>24 ghante ke andar</strong> aapse contact karenge.
              </p>
              <div className="success-phone">
                <span>📱</span>
                <span>+91 {phone}</span>
              </div>
              <button
                className="btn submit-btn"
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setPhone('');
                  setOtpDigits(Array(6).fill(''));
                  setFormData({ studentName: '', parentName: '', classVal: '', board: '', message: '' });
                }}
              >
                Nayi Enquiry Submit Karo
              </button>
            </div>
          )}

        </div>{/* end form-wrapper */}
      </div>{/* end container */}

      {/* ── Toast Notification ── */}
      {toast.show && (
        <div className={`toast-notification ${toast.type}`} role="alert">
          {toast.message}
        </div>
      )}
    </section>
  );
}
