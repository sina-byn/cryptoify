import { FC } from 'react';

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className = '' }) => {
  return (
    <div
      className={`spinner aspect-square border-t-2 border-zinc-700 rounded-full animate-spin ${className}`}
    />
  );
};

export default Spinner;
