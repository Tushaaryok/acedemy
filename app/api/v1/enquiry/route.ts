import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { ApiResponse } from '@/types';

/**
 * Zod schema for Enquiry validation.
 */
const EnquirySchema = z.object({
  student_name: z.string().min(2).max(100),
  parent_name: z.string().min(2).max(100),
  phone: z.string().regex(/^[0-9+]{10,15}$/, "Sahi phone number daalo"),
  class: z.string(),
  board: z.string(),
  message: z.string().max(1000).optional(),
});

/**
 * Handles PUBLIC enquiry submission.
 */
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Validating request body
    const body = await req.json();
    const parsed = EnquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: { code: 'VALIDATION_ERR', issues: parsed.error.issues } 
        }, 
        { status: 422 }
      );
    }

    // 2. Business logic + DB operation
    const enquiry = await prisma.enquiry.create({
      data: {
        ...parsed.data,
        source: 'website',
      },
    });

    // 3. Success response
    return NextResponse.json(
      { success: true, data: { id: enquiry.id } }, 
      { status: 201 }
    );

  } catch (error) {
    console.error('[enquiry/POST]', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR' } }, 
      { status: 500 }
    );
  }
}
