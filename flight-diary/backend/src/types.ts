export enum Weather {
  Sunny = 'Sunny',
  Rainy = 'Rainy',
  Cloudy = 'Cloudy',
  Stormy = 'Stormy',
  Windy = 'Windy',
}

export enum Visibility {
  Great = 'Great',
  Good = 'Good',
  Ok = 'Ok',
  Poor = 'Poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
