import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Patient } from '../../types/Patient';
import { PatientEntryFormValues } from '../../types/PatientEntry';
import { Diagnosis } from '../../types/Diagnosis';
import { apiBaseUrl } from '../../constants';
import patientService from '../../services/patientService';
import { Typography, Box, List, ListItem, Alert } from '@mui/material';
import PatientEntryDisplay from './PatientEntryDisplay';
import AddPatientEntryForm from './AddPatientEntryForm';
import GenderIcon from './GenderIcon';

type PatientDetailPageProps = {
  diagnoses: Diagnosis[];
};

const PatientDetailPage = ({ diagnoses }: PatientDetailPageProps) => {
  const { id } = useParams();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`,
        );
        setPatient(patientData);
        setError(undefined);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 404) {
            setError('Patient not found');
          } else if (e.response?.data && typeof e.response.data === 'string') {
            const message = e.response.data.replace(
              'Something went wrong. Error: ',
              '',
            );
            setError(message);
          }
        } else {
          setError('Unrecognized axios error');
        }
      }
    };

    void fetchPatient();
  }, [id]);

  if (error && !patient) {
    return (
      <div style={{ color: 'red', fontSize: '20px', marginTop: '1em' }}>
        {error}
      </div>
    );
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

  const handleAddPatientEntry = async (entry: PatientEntryFormValues) => {
    try {
      const addedEntry = await patientService.addEntry(patient.id, entry);
      setPatient({
        ...patient,
        entries: patient.entries.concat(addedEntry),
      });
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data?.error) {
          setError(e.response.data.error);
        } else {
          setError('An unknown error occurred. Please try again.');
        }
      }
    }
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
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        {patient.entries?.map((entry) => (
          <ListItem key={entry.id}>
            <PatientEntryDisplay entry={entry} diagnoses={diagnoses} />
          </ListItem>
        ))}
      </List>
      <AddPatientEntryForm
        onSubmit={handleAddPatientEntry}
        diagnoses={diagnoses}
      />
    </Box>
  );
};

export default PatientDetailPage;
