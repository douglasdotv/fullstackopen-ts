export interface BmiInput {
  height: number;
  weight: number;
}

export interface ExerciseInput {
  target: number;
  dailyHours: number[];
}
export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface Rating {
  value: number;
  description: string;
}
