// types/course.ts

/**
 * Detailed lecture metadata for the video player.
 */
export interface LectureData {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  is_free: boolean;
  r2_path: string | null;
  chapter_title: string;
}

/**
 * Structure of the video player state.
 */
export interface PlayerState {
  currentVideoId: string | null;
  isPlaying: boolean;
  playbackSpeed: number;
  lastPosition: number;
}
