// lib/auth.ts
import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { createHash } from 'crypto';
import prisma from './prisma';
import type { User } from '@prisma/client';
import type { JwtPayload } from '@/types/auth';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_32char_min');

/**
 * Hashes a string using standard SHA-256 for secure storage.
 * @param input - The raw string (OTP or Token)
 */
export function hashString(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

/**
 * Creates a short-lived access token (JWT).
 */
export async function createAccessToken(user: User): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + (15 * 60); // 15 minutes

  return new SignJWT({ 
    userId: user.id, 
    role: user.role, 
    plan: user.plan 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(JWT_SECRET);
}

/**
 * Extracts and verifies the user from the x-user-id header set by middleware.
 * @param req - The incoming Next.js request
 */
export async function getUserFromRequest(req: NextRequest): Promise<User> {
  const userId = req.headers.get('x-user-id');

  if (!userId) {
    throw new Error('UNAUTHORIZED');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.deletedAt) {
    throw new Error('USER_NOT_FOUND');
  }

  return user;
}

/**
 * Verifies a JWT and returns the payload.
 */
export async function verifyAccessToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload as unknown as JwtPayload;
}
