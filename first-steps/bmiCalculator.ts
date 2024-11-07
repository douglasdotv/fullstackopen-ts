import { parseBmiArguments } from './utils';

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / heightInMeters ** 2;
  return getBmiCategory(bmi);
};

const getBmiCategory = (bmi: number): string => {
  if (bmi < 16.0) return 'Severely underweight';
  if (bmi <= 16.9) return 'Moderately underweight';
  if (bmi <= 18.4) return 'Mildly underweight';
  if (bmi <= 24.9) return 'Normal range';
  if (bmi <= 29.9) return 'Pre-obesity';
  if (bmi <= 34.9) return 'Obesity I';
  if (bmi <= 39.9) return 'Obesity II';
  return 'Obesity III';
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    console.error(
      'Error:',
      e instanceof Error ? e.message : 'Unexpected error',
    );
  }
}
