import { useState } from 'react';
import { NewDiaryEntry } from '../types/DiaryEntry';
import { Visibility } from '../types/Visibility';
import { Weather } from '../types/Weather';

interface DiaryEntryFormProps {
  addDiaryEntry: (diary: NewDiaryEntry) => void;
  errorMessage: string;
}

const DiaryEntryForm = ({
  addDiaryEntry,
  errorMessage,
}: DiaryEntryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    addDiaryEntry(newDiary);

    setDate('');
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
    setComment('');
  };

  return (
    <div>
      <div style={{ color: 'red' }}>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <h2>Add new diary entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Date:{' '}
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <p>Weather:</p>
          {Object.values(Weather).map((w: Weather) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          <p>Visibility:</p>
          {Object.values(Visibility).map((v: Visibility) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          Comment:{' '}
          <textarea
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiaryEntryForm;
