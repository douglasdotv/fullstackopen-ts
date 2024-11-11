import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <strong>
            {part.name} ({part.exerciseCount} exercises)
          </strong>
          <br />
          <em>{part.description}</em>
        </p>
      );
    case 'group':
      return (
        <p>
          <strong>
            {part.name} ({part.exerciseCount} exercises)
          </strong>
          <br />
          Project exercises: {part.groupProjectCount}
        </p>
      );
    case 'background':
      return (
        <p>
          <strong>
            {part.name} ({part.exerciseCount} exercises)
          </strong>
          <br />
          <em>{part.description}</em>
          <br />
          Submit to:{' '}
          <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      );
    case 'special':
      return (
        <p>
          <strong>
            {part.name} ({part.exerciseCount} exercises)
          </strong>
          <br />
          <em>{part.description}</em>
          <br />
          Required skills: {part.requirements.join(', ')}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
