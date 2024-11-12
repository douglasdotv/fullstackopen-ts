import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { newPatientParser } from '../middleware/newPatientParser';
import { errorHandler } from '../middleware/errorHandler';
import { Patient, NewPatient, NonSensitivePatient } from '../types/Patient';
import { ErrorResponse } from '../types/ErrorResponse';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<Patient | ErrorResponse>) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found.' });
  }
});

router.post(
  '/',
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<NonSensitivePatient>,
  ) => {
    const newPatient = req.body;
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  },
);

router.use(errorHandler);

export default router;
