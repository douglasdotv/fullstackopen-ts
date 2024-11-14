import { Request, Response, NextFunction } from 'express';
import { NewPatientEntrySchema } from '../utils/patientEntryUtils';

export const newPatientEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
