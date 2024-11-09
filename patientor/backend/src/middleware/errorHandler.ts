import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ErrorResponse } from '../types/ErrorResponse';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({
      error: 'Validation error.',
      issues: error.issues,
    });
  } else {
    next(error);
  }
};
