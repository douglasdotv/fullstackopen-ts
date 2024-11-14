import { Diagnosis } from './Diagnosis';
import { HealthCheckRating } from './HealthCheckRating';

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

interface BasePatientEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckPatientEntry extends BasePatientEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcarePatientEntry extends BasePatientEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalPatientEntry extends BasePatientEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export type PatientEntry =
  | HealthCheckPatientEntry
  | OccupationalHealthcarePatientEntry
  | HospitalPatientEntry;

export type NewPatientEntry = UnionOmit<PatientEntry, 'id'>;
