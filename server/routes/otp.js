/**
 * otp.js — Express Router
 * ========================
 * Routes:
 *   POST /api/send-otp      → Generate & email OTP for phone verification
 *   POST /api/verify-otp    → Validate OTP entered by user
 *   POST /api/submit-enquiry → Submit enquiry after OTP is verified
 *
 * Stack: Express.js + Supabase + Resend
 */

// Note: dotenv is loaded once in server/index.js — do NOT call it again here
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { generateOtpEmail } = require('../templates/otpEmail');
const { generateEnquiryEmail } = require('../templates/enquiryEmail');
const { otpSendLimiter, otpVerifyLimiter } = require('../middleware/rateLimiter');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// ────────────────────────────────────────────
// Supabase client (uses ANON key — RLS handles security)
// ────────────────────────────────────────────
const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
    : null;

// ────────────────────────────────────────────
// Helper: Validate Indian phone number
// Rules: starts 6/7/8/9, exactly 10 digits, no spaces/+91
// ────────────────────────────────────────────
const isValidIndianPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

// ────────────────────────────────────────────
// Helper: Generate 6-digit random OTP
// ────────────────────────────────────────────
const generateOTP = () =>
  String(Math.floor(100000 + Math.random() * 900000));

// ────────────────────────────────────────────
// Helper: Send email via Resend REST API
// ────────────────────────────────────────────
const sendEmail = async ({ to, subject, html }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from   = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

  if (!apiKey) {
    console.warn('[RESEND] API key not set — skipping email send');
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!response.ok) {
    const err = await response.json();
    console.error('[RESEND ERROR]', err);
    throw new Error('Email sending failed');
  }

  console.log('[RESEND SUCCESS] Email sent to:', to);
};

// ============================================================
// ROUTE 1: POST /api/send-otp
// ============================================================
// - Validates phone (Indian format)
// - Generates 6-digit OTP
// - Saves to Supabase otp_verifications (5 min expiry)
// - Emails OTP via Resend to ACADEMY_EMAIL (or user email if provided)
// ============================================================
router.post(
  '/send-otp',
  otpSendLimiter,
  asyncHandler(async (req, res) => {
    const { phone, email } = req.body;

    // ── 1. Phone validation ──────────────────
    if (!phone || !isValidIndianPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Valid 10-digit Indian number daalo (starts with 6/7/8/9)',
      });
    }

    // ── 2. Invalidate any existing unverified OTP for this phone ──
    if (supabase) {
      await supabase
        .from('otp_verifications')
        .delete()
        .eq('phone', phone)
        .eq('is_verified', false);
    }

    // ── 3. Generate OTP & expiry ─────────────
    const otp       = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // +5 min

    console.log(`[OTP] Generated for ${phone}: ${otp} (expires: ${expiresAt})`);

    // ── 4. Save to Supabase ──────────────────
    if (supabase) {
      const { error } = await supabase.from('otp_verifications').insert([
        {
          phone,
          otp_code:    otp,
          expires_at:  expiresAt,
          is_verified: false,
        },
      ]);

      if (error) {
        console.error('[SUPABASE INSERT OTP ERROR]', error);
        return res.status(500).json({
          success: false,
          message: 'Something went wrong. Please try again.',
        });
      }
    }

    // ── 5. Send OTP email ────────────────────
    // Sends to academy email (for demo) OR user's email if provided
    const recipientEmail = email || process.env.ACADEMY_EMAIL;
    if (recipientEmail) {
      try {
        await sendEmail({
          to:      recipientEmail,
          subject: `${otp} — OTP for Krishna Academy Phone Verification`,
          html:    generateOtpEmail(phone, otp),
        });
      } catch (emailErr) {
        console.error('[EMAIL SEND FAILED]', emailErr.message);
        // Don't block the user — OTP is saved, they can still verify
      }
    }

    return res.status(200).json({
      success: true,
      message: 'OTP bheja gaya! Check karein apna email.',
      // NOTE: NEVER send OTP in response in production
      // ...(process.env.NODE_ENV !== 'production' ? { debug_otp: otp } : {}),
    });
  })
);

