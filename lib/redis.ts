// lib/redis.ts
import { Redis } from '@upstash/redis';

/**
 * Singleton instance of the Upstash Redis client.
 * Used for OTP rate-limiting and temporary state storage.
 */
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

/**
 * Singleton instance of the Upstash Redis client.
 * Used for OTP rate-limiting and temporary state storage.
 */
export const redis = REDIS_URL ? new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN!,
}) : null as any;
