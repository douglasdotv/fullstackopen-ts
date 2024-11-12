import patients from '../../data/patients';
import { Patient, NewPatient, NonSensitivePatient } from '../types/Patient';
import { v4 as uuidv4 } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getNonSensitivePatients,
  getPatient,
  addPatient,
};
