import { HealthCheckRating } from './../types';

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export interface BasePatientEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<string>;
}

export interface HealthCheckPatientEntry extends BasePatientEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcarePatientEntry extends BasePatientEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalPatientEntry extends BasePatientEntry {
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

export type PatientEntryFormValues = UnionOmit<PatientEntry, 'id'>;

export type PatientEntryType = PatientEntry['type'];
