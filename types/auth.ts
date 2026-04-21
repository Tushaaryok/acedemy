// types/auth.ts
import { Role, Plan } from '@prisma/client';

/**
 * Payload stored within the short-lived JWT access token.
 */
export interface JwtPayload {
  userId: string;
  role: Role;
  plan: Plan;
  iat: number;
  exp: number;
}

/**
 * Structure of the authentication store state.
 */
export interface AuthState {
  user: {
    id: string;
    phone: string;
    role: Role;
    plan: Plan;
  } | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}
