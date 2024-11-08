import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient, PatientFormValues } from '../types/Patient';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const create = async (patientData: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    patientData,
  );
  return data;
};

export default {
  getAll,
  create,
};
