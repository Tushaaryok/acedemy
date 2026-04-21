import { z } from 'zod';

export const loginSchema = z.object({
  phone: z.string().min(10).max(15).regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone format"),
});

export const otpVerifySchema = z.object({
  phone: z.string().min(10).max(15),
  otp: z.string().length(6),
});

export const onboardingSchema = z.object({
  full_name: z.string().min(2),
  standard: z.string(),
  school_name: z.string().optional(),
});
