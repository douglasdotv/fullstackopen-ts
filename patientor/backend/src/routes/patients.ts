import express, { Response } from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/patientUtils';
import { NonSensitivePatient } from '../types/Patient';
import { ErrorResponse } from '../types/ErrorResponse';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res: Response<NonSensitivePatient | ErrorResponse>) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Something went wrong.';
    res.status(400).send({ error: errorMessage });
  }
});

export default router;
