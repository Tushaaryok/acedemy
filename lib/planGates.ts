import prisma from './prisma';
import { startOfMonth, startOfWeek } from 'date-fns';

export type GateFeature = 'live_class' | 'video_stream' | 'notes_download' | 'tests' | 'homework' | 'attendance' | 'offline_download';

interface GateOptions {
  userId: string;
  feature: GateFeature;
  metadata?: any;
}

export async function checkGate({ userId, feature, metadata }: GateOptions) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  });

  if (!user) throw new Error('User not found');

  // PAID plans (monthly/annual) bypass most gates
  if (user.plan === 'monthly' || user.plan === 'annual') {
    if (feature === 'offline_download' && user.plan !== 'annual') {
      return { 
        allowed: false, 
        error: { code: 'UPGRADE_REQUIRED', message: 'Annual plan chahiye offline downloads ke liye' } 
      };
    }
    return { allowed: true };
  }

  // FREE plan restrictions
  switch (feature) {
    case 'live_class': {
      const count = await prisma.liveAttendance.count({
        where: {
          student_id: userId,
          joined_at: { gte: startOfMonth(new Date()) },
        },
      });
      if (count >= 3) {
        return { 
          allowed: false, 
          error: { code: 'UPGRADE_REQUIRED', message: 'Is mahine ke 3 free classes khatam ho gaye hain. Upgrade karo unlimited access ke liye' } 
        };
      }
      return { allowed: true };
    }

    case 'video_stream': {
      if (!metadata?.isFree) {
        return { 
          allowed: false, 
          error: { code: 'UPGRADE_REQUIRED', message: 'Ye video premium hai. Upgrade karo dekhne ke liye' } 
        };
      }
      return { allowed: true };
    }

    case 'notes_download': {
      return { 
        allowed: false, 
        error: { code: 'UPGRADE_REQUIRED', message: 'Notes download premium feature hai. Upgrade karo download karne ke liye' } 
      };
    }

    case 'tests': {
      const count = await prisma.testAttempt.count({
        where: {
          student_id: userId,
          completed_at: { gte: startOfWeek(new Date(), { weekStartsOn: 1 }) },
        },
      });
      if (count >= 2) {
        return { 
          allowed: false, 
          error: { code: 'UPGRADE_REQUIRED', message: 'Is hafte ke 2 free tests khatam ho gaye hain. Upgrade karo unlimited practice ke liye' } 
        };
      }
      return { allowed: true };
    }

    case 'homework':
    case 'attendance':
      return { allowed: true };

    default:
      return { allowed: true };
  }
}
