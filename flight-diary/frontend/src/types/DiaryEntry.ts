import { Visibility } from './Visibility';
import { Weather } from './Weather';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
