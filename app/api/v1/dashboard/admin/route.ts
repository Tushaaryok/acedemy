
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import type { ApiResponse } from '@/types';

/**
 * High-level intelligence overview for Academic Administrators.
 */
export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Build-time safety
    headers();
    if (process.env.NEXT_PHASE === 'phase-production-build' || (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production')) {
      return NextResponse.json({ success: true, data: {} as any });
    }

    // 2. Authenticate & Role Check
    const public_users = await getUserFromRequest(req);
    if (public_users.role !== 'admin') {
      return NextResponse.json({ success: false, error: { code: 'FORBIDDEN' } }, { status: 403 });
    }

    // 3. Command Central Aggregation
    const [stats, recentEnquiries, revenue] = await Promise.all([
      prisma.public_users.groupBy({
        by: ['role'],
        _count: { id: true }
      }),
      prisma.enquiry.findMany({
        orderBy: { created_at: 'desc' },
        take: 5
      }),
      prisma.fee.aggregate({
        _sum: { amount: true },
        where: { status: 'paid' }
      })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        distribution: stats,
        recentEnquiries,
        totalRevenue: revenue._sum.amount || 0
      }
    }, { status: 200 });

  } catch (error) {
    console.error('[dashboard/admin]', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
