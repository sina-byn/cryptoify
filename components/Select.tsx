import { FC, useRef, Dispatch, SetStateAction, MouseEvent } from 'react';

// * hooks
import useToggle from '../hooks/useToggle';
import useClickoutside from '../hooks/useClickOutside';

// * components
import Button from './Button';

// * interfaces
interface SelectProps<T> {
  label: string;
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  options: string[];
}

const Select = <T extends number | string>({
  label,
  value,
  setValue,
  options,
}: SelectProps<T>) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded, toggler] = useToggle();
  useClickoutside<HTMLDivElement>(selectRef, toggler);

  const expandToggler = () => setExpanded(prev => !prev);
  const selectHandler = (e: MouseEvent) => {
    const option = e.target as HTMLButtonElement;
    const optionValue =
      typeof value === 'string'
        ? option.textContent
        : Number(option.textContent);
    setValue(optionValue as T);
    toggler(false);
  };

  return (
    <div className='select-wrapper flex items-center gap-1'>
      <span className='select-label text-sm'>{label} :</span>
      <div
        ref={selectRef}
        className='select flex flex-col w-20 h-8 relative text-sm border border-gray-400/50 rounded-lg'
      >
        <Button
          onClick={expandToggler}
          className='h-full flex items-center justify-between px-3'
        >
          {value}
          <i
            className={`
              fa-solid fa-xs
              ${expanded ? 'fa-chevron-up' : 'fa-chevron-right'}
           `}
          />
        </Button>
        <div
          className={`
            options flex-col w-full absolute top-[120%] z-10 bg-white border border-gray-400/50 shadow-md overflow-hidden rounded-md
            ${expanded ? 'flex' : 'hidden'}
          `}
        >
          {options.map(option => (
            <Button
              key={option}
              onClick={selectHandler}
              className='py-1 even:bg-gray-300/50 hover:bg-[#61dafb]'
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
