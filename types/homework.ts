// types/homework.ts
import { Homework, HomeworkSubmission, Subject } from '@prisma/client';

/**
 * Extended homework type including subject and submission status for scholar dashboards.
 */
export interface HomeworkWithMeta extends Homework {
  subject: {
    name: string;
  };
  submissions: HomeworkSubmission[];
}

/**
 * Structure of the R2 presigned upload URL response.
 */
export interface PresignedUploadResponse {
  fileIndex: number;
  uploadUrl: string;
  r2Key: string;
}
