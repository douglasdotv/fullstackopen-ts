import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllDiaryEntries, createDiaryEntry } from './services/diaryService';
import { DiaryEntry, NewDiaryEntry } from './types/DiaryEntry';
import DiaryEntryList from './components/DiaryEntryList';
import DiaryEntryForm from './components/DiaryEntryForm';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaryEntries()
      .then((data) => {
        setDiaryEntries(data);
      })
      .catch((error) => {
        console.error('Error while fetching diaries:', error);
      });
  }, []);

  const addDiaryEntry = async (newDiary: NewDiaryEntry) => {
    try {
      const addedDiary = await createDiaryEntry(newDiary);
      setDiaryEntries(diaryEntries.concat(addedDiary));
      setErrorMessage('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && typeof error.response.data === 'string') {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage('An unknown error occurred.');
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      console.error('Error while adding diary:', error);
    }
  };

  return (
    <div>
      <h1>Flight diary</h1>
      <DiaryEntryList diaryEntries={diaryEntries} />
      <DiaryEntryForm
        addDiaryEntry={addDiaryEntry}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default App;
