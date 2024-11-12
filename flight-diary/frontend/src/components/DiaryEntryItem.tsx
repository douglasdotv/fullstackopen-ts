import { DiaryEntry } from '../types/DiaryEntry';

interface DiaryEntryItemProps {
  diaryEntry: DiaryEntry;
}

const DiaryEntryItem = ({ diaryEntry }: DiaryEntryItemProps) => {
  return (
    <li>
      <strong>{diaryEntry.date}</strong> - Weather: {diaryEntry.weather},
      Visibility: {diaryEntry.visibility}
      {diaryEntry.comment && <p>{diaryEntry.comment}</p>}
    </li>
  );
};

export default DiaryEntryItem;
