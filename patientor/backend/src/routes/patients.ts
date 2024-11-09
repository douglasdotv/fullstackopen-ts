import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NewPatient, NonSensitivePatient } from '../types/Patient';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res: Response<NonSensitivePatient>) => {
  const newPatient: NewPatient = req.body;
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});

export default router;
