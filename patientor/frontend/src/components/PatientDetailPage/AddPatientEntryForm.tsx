import { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import {
  PatientEntryFormValues,
  PatientEntryType,
} from '../../types/PatientEntry';
import { HealthCheckRating } from '../../types/HealthCheckRating';
import { Diagnosis } from '../../types/Diagnosis';

interface Props {
  onSubmit: (entry: PatientEntryFormValues) => void;
  diagnoses: Diagnosis[];
}

const AddPatientEntryForm = ({ onSubmit, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState<PatientEntryType>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy,
  );
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const handleAddPatientEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: PatientEntryFormValues = (() => {
      switch (entryType) {
        case 'HealthCheck':
          return {
            ...createBaseEntry(),
            type: entryType,
            healthCheckRating,
          };
        case 'OccupationalHealthcare':
          return {
            ...createBaseEntry(),
            type: entryType,
            employerName,
            sickLeave:
              sickLeaveStart && sickLeaveEnd
                ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
                : undefined,
          };
        case 'Hospital':
          return {
            ...createBaseEntry(),
            type: entryType,
            discharge: { date: dischargeDate, criteria: dischargeCriteria },
          };
        default:
          throw new Error('Unknown entry type');
      }
    })();

    onSubmit(newEntry);

    resetFormFields();
  };

  const createBaseEntry = () => ({
    description,
    date,
    specialist,
    diagnosisCodes,
  });

  const resetFormFields = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setHealthCheckRating(HealthCheckRating.Healthy);
    setEmployerName('');
    setSickLeaveStart('');
    setSickLeaveEnd('');
    setDischargeDate('');
    setDischargeCriteria('');
  };

  const handleDiagnosisChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value;
    const isStringArray =
      Array.isArray(value) && value.every((item) => typeof item === 'string');
    if (isStringArray) {
      setDiagnosisCodes(value);
    }
  };

  const handleEntryTypeChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value;
    if (
      value === 'HealthCheck' ||
      value === 'OccupationalHealthcare' ||
      value === 'Hospital'
    ) {
      setEntryType(value);
    }
  };

  return (
    <form onSubmit={handleAddPatientEntry}>
      <InputLabel style={{ marginTop: '1em' }}>Entry type</InputLabel>
      <Select
        value={entryType}
        fullWidth
        onChange={handleEntryTypeChange}
        style={{ marginBottom: '1em' }}
      >
        <MenuItem value="HealthCheck">HealthCheck</MenuItem>
        <MenuItem value="OccupationalHealthcare">
          OccupationalHealthcare
        </MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
      </Select>

      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        style={{ marginBottom: '1em' }}
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: '1em' }}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        style={{ marginBottom: '1em' }}
      />

      <FormControl fullWidth style={{ marginBottom: '1em' }}>
        <InputLabel>Diagnosis codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          onChange={handleDiagnosisChange}
          input={<OutlinedInput label="Diagnosis codes" />}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} - {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {entryType === 'HealthCheck' && (
        <TextField
          label="Health check rating"
          type="number"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
          inputProps={{ min: 0, max: 3 }}
          style={{ marginBottom: '1em' }}
        />
      )}

      {entryType === 'OccupationalHealthcare' && (
        <>
          <TextField
            label="Employer name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
            style={{ marginBottom: '1em' }}
          />
          <TextField
            label="Sick leave start"
            type="date"
            fullWidth
            value={sickLeaveStart}
            onChange={({ target }) => setSickLeaveStart(target.value)}
            InputLabelProps={{ shrink: true }}
            style={{ marginBottom: '1em' }}
          />
          <TextField
            label="Sick leave end"
            type="date"
            fullWidth
            value={sickLeaveEnd}
            onChange={({ target }) => setSickLeaveEnd(target.value)}
            InputLabelProps={{ shrink: true }}
            style={{ marginBottom: '1em' }}
          />
        </>
      )}

      {entryType === 'Hospital' && (
        <>
          <TextField
            label="Discharge date"
            type="date"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
            InputLabelProps={{ shrink: true }}
            style={{ marginBottom: '1em' }}
          />
          <TextField
            label="Discharge criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
            style={{ marginBottom: '1em' }}
          />
        </>
      )}

      <Grid container justifyContent="flex-end">
        <Button color="primary" type="submit" variant="contained">
          Add
        </Button>
      </Grid>
    </form>
  );
};

export default AddPatientEntryForm;
