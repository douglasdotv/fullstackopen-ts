import { ExerciseResult, Rating } from './types';

export const calculateExercises = (
  dailyHours: number[],
  target: number,
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = calculateTrainingDays(dailyHours);
  const totalHours = calculateTotalHours(dailyHours);
  const average = totalHours / periodLength;
  const success = average >= target;
  const rating = getRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating: rating.value,
    ratingDescription: rating.description,
    target,
    average,
  };
};

const calculateTrainingDays = (dailyHours: number[]): number => {
  return dailyHours.filter((day) => day > 0).length;
};

const calculateTotalHours = (dailyHours: number[]): number => {
  return dailyHours.reduce((sum, hours) => sum + hours, 0);
};

const getRating = (average: number, target: number): Rating => {
  if (average >= target) {
    return { value: 3, description: 'Great job! You met your target!' };
  }

  if (average >= target * 0.8) {
    return { value: 2, description: 'Not too bad, but could be better.' };
  }

  return { value: 1, description: 'You need to work harder.' };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
