import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { newPatientParser } from '../middleware/newPatientParser';
import { errorHandler } from '../middleware/errorHandler';
import { NewPatient, NonSensitivePatient } from '../types/Patient';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
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
