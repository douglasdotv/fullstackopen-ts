import { BmiInput, ExerciseInput } from './types';

export const parseBmiArguments = (args: string[]): BmiInput => {
  if (args.length < 4) {
    throw new Error('Usage: npm run bmiCalculator <height> <weight>');
  }

  if (args.length > 4) {
    throw new Error('Too many arguments.');
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || height <= 0) {
    throw new Error('Provided height value is not a valid positive number!');
  }

  if (isNaN(weight) || weight <= 0) {
    throw new Error('Provided weight value is not a valid positive number!');
  }

  return { height, weight };
};

export const parseExerciseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) {
    throw new Error(
      'Usage: npm run exerciseCalculator <target> <day1> <day2> ...',
    );
  }

  const target = Number(args[2]);

  if (isNaN(target) || target <= 0) {
    throw new Error('Provided target value is not a valid positive number!');
  }

  const dailyHours = args.slice(3).map((hour, index) => {
    const parsedHour = Number(hour);
    if (isNaN(parsedHour) || parsedHour < 0) {
      throw new Error(
        `Provided hour value at position ${
          index + 3
        } is not a valid non-negative number!`,
      );
    }
    return parsedHour;
  });

  return { target, dailyHours };
};
