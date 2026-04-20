// ============================================================
// Krishna Academy - Auth & User TypeScript Types
// ============================================================

export type UserRole = 'student' | 'teacher' | 'admin';

export type UserStandard =
  | '5' | '6' | '7' | '8' | '9' | '10'
  | '11_sci' | '11_com'
  | '12_sci' | '12_com'
  | 'jee' | 'neet' | 'cuet';

// Database se milne wala user object
export interface User {
  id: string;
  phone: string | null;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  standard: UserStandard | null;
  school_name: string | null;
  onboarding_completed: boolean;
  onboarding_step: number;
  created_at: string;
  updated_at: string;
  last_seen_at: string;
}

// Login form state
export interface AuthState {
  step: 'phone' | 'otp';
  phone: string;
  otp: string;
  loading: boolean;
  error: string | null;
  countdown: number; // Resend cooldown seconds (30s)
  canResend: boolean;
}

// Onboarding form (5 steps)
export interface OnboardingData {
  full_name: string;   // Step 1
  standard: UserStandard | '';  // Step 2
  school_name: string; // Step 3
  goal: string;        // Step 4 (aspirations)
  avatar_url?: string; // Step 5 (optional photo)
}

// API response type
export interface ApiResponse<T = null> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Standard options for dropdown
export const STANDARD_OPTIONS: { value: UserStandard; label: string }[] = [
  { value: '5', label: 'Class 5' },
  { value: '6', label: 'Class 6' },
  { value: '7', label: 'Class 7' },
  { value: '8', label: 'Class 8' },
  { value: '9', label: 'Class 9' },
  { value: '10', label: 'Class 10' },
  { value: '11_sci', label: 'Class 11 - Science' },
  { value: '11_com', label: 'Class 11 - Commerce' },
  { value: '12_sci', label: 'Class 12 - Science' },
  { value: '12_com', label: 'Class 12 - Commerce' },
  { value: 'jee', label: 'JEE Aspirant' },
  { value: 'neet', label: 'NEET Aspirant' },
  { value: 'cuet', label: 'CUET Aspirant' },
];

// Hinglish error messages
export const AUTH_ERRORS: Record<string, string> = {
  'Invalid phone number': 'Galat number hai, dobara check karo ✗',
  'OTP expired': 'OTP expire ho gaya, naya OTP mangao 🔄',
  'Invalid OTP': 'Galat OTP dala hai, phir try karo ✗',
  'User not found': 'Ye number registered nahi hai. Admin se contact karo 📞',
  'Too many requests': 'Bahut zyada baar try kiya. Thodi der baad aao ⏳',
  'Network error': 'Internet connection check karo aur retry karo 🌐',
  'phone_provider_disabled': 'SMS Provider setup nahi hai. Supabase Dashboard mein Phone Auth enable karo 🔧',
  default: 'Kuch gadbad ho gayi. Dobara try karo 🔄',
};

export function getAuthErrorMessage(error: string): string {
  for (const [key, msg] of Object.entries(AUTH_ERRORS)) {
    if (error.toLowerCase().includes(key.toLowerCase())) return msg;
  }
  return AUTH_ERRORS.default;
}
