const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { enquiryLimiter } = require('../middleware/rateLimiter');
const { validate } = require('../middleware/validate');
const { asyncHandler } = require('../middleware/errorHandler');
const { generateEnquiryEmail } = require('../templates/enquiryEmail');

const router = express.Router();

const supabase = (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY)
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

router.post('/enquiry', enquiryLimiter, validate, asyncHandler(async (req, res, next) => {
  console.log('[API] New enquiry request received:', req.body);
  const { studentName, parentName, phone, classVal, board, message } = req.validatedData;

  // 1. SUPABASE SAVE
  try {
    if (supabase) {
      const { error } = await supabase
        .from('enquiries')
        .insert([
          {
            student_name: studentName,
            parent_name: parentName,
            phone: phone,
            class: classVal,
            board: board,
            message: message
          }
        ]);
        
      if (error) {
        console.error('[SUPABASE INSERT ERROR]', error);
      } else {
        console.log('[SUPABASE INSERT SUCCESS]');
      }
    } else {
        console.warn('Supabase not initialized. Skipping DB save.');
    }
  } catch (dbError) {
    console.error('[SUPABASE FATAL ERROR]', dbError);
  }

  // 2. RESEND EMAIL
  try {
    if (process.env.RESEND_API_KEY && process.env.ACADEMY_EMAIL) {
      const htmlBody = generateEnquiryEmail(req.validatedData);
      
      const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
      const toEmail = process.env.ACADEMY_EMAIL || 'upletakrishnaacademy@gmail.com';

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: senderEmail,
          to: toEmail,
          subject: `New Admission Enquiry — ${studentName} (${classVal})`,
          html: htmlBody
        })
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error('[RESEND API ERROR]', errorData);
      } else {
        console.log('[RESEND EMAIL SUCCESS]');
      }
    } else {
      console.warn('Resend API key or Academy Email not found. Skipping email sending.');
    }
  } catch (emailError) {
    console.error('[RESEND FATAL ERROR]', emailError);
  }

  // 3. RESPONSE
  res.status(201).json({
    success: true,
    message: 'Enquiry received! We will contact you within 24 hours.'
  });
}));

module.exports = router;
