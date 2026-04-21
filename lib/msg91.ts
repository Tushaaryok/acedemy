// lib/msg91.ts
import axios from 'axios';

const AUTH_KEY = process.env.MSG91_AUTH_KEY;
const TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;

/**
 * Sends a 6-digit OTP to the specified mobile number via MSG91 SMS gateway.
 * @param phone - Recipient phone number (international format)
 * @param otp - The generated 6-digit code
 */
export async function sendOtpSms(phone: string, otp: string): Promise<boolean> {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEV MODE] OTP for ${phone} is: ${otp}`);
    return true;
  }

  try {
    const response = await axios.post('https://api.msg91.com/api/v5/otp', {
      template_id: TEMPLATE_ID,
      mobile: phone.replace('+', ''), // Remove + if present
      authkey: AUTH_KEY,
      otp: otp,
    });

    return response.data.type === 'success';
  } catch (error) {
    console.error('[MSG91 Error]', error);
    return false;
  }
}