// ============================================================
// ROUTE 2: POST /api/verify-otp
// ============================================================
// - Looks up latest OTP for phone in otp_verifications
// - Checks OTP match + expiry
// - Marks is_verified = true on success
// ============================================================
router.post(
  '/verify-otp',
  otpVerifyLimiter,
  asyncHandler(async (req, res) => {
    const { phone, otp } = req.body;

    // ── 1. Basic input check ─────────────────
    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone aur OTP dono required hain.',
      });
    }

    if (!isValidIndianPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Valid 10-digit Indian number daalo.',
      });
    }

    if (!supabase) {
      return res.status(500).json({
        success: false,
        message: 'Database connection nahi hai. Try again.',
      });
    }

    // ── 2. Fetch latest OTP for this phone ───
    const { data, error } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('phone', phone)
      .eq('is_verified', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('[SUPABASE FETCH OTP ERROR]', error);
      return res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again.',
      });
    }

    // ── 3. No OTP record found ───────────────
    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'OTP nahi mila. Pehle OTP mangao.',
      });
    }

    // ── 4. Check expiry ──────────────────────
    const now = new Date();
    if (now > new Date(data.expires_at)) {
      return res.status(400).json({
        success: false,
        message: 'OTP expire ho gaya. Naya OTP mangao.',
        expired: true,
      });
    }

    // ── 5. Check OTP match ───────────────────
    if (data.otp_code !== String(otp).trim()) {
      return res.status(400).json({
        success: false,
        message: 'OTP galat hai. Dobara try karo.',
      });
    }

    // ── 6. Mark as verified ──────────────────
    const { error: updateError } = await supabase
      .from('otp_verifications')
      .update({ is_verified: true })
      .eq('id', data.id);

    if (updateError) {
      console.error('[SUPABASE UPDATE OTP ERROR]', updateError);
      return res.status(500).json({
        success: false,
        message: 'Verification save nahi ho pa raha. Try again.',
      });
    }

    console.log(`[OTP VERIFIED] Phone: ${phone}`);

    return res.status(200).json({
      success: true,
      message: 'Phone number verify ho gaya! ✅',
    });
  })
);

// ============================================================
// ROUTE 3: POST /api/submit-enquiry
// ============================================================
// - Ensures phone was OTP-verified before accepting submission
// - Inserts into enquiries table
// - Sends confirmation email to academy
// ============================================================
router.post(
  '/submit-enquiry',
  asyncHandler(async (req, res) => {
    const { studentName, parentName, phone, classVal, board, message } = req.body;

    // ── 1. Validate required fields ──────────
    if (!studentName || !parentName || !phone || !classVal || !board) {
      return res.status(400).json({
        success: false,
        message: 'Sare required fields bharo.',
      });
    }

    if (!isValidIndianPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Valid 10-digit Indian number daalo.',
      });
    }

    if (!supabase) {
      return res.status(500).json({
        success: false,
        message: 'Database available nahi hai.',
      });
    }

    // ── 2. Confirm OTP was verified for this phone ──
    // We look for the most recent is_verified=true record for this phone
    const { data: otpRecord, error: otpCheckError } = await supabase
      .from('otp_verifications')
      .select('id')
      .eq('phone', phone)
      .eq('is_verified', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (otpCheckError) {
      console.error('[SUPABASE OTP CHECK ERROR]', otpCheckError);
      return res.status(500).json({
        success: false,
        message: 'Verification check fail ho gaya. Try again.',
      });
    }

    if (!otpRecord) {
      return res.status(403).json({
        success: false,
        message: 'Phone number verify nahi hai. Pehle OTP verify karo.',
      });
    }

    // ── 2b. Consume the OTP record (delete after use) ──────────────
    // This ensures every new submission requires a fresh OTP verification.
    // If delete fails it is non-fatal — enquiry still saves.
    await supabase
      .from('otp_verifications')
      .delete()
      .eq('id', otpRecord.id);

    // ── 3. Insert enquiry into Supabase ──────
    const { error: insertError } = await supabase.from('enquiries').insert([
      {
        student_name: studentName.trim(),
        parent_name:  parentName.trim(),
        phone:        phone.trim(),
        class:        classVal,
        board:        board,
        message:      (message || '').trim(),
        source:       'website',
      },
    ]);

    if (insertError) {
      console.error('[SUPABASE ENQUIRY INSERT ERROR]', insertError);
      return res.status(500).json({
        success: false,
        message: 'Enquiry save nahi ho pa rahi. Please try again.',
      });
    }

    console.log(`[ENQUIRY SUBMITTED] ${studentName} — ${phone}`);

    // ── 4. Send confirmation email to academy ─
    try {
      const htmlBody = generateEnquiryEmail({
        studentName,
        parentName,
        phone,
        classVal,
        board,
        message: message || '',
      });

      await sendEmail({
        to:      process.env.ACADEMY_EMAIL,
        subject: `New Enquiry ✅ — ${studentName} (${classVal}) | OTP Verified`,
        html:    htmlBody,
      });
    } catch (emailErr) {
      console.error('[ENQUIRY EMAIL FAILED]', emailErr.message);
      // Non-fatal: enquiry is already saved
    }

    return res.status(201).json({
      success: true,
      message: 'Enquiry successfully submit ho gayi! ✅ Hum aapse jald contact karenge.',
    });
  })
);

module.exports = router;
