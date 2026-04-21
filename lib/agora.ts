// lib/agora.ts
import { RtcTokenBuilder, RtcRole } from 'agora-token';

const APP_ID = process.env.AGORA_APP_ID!;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE!;

/**
 * Generates an RTC token for an Agora live session.
 * @param channelName - The unique channel identifier
 * @param role - Role of the user (PUBLISHER for teacher, SUBSCRIBER for student)
 * @param expireTimeInSeconds - Validity duration of the token
 */
export function generateLiveToken(
  channelName: string,
  role: 'PUBLISHER' | 'SUBSCRIBER',
  expireTimeInSeconds: number = 7200 // 2 hours default
): string {
  const agoraRole = role === 'PUBLISHER' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expireTimeInSeconds;

  return RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    0, // Let UID be 0 for dynamic allocation
    agoraRole,
    privilegeExpiredTs,
    privilegeExpiredTs
  );
}
