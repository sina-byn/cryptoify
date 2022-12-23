import { Dispatch, SetStateAction, useState } from 'react';

type UseToggle = () => [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  (value?: boolean) => void
];

const useToggle: UseToggle = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggler = (value?: boolean) => {
    value !== undefined ? setToggle(value) : setToggle(prev => !prev);
  };

  return [toggle, setToggle, toggler];
};

export default useToggle;
