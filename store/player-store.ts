// store/player-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PlayerState } from '@/types/course';

interface PlayerActions {
  setVideo: (id: string) => void;
  setPlaying: (isPlaying: boolean) => void;
  setSpeed: (speed: number) => void;
  setPosition: (pos: number) => void;
}

/**
 * Global Video Player state for cross-session playback persistence.
 */
export const usePlayerStore = create<PlayerState & PlayerActions>()(
  persist(
    (set) => ({
      currentVideoId: null,
      isPlaying: false,
      playbackSpeed: 1,
      lastPosition: 0,

      setVideo: (id) => set({ currentVideoId: id, lastPosition: 0 }),
      setPlaying: (isPlaying) => set({ isPlaying }),
      setSpeed: (speed) => set({ playbackSpeed: speed }),
      setPosition: (pos) => set({ lastPosition: pos }),
    }),
    {
      name: 'academic-player-session',
    }
  )
);
