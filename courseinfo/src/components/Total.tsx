interface TotalProps {
  total: number;
}

const Total = ({ total }: TotalProps) => {
  return <p>Total number of exercises: {total}</p>;
};

export default Total;
