import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Patient } from '../../types/Patient';
import patientService from '../../services/patientService';
import { Typography, Box } from '@mui/material';
import GenderIcon from './GenderIcon';

const PatientDetailPage = () => {
  const { id } = useParams();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!id) {
      setError('Invalid patient ID');
      return;
    }

    const fetchPatient = async () => {
      try {
        const patientData = await patientService.getById(id);
        setPatient(patientData);
        setError(undefined);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 404) {
            setError('Patient not found');
            console.error('Patient not found');
          } else if (e.response?.data && typeof e.response.data === 'string') {
            const message = e.response.data.replace(
              'Something went wrong. Error: ',
              '',
            );
            console.error(message);
            setError(message);
          }
        } else {
          setError('Unrecognized axios error');
          console.error('Unknown error', e);
        }
      }
    };

    void fetchPatient();
  }, [id]);

  if (error) {
    return (
      <div style={{ color: 'red', fontSize: '20px', marginTop: '1em' }}>
        {error}
      </div>
    );
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h2">
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>
      <Typography>Date of Birth: {patient.dateOfBirth}</Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
    </Box>
  );
};

export default PatientDetailPage;
