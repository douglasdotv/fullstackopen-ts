import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient, PatientFormValues } from '../types/Patient';
import { PatientEntry, PatientEntryFormValues } from '../types/PatientEntry';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (patientData: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    patientData,
  );
  return data;
};

const addEntry = async (patientId: string, entry: PatientEntryFormValues) => {
  const { data } = await axios.post<PatientEntry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry,
  );
  return data;
};

export default {
  getAll,
  getById,
  create,
  addEntry,
};
