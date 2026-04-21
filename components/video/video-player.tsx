// components/video/video-player.tsx
'use client';

import { type FC, useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Maximize, 
  Volume2, 
  Loader2 
} from 'lucide-react';

import api from '@/lib/api';
import { cn } from '@/lib/utils';
import { usePlayerStore } from '@/store/player-store';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  lectureId: string;
  onReady?: (player: HTMLVideoElement | null) => void;
}

/**
 * Premium HLS.js Video Player engineered for adaptive bitrate streaming.
 * Follows the mandatory React Component Pattern.
 */
export const VideoPlayer: FC<VideoPlayerProps> = ({ 
  src, 
  poster, 
  className,
  lectureId,
  onReady
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    isPlaying, 
    setPlaying, 
    playbackSpeed, 
    lastPosition, 
    setPosition 
  } = usePlayerStore();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const initPlayer = async () => {
      let startPos = lastPosition;

      // --- CHANGED: Fetch server-side progress first ---
      try {
        const res = await api.get(`/videos/${lectureId}/progress`);
        if (res.data.success && res.data.data.lastPosition > startPos) {
          startPos = res.data.data.lastPosition;
        }
      } catch (err) {
        console.warn('Failed to fetch server progress, using local state');
      }

      if (Hls.isSupported()) {
        hls = new Hls({
          capLevelToPlayerSize: true,
          startLevel: -1,
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsReady(true);
          if (onReady) onReady(video);
          if (startPos > 0) video.currentTime = startPos;
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) setError('Failed to load video stream');
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          setIsReady(true);
          if (onReady) onReady(video);
          if (startPos > 0) video.currentTime = startPos;
        });
      }
    };

    initPlayer();

    // --- CHANGED: 10s Server Sync Interval ---
    const syncInterval = setInterval(async () => {
      if (video && !video.paused && video.currentTime > 0) {
        try {
          await api.put(`/videos/${lectureId}/progress`, {
            lastPosition: video.currentTime,
            isCompleted: video.currentTime > (video.duration * 0.9) // 90% completion
          });
        } catch (err) {
          console.error('Progress sync failed');
        }
      }
    }, 10000);

    return () => {
      if (hls) hls.destroy();
      clearInterval(syncInterval);
    };
  }, [src]);

  // Sync state and track progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = playbackSpeed;
    
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleTimeUpdate = () => setPosition(video.currentTime);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [playbackSpeed, setPlaying, setPosition]);

  return (
    <div className={cn(
      "relative aspect-video bg-black rounded-3xl overflow-hidden group border border-slate-800 shadow-2xl",
      className
    )}>
      {/* Loading Overlay */}
      {!isReady && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Warming Up Stream...</p>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10 p-10 text-center">
          <p className="text-rose-500 font-bold mb-2">Video load nahi ho payi</p>
          <p className="text-white/40 text-xs italic">Please refresh karke try karein</p>
        </div>
      )}

      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full"
        playsInline
        crossOrigin="anonymous"
      />

      {/* UI Overlays would go here (Controls, Speed, Progress) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
             <button 
               onClick={() => isPlaying ? videoRef.current?.pause() : videoRef.current?.play()}
               className="p-2 hover:bg-white/20 rounded-xl transition-all"
               aria-label={isPlaying ? 'Pause' : 'Play'}
             >
               {isPlaying ? <Pause /> : <Play fill="currentColor" />}
             </button>
             <button className="p-2 hover:bg-white/20 rounded-xl transition-all opacity-50">
               <Volume2 />
             </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Settings size={14} /> {playbackSpeed}x
            </span>
            <button className="p-2 hover:bg-white/20 rounded-xl transition-all">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
