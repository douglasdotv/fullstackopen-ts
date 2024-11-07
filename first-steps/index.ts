import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (height === undefined || weight === undefined) {
    return res.status(400).json({
      error: 'Missing parameters: "height" and "weight" are required.',
    });
  }

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).json({
      error:
        'Invalid parameters: "height" and "weight" must be positive numbers.',
    });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;

  if (!dailyExercises || target === undefined) {
    return res.status(400).json({
      error: 'Missing parameters: "daily_exercises" and "target" are required.',
    });
  }

  if (
    !Array.isArray(dailyExercises) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !dailyExercises.every((exercise: any) => typeof exercise === 'number') ||
    typeof target !== 'number' ||
    target <= 0 ||
    dailyExercises.some((exercise: number) => exercise <= 0)
  ) {
    return res.status(400).json({
      error:
        'Invalid parameters: "daily_exercises" must be an array of positive numbers and "target" must be a positive number.',
    });
  }

  const result = calculateExercises(target, dailyExercises);

  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
