/**
 * rateLimiter.js
 * ==============
 * Express rate limiters to prevent abuse.
 *
 * Limiters:
 *  - generalLimiter   : 60 req/min  (all routes)
 *  - enquiryLimiter   : 5 req/15min (POST /api/enquiry)
 *  - otpSendLimiter   : 3 req/10min (POST /api/send-otp) — prevent OTP spam
 *  - otpVerifyLimiter : 5 req/5min  (POST /api/verify-otp) — prevent brute-force
 */

const rateLimit = require('express-rate-limit');

// ─── All Routes ─────────────────────────────────────────────
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,     // 1 minute
  max: 60,
  message: { success: false, message: 'Too many requests. Please slow down.' },
});

// ─── Enquiry Submission ──────────────────────────────────────
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Too many enquiries. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Send OTP ────────────────────────────────────────────────
// Max 3 OTP sends per 10 minutes per IP (prevents SMS/email flooding)
const otpSendLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3,
  message: { success: false, message: 'Bahut zyada OTP maange. 10 minute baad try karo.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Verify OTP ──────────────────────────────────────────────
// Max 5 verify attempts per 5 minutes per IP (prevents brute-force guessing)
const otpVerifyLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,  // 5 minutes
  max: 5,
  message: { success: false, message: 'Bahut zyada attempts. Thodi der baad try karo.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { generalLimiter, enquiryLimiter, otpSendLimiter, otpVerifyLimiter };
