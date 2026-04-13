const generateEnquiryEmail = (data) => {
  const { studentName, parentName, phone, classVal, board, message } = data;
  const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Admission Enquiry</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background-color: #1C1410; padding: 30px 20px; text-align: center;">
          <h1 style="color: #C9A044; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">Krishna Academy</h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">New Admission Enquiry</p>
        </div>

        <!-- Body -->
        <div style="padding: 30px 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; width: 35%; color: #666666; font-weight: bold;">Student Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #333333;">${studentName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold;">Parent Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #333333;">${parentName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold;">Standard (Class)</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #333333;">${classVal}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold;">Board</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #333333;">${board}</td>
            </tr>
          </table>

          <!-- Highlighted Phone Box -->
          <div style="background-color: #fcf8f2; border-left: 4px solid #C9A044; padding: 15px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0; color: #666666; font-weight: bold; margin-bottom: 5px;">Contact Number:</p>
            <p style="margin: 0; font-size: 18px; color: #333333; font-weight: bold;">${phone}</p>
            <div style="margin-top: 10px;">
              <a href="https://wa.me/91${phone}" style="display: inline-block; background-color: #25D366; color: white; text-decoration: none; padding: 8px 15px; border-radius: 4px; font-weight: bold; font-size: 14px;">WhatsApp Parent</a>
            </div>
          </div>

          ${message ? `
          <div style="margin-top: 20px;">
            <p style="color: #666666; font-weight: bold; margin-bottom: 5px;">Additional Message:</p>
            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; color: #333333; margin: 0; line-height: 1.5; border: 1px solid #eeeeee;">${message}</p>
          </div>
          ` : ''}

          <div style="text-align: center; margin-top: 35px;">
            <a href="https://supabase.com/dashboard" style="display: inline-block; background-color: #1C1410; color: #C9A044; text-decoration: none; padding: 12px 25px; border-radius: 4px; font-weight: bold; font-size: 16px;">Open Supabase Dashboard</a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
          <p style="color: #999999; font-size: 12px; margin: 0 0 10px 0;">This enquiry was submitted on ${date} from the website.</p>
          <p style="color: #666666; font-size: 13px; margin: 0; font-weight: bold;">Reply to this email or WhatsApp the parent directly to schedule a demo class.</p>
        </div>

      </div>
    </body>
    </html>
  `;
};

module.exports = { generateEnquiryEmail };
