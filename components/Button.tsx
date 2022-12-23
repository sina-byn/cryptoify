import { FC, ReactNode, MouseEvent } from 'react';

// * interfaces
interface ButtonProps {
  children: ReactNode;
  onClick: Function;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, onClick, className = '' }) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  
  return (
    <button type='button' onClick={clickHandler} className={className}>
      {children}
    </button>
  );
};

export default Button;
