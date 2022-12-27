import Link from 'next/link';
import Image from 'next/image';

// * utils
import { getCurrencySign } from '../utils/functions';

// * intefaces
import type { Coin } from '../interfaces/interfaces';

const tableCols = (currency: string) => [
  { key: 'market_cap_rank', title: '#', className: 'text-left pr-0 md:pr-5' },
  {
    title: 'Coin',
    className: 'flex items-center gap-2 text-left pl-0',
    cellElem: ({ name, symbol, image }: Coin) => (
      <>
        {image && (
          <Image
            alt={name}
            src={image}
            width={50}
            height={50}
            className='w-10'
          />
        )}
        <span className='font-bold'>{name}</span>
        <sup className='text-gray-400 text-sm pr-10 sm:pr-0'>{symbol}</sup>
      </>
    ),
  },
  {
    key: 'current_price',
    title: 'Price',
    cellElem: ({ current_price }: Coin) => (
      <>
        {getCurrencySign(currency)}
        {current_price}
      </>
    ),
  },
  {
    key: 'price_change_percentage_24h',
    title: '24h',
    cellElem: ({ price_change_percentage_24h }: Coin) => (
      <span
        className={
          +price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-600'
        }
      >
        {price_change_percentage_24h && price_change_percentage_24h.toFixed(2)}%
      </span>
    ),
  },
  {
    key: 'market_cap',
    title: 'Mkt Cap',
    cellElem: ({ market_cap }: Coin) => (
      <>
        {getCurrencySign(currency)}
        {market_cap && market_cap.toLocaleString()}
      </>
    ),
  },
  {
    key: 'market_cap',
    title: 'Mkt Cap Change',
    className: 'hidden lg:table-cell',
    cellElem: ({ market_cap_change_percentage_24h }: Coin) => (
      <span
        className={
          +market_cap_change_percentage_24h < 0
            ? 'text-red-500'
            : 'text-green-600'
        }
      >
        {market_cap_change_percentage_24h &&
          market_cap_change_percentage_24h.toLocaleString()}
        %
      </span>
    ),
  },
  {
    title: '',
    cellElem: ({ id }: Coin) => (
      <Link
        href={'/' + id}
        className='text-blue-500 underline whitespace-nowrap'
      >
        View Chart
      </Link>
    ),
  },
];

export default tableCols;
