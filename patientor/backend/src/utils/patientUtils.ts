import { z } from 'zod';
import { Gender } from '../types/Gender';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().refine((data) => Boolean(Date.parse(data)), {
    message: 'Invalid date format. Expected YYYY-MM-DD.',
  }),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});
