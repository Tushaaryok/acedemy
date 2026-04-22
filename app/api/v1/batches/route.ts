import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import type { ApiResponse } from '@/types';

/**
 * Fetches available academic batches, optionally filtered by standard and goal.
 * Used for the scholar onboarding flow.
 */
export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    headers();
    const { searchParams } = new URL(req.url);
    const standard = searchParams.get('standard');
    const goal = searchParams.get('goal');

    // Build-time bypass
    if (process.env.NEXT_PHASE === 'phase-production-build' || (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production')) {
       return NextResponse.json({ success: true, data: [] });
    }

    const batches = await prisma.batch.findMany({
      where: {
        AND: [
            standard ? { 
                name: { 
                  contains: standard,
                  mode: 'insensitive' 
                } 
              } : {},
            goal ? {
                tags: {
                    has: goal // Assuming goal is stored in tags for flexibility
                }
            } : {}
        ]
      },
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
