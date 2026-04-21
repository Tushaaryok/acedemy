import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
import { getBatches } from '@/services/batch-service';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * Handles GET requests for academic batches with pagination.
 * @param request - The incoming Next.js request object
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    headers();
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor') || undefined;
    const limit = parseInt(searchParams.get('limit') || '12');

    // Build-time bypass
    if (process.env.DATABASE_URL?.includes('localhost')) {
       return successResponse({ items: [], nextCursor: null });
    }

    const data = await getBatches(cursor, limit);

    return successResponse(data);
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Batches API Error:', error.message);
    return errorResponse('Failed to fetch academic batches', 500);
  }
}
