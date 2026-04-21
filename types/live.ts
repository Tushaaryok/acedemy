// types/live.ts

/**
 * Metadata for an active live session.
 */
export interface ActiveSession {
  id: string;
  title: string;
  channelName: string;
  token: string;
  agoraAppId: string;
}

/**
 * Message structure for Supabase Realtime live chat.
 */
export interface LiveChatMessage {
  id: string;
  sessionId: string;
  userId: string;
  userName: string;
  userRole: string;
  text: string;
  timestamp: string;
}
