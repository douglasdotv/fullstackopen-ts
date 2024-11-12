import { Male, Female, HelpOutline } from '@mui/icons-material';

interface GenderIconProps {
  gender: string;
}

const GenderIcon = ({ gender }: GenderIconProps) => {
  switch (gender) {
    case 'Male':
      return <Male />;
    case 'Female':
      return <Female />;
    case 'Other':
    default:
      return <HelpOutline />;
  }
};

export default GenderIcon;
