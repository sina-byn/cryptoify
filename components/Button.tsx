import { FC, ReactNode, MouseEvent } from 'react';

// * interfaces
interface ButtonProps {
  children: ReactNode;
  onClick: Function;
  className?: string;
  rest?: (string | boolean)[];
}

const Button: FC<ButtonProps> = ({ children, onClick, className = '', ...rest }) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  
  return (
    <button type='button' onClick={clickHandler} className={className} {...rest} >
      {children}
    </button>
  );
};

export default Button;
