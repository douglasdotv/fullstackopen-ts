import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
