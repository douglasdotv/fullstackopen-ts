import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((part: CoursePart) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

export default Content;
