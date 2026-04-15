/**
 * otpEmail.js
 * Generates the HTML email template for OTP verification.
 * Called by /api/send-otp route.
 */

/**
 * @param {string} phone  - The phone number requesting OTP
 * @param {string} otp    - The 6-digit OTP code
 * @returns {string}      - Full HTML string for Resend email
 */
const generateOtpEmail = (phone, otp) => {
  const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification — Krishna Academy</title>
    </head>
    <body style="margin:0; padding:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; background-color:#f4f4f4;">
      <div style="max-width:520px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background-color:#1C1410; padding:28px 24px; text-align:center;">
          <h1 style="color:#C9A044; margin:0; font-size:26px; font-weight:bold; letter-spacing:1px;">
            Krishna Academy
          </h1>
          <p style="color:#ffffff; margin:8px 0 0; font-size:14px; opacity:0.85;">
            Upleta — Phone Verification
          </p>
        </div>

        <!-- Body -->
        <div style="padding:36px 28px; text-align:center;">
          <p style="font-size:16px; color:#444444; margin:0 0 8px;">
            Your One-Time Password (OTP) is:
          </p>

          <!-- OTP Box -->
          <div style="
            display:inline-block;
            background:#fcf8f2;
            border:2px solid #C9A044;
            border-radius:12px;
            padding:20px 40px;
            margin:20px 0;
          ">
            <span style="
              font-size:44px;
              font-weight:900;
              letter-spacing:12px;
              color:#1C1410;
              font-family:monospace;
            ">${otp}</span>
          </div>

          <p style="font-size:14px; color:#888888; margin:0 0 6px;">
            This OTP is valid for <strong>5 minutes</strong> only.
          </p>
          <p style="font-size:13px; color:#aaaaaa; margin:0;">
            Do NOT share this OTP with anyone.
          </p>

          <!-- Divider -->
          <hr style="margin:28px 0; border:none; border-top:1px solid #eeeeee;">

          <p style="font-size:13px; color:#999999; margin:0;">
            Requested for phone: <strong style="color:#444;">${phone}</strong>
            <br>on ${date}
          </p>

          <p style="font-size:12px; color:#bbbbbb; margin:16px 0 0;">
            If you didn't request this, please ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#f9f9f9; padding:16px 24px; text-align:center; border-top:1px solid #eeeeee;">
          <p style="margin:0; font-size:12px; color:#aaaaaa;">
            © ${new Date().getFullYear()} Krishna Academy Upleta. All rights reserved.
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
};

module.exports = { generateOtpEmail };
