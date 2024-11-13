import { Box, Typography } from '@mui/material';
import {
  LocalHospital,
  Work,
  Favorite,
  SentimentVerySatisfied,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from '@mui/icons-material';
import { PatientEntry } from '../../types/PatientEntry';
import { Diagnosis } from '../../types/Diagnosis';
import { HealthCheckRating } from '../../types/HealthCheckRating';

type PatientEntryDisplayProps = {
  entry: PatientEntry;
  diagnoses: Diagnosis[];
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const PatientEntryDisplay = ({
  entry,
  diagnoses,
}: PatientEntryDisplayProps) => {
  const getDiagnosisDescription = (code: string): string | undefined => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : 'Unknown diagnosis';
  };

  const renderHealthRatingIcon = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return <SentimentVerySatisfied color="success" />;
      case HealthCheckRating.LowRisk:
        return <SentimentSatisfied color="info" />;
      case HealthCheckRating.HighRisk:
        return <SentimentDissatisfied color="warning" />;
      case HealthCheckRating.CriticalRisk:
        return <SentimentVeryDissatisfied color="error" />;
      default:
        return null;
    }
  };

  switch (entry.type) {
    case 'Hospital':
      return (
        <Box border={1} borderRadius={2} p={2} mb={2}>
          <Typography variant="h6" gutterBottom>
            <LocalHospital /> Hospital entry
          </Typography>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          {entry.diagnosisCodes && (
            <Box>
              <Typography variant="subtitle2">Diagnosis codes:</Typography>
              <ul>
                {entry.diagnosisCodes.map((code) => (
                  <li key={code}>
                    {code}: {getDiagnosisDescription(code)}
                  </li>
                ))}
              </ul>
            </Box>
          )}
          <Typography>Discharge date: {entry.discharge.date}</Typography>
          <Typography>Criteria: {entry.discharge.criteria}</Typography>
        </Box>
      );
    case 'OccupationalHealthcare':
      return (
        <Box border={1} borderRadius={2} p={2} mb={2}>
          <Typography variant="h6" gutterBottom>
            <Work /> Occupational healthcare entry ({entry.employerName})
          </Typography>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          {entry.sickLeave && (
            <Typography>
              Sick leave: {entry.sickLeave.startDate} -{' '}
              {entry.sickLeave.endDate}
            </Typography>
          )}
          {entry.diagnosisCodes && (
            <Box>
              <Typography variant="subtitle2">Diagnosis codes:</Typography>
              <ul>
                {entry.diagnosisCodes.map((code) => (
                  <li key={code}>
                    {code}: {getDiagnosisDescription(code)}
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      );
    case 'HealthCheck':
      return (
        <Box border={1} borderRadius={2} p={2} mb={2}>
          <Typography variant="h6" gutterBottom>
            <Favorite /> Health check entry
          </Typography>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          <Box display="flex" alignItems="center">
            <Typography>Health rating: </Typography>
            {renderHealthRatingIcon(entry.healthCheckRating)}
          </Box>
          {entry.diagnosisCodes && (
            <Box>
              <Typography variant="subtitle2">Diagnosis codes:</Typography>
              <ul>
                {entry.diagnosisCodes.map((code) => (
                  <li key={code}>
                    {code}: {getDiagnosisDescription(code)}
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default PatientEntryDisplay;
