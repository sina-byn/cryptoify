import { useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';

// * hooks
import useAxios from '../hooks/useAxios';

// * components
import Table from '../components/Table';
import Select from '../components/Select';

// * configs
import tableCols from '../configs/CoinsTable.config';

// * interfaces
import type { Coin } from '../interfaces/interfaces';

interface HomePageProps {
  coinsData: CoinsData;
}

type CoinsData = Coin[];

const Home: NextPage<HomePageProps> = ({ coinsData }) => {
  const [coins, setCoins] = useState<CoinsData>(coinsData);
  const [query, setQuery] = useState<string>('');
  const [currency, setCurrency] = useState<string>('usd');
  const [perPage, setPerPage] = useState<string>('100');
  const filteredCoins = coins.filter(({ symbol, name }) => {
    const searchQuery = query.toLowerCase();
    return (
      symbol.toLowerCase().includes(searchQuery) ||
      name.toLowerCase().includes(searchQuery)
    );
  });

  const axios = useAxios<CoinsData>();

  const { loading, error } = axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false`,
    {
      ssr: true,
      setState: setCoins,
      dependencies: [currency, perPage],
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
        <div className='table-controls flex items-center gap-x-6 sticky top-0 z-20 bg-white py-6 px-4 md:px-16 lg:px-32'>
          <Select
            label='currency'
            value={currency}
            setValue={setCurrency}
            options={['usd', 'eur', 'gbp']}
          />
          <Select
            label='per-page'
            value={perPage}
            setValue={setPerPage}
            options={['50', '100', '150', '200', '250']}
          />
        </div>
        <Table<Coin>
          cols={tableCols}
          rows={filteredCoins}
          loading={loading}
          className='md:px-16 lg:px-32'
          headClassName='top-20'
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
