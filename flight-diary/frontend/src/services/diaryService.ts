import axios from 'axios';
import { DiaryEntry } from '../types/DiaryEntry';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllDiaryEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export { getAllDiaryEntries };
