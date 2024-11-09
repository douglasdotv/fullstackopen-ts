import express, { Response } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import { NewPatientSchema } from '../utils/patientUtils';
import { NonSensitivePatient } from '../types/Patient';
import { ErrorResponse } from '../types/ErrorResponse';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res: Response<NonSensitivePatient | ErrorResponse>) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: 'Validation error.',
        issues: error.issues,
      });
    } else {
      res.status(500).json({ error: 'Unknown error.' });
    }
  }
});

export default router;
