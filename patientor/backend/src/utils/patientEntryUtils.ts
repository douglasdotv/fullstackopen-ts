import { z } from 'zod';
import { HealthCheckRating } from '../types/HealthCheckRating';

const BasePatientEntrySchema = z.object({
  description: z.string(),
  date: z.string().refine((data) => Boolean(Date.parse(data)), {
    message: 'Invalid date format. Expected YYYY-MM-DD.',
  }),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckPatientEntrySchema = BasePatientEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const OccupationalHealthcarePatientEntrySchema = BasePatientEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

const HospitalPatientEntrySchema = BasePatientEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

export const NewPatientEntrySchema = z.union([
  HealthCheckPatientEntrySchema,
  OccupationalHealthcarePatientEntrySchema,
  HospitalPatientEntrySchema,
]);
