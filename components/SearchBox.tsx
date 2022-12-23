import { FC, useId, Dispatch, SetStateAction, ChangeEvent } from 'react';

// * interfaces
interface SearchBoxProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
}

const SearchBox: FC<SearchBoxProps> = ({ value, setValue, placeholder }) => {
  const id = useId();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <div className='search-box flex items-center h-[1.9rem]'>
      <label
        htmlFor={id}
        className='flex items-center bg-blue-500 text-gray-200 h-full rounded-l-md px-2.5 cursor-pointer hover:bg-blue-600'
      >
        <i className='fa-solid fa-search fa-sm' />
      </label>
      <input
        id={id}
        type='text'
        value={value}
        onChange={changeHandler}
        placeholder={placeholder}
        className='h-full border border-gray-400/50 outline-0 rounded-r-md px-2 pb-0.5'
      />
    </div>
  );
};

export default SearchBox;
