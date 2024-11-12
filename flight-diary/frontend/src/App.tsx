import { useState, useEffect } from 'react';
import { getAllDiaryEntries } from './services/diaryService';
import { DiaryEntry } from './types/DiaryEntry';
import DiaryEntryList from './components/DiaryEntryList';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries()
      .then((data) => {
        setDiaryEntries(data);
      })
      .catch((error) => {
        console.error('Error while fetching diaries:', error);
      });
  }, []);

  return (
    <div>
      <h1>Flight diary</h1>
      <DiaryEntryList diaryEntries={diaryEntries} />
    </div>
  );
};

export default App;
