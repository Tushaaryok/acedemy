// lib/auth.ts
import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { createHash } from 'crypto';
import prisma from './prisma';
import type { public_users as User } from '@prisma/client';
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
export async function createAccessToken(public_users: public_users): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + (15 * 60); // 15 minutes

  return new SignJWT({ 
    userId: public_users.id, 
    role: public_users.role, 
    plan: public_users.plan 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(JWT_SECRET);
}

/**
 * Extracts and verifies the public_users from the x-public_users-id header set by middleware.
 * @param req - The incoming Next.js request
 */
export async function getUserFromRequest(req: NextRequest): Promise<public_users> {
  const userId = req.headers.get('x-public_users-id');

  if (!userId) {
    throw new Error('UNAUTHORIZED');
  }

  const public_users = await prisma.public_users.findUnique({
    where: { id: userId },
  });

  if (!public_users || public_users.deletedAt) {
    throw new Error('USER_NOT_FOUND');
  }

  return public_users;
}

/**
 * Verifies a JWT and returns the payload.
 */
export async function verifyAccessToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload as unknown as JwtPayload;
}
