const rateLimit = require('express-rate-limit');

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per IP
  message: { success: false, message: 'Too many enquiries submitted. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per IP
  message: { success: false, message: 'Too many requests. Please slow down.' }
});

module.exports = { enquiryLimiter, generalLimiter };
