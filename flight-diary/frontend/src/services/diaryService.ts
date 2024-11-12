import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types/DiaryEntry';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllDiaryEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const createDiaryEntry = async (newEntry: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newEntry);
  return response.data;
};

export { getAllDiaryEntries, createDiaryEntry };
