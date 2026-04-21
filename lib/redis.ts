// lib/redis.ts
import { Redis } from '@upstash/redis';

/**
 * Singleton instance of the Upstash Redis client.
 * Used for OTP rate-limiting and temporary state storage.
 */
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
