// types/homework.ts
import { homeworks, homework_submissions, subjects } from '@prisma/client';

/**
 * Extended homework type including subject and submission status for scholar dashboards.
 */
export interface HomeworkWithMeta extends homeworks {
  subject: {
    name: string;
  };
  submissions: homework_submissions[];
}

/**
 * Structure of the R2 presigned upload URL response.
 */
export interface PresignedUploadResponse {
  fileIndex: number;
  uploadUrl: string;
  r2Key: string;
}
