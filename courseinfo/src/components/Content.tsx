import { CoursePart } from '../types';

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((part: CoursePart) => (
        <p key={part.id}>
          {part.name}: {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
