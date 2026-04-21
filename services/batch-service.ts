import { Batch } from '@prisma/client';
import prisma from '@/lib/prisma';

/**
 * Fetches matching batches with cursor-based pagination and soft-delete filter.
 * @param cursor - The ID of the last fetched item for pagination
 * @param limit - Number of records to return
 * @returns Object containing items and the next cursor
 */
export async function getBatches(cursor?: string, limit: number = 12): Promise<{ items: Batch[], nextCursor: string | null }> {
  const items = await prisma.batch.findMany({
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    where: {
      deletedAt: null,
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  const nextCursor = items.length === limit ? items[items.length - 1].id : null;

  return {
    items,
    nextCursor,
  };
}
