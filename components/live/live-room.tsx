// components/live/live-room.tsx
'use client';

import { type FC, useEffect, useRef, useState } from 'react';
import AgoraRTC, { 
  IAgoraRTCClient, 
  ICameraVideoTrack, 
  IMicrophoneAudioTrack,
  IAgoraRTCRemoteUser
} from 'agora-rtc-sdk-ng';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  LogOut, 
  Loader2,
  Users
} from 'lucide-react';

import { cn } from '@/lib/utils';
import api from '@/lib/api';

interface LiveRoomProps {
  sessionId: string;
  token: string;
  channel: string;
  appId: string;
  isTeacher?: boolean;
  role?: 'publisher' | 'audience';
}

/**
 * High-fidelity Agora RTC Live Classroom.
 * Enforces hardware state management and scholar-teacher role isolation.
 */
export const LiveRoom: FC<LiveRoomProps> = ({ 
  sessionId, token, channel, appId, isTeacher = false, role 
}) => {
  const [localVideoTrack, setLocalVideoTrack] = useState<ICameraVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<IMicrophoneAudioTrack | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  const client = useRef<IAgoraRTCClient | null>(null);
  const localPlayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      if (typeof window === 'undefined') return;
      client.current = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
      
      // Events
      client.current.on('public_users-published', async (public_users, mediaType) => {
        await client.current?.subscribe(public_users, mediaType);
        if (mediaType === 'video') {
          setRemoteUsers(prev => [...prev.filter(u => u.uid !== public_users.uid), public_users]);
        }
        if (mediaType === 'audio') public_users.audioTrack?.play();
      });

      client.current.on('public_users-unpublished', (public_users) => {
        setRemoteUsers(prev => prev.filter(u => u.uid !== public_users.uid));
      });

      try {
        await client.current.join(appId, channel, token, null);
        
        if (isTeacher) {
          const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
          setLocalAudioTrack(audioTrack);
          setLocalVideoTrack(videoTrack);
          await client.current.publish([audioTrack, videoTrack]);
          videoTrack.play(localPlayerRef.current!);
        }

        setJoined(true);
      } catch (err) {
        console.error('Agora Join Error:', err);
      } finally {
        setLoading(false);
      }
    };

    init();

    return () => {
      localVideoTrack?.close();
      localAudioTrack?.close();
      client.current?.leave();
      api.post(`/live/${sessionId}/leave`).catch(() => {});
    };
  }, [channel, token]);

  const toggleCamera = async () => {
    if (localVideoTrack) {
      await localVideoTrack.setEnabled(!localVideoTrack.enabled);
    }
  };

  const toggleMic = async () => {
    if (localAudioTrack) {
      await localAudioTrack.setEnabled(!localAudioTrack.enabled);
    }
  };

  return (
    <div className="relative h-full bg-slate-900 rounded-3xl overflow-hidden flex flex-col">
      {/* Main Viewport */}
      <div className="flex-1 relative grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
            <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest text-center">
              Encrypting connection...<br/>Connecting to Ka-RTC Node
            </p>
          </div>
        )}

        {/* Teacher/Local View */}
        <div className={cn(
          "bg-slate-800 rounded-2xl overflow-hidden relative border border-slate-700/50",
          !isTeacher && remoteUsers.length === 0 && "col-span-full aspect-video flex items-center justify-center"
        )}>
          {isTeacher ? (
            <div ref={localPlayerRef} className="w-full h-full" />
          ) : remoteUsers.length > 0 ? (
            <div 
              ref={(el) => { if(el) remoteUsers[0].videoTrack?.play(el) }} 
              className="w-full h-full" 
            />
          ) : (
            <div className="text-center p-10">
              <div className="w-20 h-20 bg-slate-700/50 rounded-full mx-auto flex items-center justify-center mb-4">
                <Users className="text-slate-500" size={32} />
              </div>
              <p className="text-white font-bold">Pratiksha Karein...</p>
              <p className="text-slate-500 text-xs mt-1">Teacher abhi live nahi hain.</p>
            </div>
          )}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-rose-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">LIVE</span>
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">Channel: {channel}</span>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-6 bg-slate-900/50 backdrop-blur-xl border-t border-slate-800 flex items-center justify-center gap-6">
        {isTeacher && (
          <>
            <button 
              onClick={toggleMic}
              className={cn(
                "p-4 rounded-2xl transition-all",
                localAudioTrack?.enabled ? "bg-slate-800 text-white" : "bg-rose-500 text-white"
              )}
            >
              {localAudioTrack?.enabled ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
            <button 
              onClick={toggleCamera}
              className={cn(
                "p-4 rounded-2xl transition-all",
                localVideoTrack?.enabled ? "bg-slate-800 text-white" : "bg-rose-500 text-white"
              )}
            >
              {localVideoTrack?.enabled ? <Video size={20} /> : <VideoOff size={20} />}
            </button>
          </>
        )}
        <button 
          onClick={() => window.history.back()}
          className="px-6 py-4 bg-rose-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-rose-600 transition-all"
        >
          <LogOut size={20} /> Leave Session
        </button>
      </div>
    </div>
  );
};
