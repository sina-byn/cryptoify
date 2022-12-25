import { useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';

// * hooks
import useAxios from '../hooks/useAxios';

// * components
import Table from '../components/Table';
import Select from '../components/Select';
import SearchBox from '../components/SearchBox';

// * configs
import tableCols from '../configs/CoinsTable.config';

// * interfaces
import type { Coin } from '../interfaces/interfaces';
import Pagination from '../components/Pagination';

interface HomePageProps {
  coinsData: CoinsData;
}

type CoinsData = Coin[];

const Home: NextPage<HomePageProps> = ({ coinsData }) => {
  const [coins, setCoins] = useState<CoinsData>(coinsData);
  const [query, setQuery] = useState<string>('');
  const [currency, setCurrency] = useState<string>('usd');
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(100);
  const filteredCoins = coins.filter(({ symbol, name }) => {
    const searchQuery = query.toLowerCase();
    return (
      symbol.toLowerCase().includes(searchQuery) ||
      name.toLowerCase().includes(searchQuery)
    );
  });

  const axios = useAxios<CoinsData>();

  const { loading, error } = axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`,
    {
      ssr: true,
      setState: setCoins,
      dependencies: [currency, page, perPage],
      revalidation: { revalidate: true },
    }
  );

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <Head>
        <title>Cryptoify</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content='a web-app for you to keep track of prices in the crypto world'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='app-container'>
        <div className='table-controls flex flex-col md:grid grid-cols-2 grid-rows-2 gap-y-3 sticky top-0 z-20 bg-white py-4 md:py-6 px-4 md:px-16 lg:px-32'>
          <SearchBox
            value={query}
            setValue={setQuery}
            placeholder='symbol, name'
          />
          <div className='controls-right flex flex-col sm:flex-row md:justify-end gap-y-3 gap-x-6'>
            <Select<string>
              label='currency'
              value={currency}
              setValue={setCurrency}
              options={['usd', 'eur', 'gbp']}
            />
            <Select<number>
              label='per-page'
              value={perPage}
              setValue={setPerPage}
              options={['50', '100', '150', '200', '250']}
            />
          </div>
          <Pagination page={page} perPage={perPage} setPage={setPage} />
        </div>
        <Table<Coin>
          cols={tableCols(currency)}
          rows={filteredCoins}
          loading={loading}
          className='md:px-16 lg:px-32'
          headClassName='top-[7rem]'
        />
      </main>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  );
  const data = await res.json();

  return {
    props: {
      coinsData: data,
    },
  };
}

export default Home;
