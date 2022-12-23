import { useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';

// * components
import Table from '../components/Table';
import Select from '../components/Select';

// * configs
import tableCols from '../configs/CoinsTable.config';

// * interfaces
import type { Coin } from '../interfaces/interfaces';

interface HomePageProps {
  coinsData: Coin[];
}

const Home: NextPage<HomePageProps> = ({ coinsData }) => {
  const [currency, setCurrency] = useState<string>('usd');
  const [perPage, setPerPage] = useState<string>('100');

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
        <div className='table-controls flex items-center gap-x-6 py-6 px-4 md:px-16 lg:px-32'>
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
          rows={coinsData}
          className='md:px-16 lg:px-32'
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
