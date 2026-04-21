/**
 * Global API response structure to ensure consistency across the platform.
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message?: string;
    issues?: any[];
  };
}
