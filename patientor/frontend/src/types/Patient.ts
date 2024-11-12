import { Gender } from './Gender';
import { PatientEntry } from './PatientEntry';

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: PatientEntry[];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
