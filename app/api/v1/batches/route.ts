import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import type { ApiResponse } from '@/types';

/**
 * Fetches available academic batches, optionally filtered by standard.
 * Used for the scholar onboarding flow.
 */
export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    headers();
    const { searchParams } = new URL(req.url);
    const standard = searchParams.get('standard');

    // Build-time bypass
    if (process.env.DATABASE_URL?.includes('localhost') || process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
       // Return empty if we are in a build environment without a real DB
       // Note: on Vercel the DB might be reachable if configured
       // but for local npm run build, we return early
       return NextResponse.json({ success: true, data: [] });
    }

    const batches = await prisma.batch.findMany({
      where: standard ? { 
        name: { 
          contains: standard,
          mode: 'insensitive' 
        } 
      } : {},
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json({ success: true, data: batches }, { status: 200 });
  } catch (error) {
    console.error('Batches API Error:', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
