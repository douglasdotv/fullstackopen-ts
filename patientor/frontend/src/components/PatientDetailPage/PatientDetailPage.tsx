import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Patient } from '../../types/Patient';
import { Diagnosis } from '../../types/Diagnosis';
import patientService from '../../services/patientService';
import { Typography, Box, List, ListItem } from '@mui/material';
import GenderIcon from './GenderIcon';

type PatientDetailPageProps = {
  diagnoses: Diagnosis[];
};

const PatientDetailPage = ({ diagnoses }: PatientDetailPageProps) => {
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

  const getDiagnosisDescription = (code: string): string | undefined => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : 'Unknown diagnosis';
  };

  return (
    <Box>
      <Typography variant="h4" component="h2">
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>
      <Typography>Date of Birth: {patient.dateOfBirth}</Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography variant="h6" component="h3" style={{ marginTop: '1em' }}>
        Entries
      </Typography>
      <List>
        {patient.entries?.map((entry) => (
          <ListItem key={entry.id} style={{ marginBottom: '1em' }}>
            <Box>
              <Typography variant="body1">
                {entry.date} - <i>{entry.description}</i>
              </Typography>
              {entry.diagnosisCodes && (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                      {code}: {getDiagnosisDescription(code)}
                    </li>
                  ))}
                </ul>
              )}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PatientDetailPage;
