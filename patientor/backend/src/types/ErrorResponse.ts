import { z } from 'zod';

export interface ErrorResponse {
  error: string;
  issues?: z.ZodIssue[];
}
