// lib/r2.ts
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'krishna-academy';

/**
 * Cloudflare R2 Client initialized for Mumbai region-compatible S3 API.
 */
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID || '',
    secretAccessKey: R2_SECRET_ACCESS_KEY || '',
  },
});

/**
 * Generates a temporary signed URL for a specific asset in R2.
 */
export async function getPresignedStreamUrl(
  key: string, 
  userId: string, 
  expiresIn: number = 900
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ResponseCacheControl: 'max-age=900',
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Generates a temporary signed URL for UPLOADING an asset to R2.
 * @param key - The destination path/key in the bucket
 * @param contentType - MIME type of the file
 * @param expiresIn - Expiry in seconds (default 300 / 5min)
 */
export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 300
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}
