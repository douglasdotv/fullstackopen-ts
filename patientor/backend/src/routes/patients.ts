import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types/Patient';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

export default router;
