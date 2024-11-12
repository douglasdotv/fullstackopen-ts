import { DiaryEntry } from '../types/DiaryEntry';
import DiaryEntryItem from './DiaryEntryItem';

interface DiaryEntryListProps {
  diaryEntries: DiaryEntry[];
}

const DiaryEntryList = ({ diaryEntries }: DiaryEntryListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      <ul>
        {diaryEntries.map((diaryEntry: DiaryEntry) => (
          <DiaryEntryItem key={diaryEntry.id} diaryEntry={diaryEntry} />
        ))}
      </ul>
    </div>
  );
};

export default DiaryEntryList;
