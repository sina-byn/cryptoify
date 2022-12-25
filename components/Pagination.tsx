import { FC, Dispatch, SetStateAction, useState, MouseEvent } from 'react';

// * hooks
import useAxios from '../hooks/useAxios';

// * interfaces
import type { Coin } from '../interfaces/interfaces';
import Button from './Button';
interface PaginationProps {
  page: number;
  perPage: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination: FC<PaginationProps> = ({ page, perPage, setPage }) => {
  const axios = useAxios<Partial<Coin>[]>();
  const [lastPage, setLastPage] = useState<number>(0);

  const pageChangeHandler = (e: MouseEvent) => {
    const targetBtn = e.target as HTMLElement;
    const page = Number(targetBtn.textContent)!;
    setPage(page);
  };

  const incrementHandler = () => setPage(prev => ++prev);
  const decrementHandler = () => setPage(prev => --prev);

  const { error } = axios.get('https://api.coingecko.com/api/v3/coins/list', {
    setState: data => setLastPage(Math.ceil(data.length / Number(perPage))),
  });

  const generatePageNums = (currPage: number) => {
    const nums: number[] = [];
    currPage = Number(currPage);

    for (let i = -2; i < 3; i++) {
      const newNum = currPage + i;
      if (newNum > 0 && newNum <= lastPage) nums.push(newNum);
    }

    if (nums.length < 5) {
      if (currPage < 3) {
        switch (currPage) {
          case 1:
            nums.push(4, 5);
            break;
          case 2:
            nums.push(5);
        }
      } else if (currPage > lastPage - 2) {
        switch (currPage) {
          case lastPage - 1:
            nums.unshift(lastPage - 4);
            break;
          case lastPage:
            nums.unshift(lastPage - 4, lastPage - 3);
        }
      }
    }

    return nums;
  };

  if (error || !lastPage) return null;

  return (
    <div className='pagination flex items-center md:justify-end col-start-2 h-[1.9rem]'>
      {page > 3 ? (
        <Button
          onClick={decrementHandler}
          className='h-full border border-gray-400/50 rounded-l-md pt-0.5 px-2'
        >
          <i className='fa-solid fa-angles-left fa-xs' />
        </Button>
      ) : null}
      {generatePageNums(page).map(num => (
        <Button
          key={num}
          onClick={pageChangeHandler}
          className={`
            h-full text-sm border-y border-gray-400/50 pt-0.5 px-3 first:rounded-l-md last:rounded-r-md
            odd:border-x
            ${
              page === num
                ? 'bg-blue-500 text-gray-200 hover:bg-blue-600'
                : 'hover:bg-gray-200'
            }
          `}
        >
          {num}
        </Button>
      ))}
      {page < lastPage - 2 ? (
        <Button
          onClick={incrementHandler}
          className='h-full border border-gray-400/50 rounded-r-md pt-0.5 px-2'
        >
          <i className='fa-solid fa-angles-right fa-xs' />
        </Button>
      ) : null}
    </div>
  );
};

export default Pagination;
