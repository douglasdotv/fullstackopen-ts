export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

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

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: PatientEntry[];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
