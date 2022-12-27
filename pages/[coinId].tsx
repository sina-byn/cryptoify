import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

// * hooks
import useAxios from '../hooks/useAxios';

// * configs
import tableRows from '../configs/CoinTable.config';

// * components
import Chart from '../components/Chart';
import Table from '../components/Table';

// * interfaces
import type { SingleCoinData } from '../interfaces/interfaces';

const Coin: NextPage = () => {
  const [coinData, setCoinData] = useState<SingleCoinData | null>(null);

  const router = useRouter();
  const axios = useAxios<SingleCoinData | null>();

  const coinId = router.query.coinId as string;
  const { loading, error } = axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}`,
    {
      setState: (data: SingleCoinData) => setCoinData(data),
      dependencies: [coinId],
    }
  );

  const cols = [
    { key: 'title', title: '', className: 'text-left' },
    { key: 'value', title: '', className: 'text-left' },
  ];

  if (error) return <div>an error occurred</div>;

  return (
    <>
      <Head>
        <title>{(coinId || 'coin') + ' chart'}</title>
      </Head>
      <header className='flex flex-col items-center gap-y-4 mx-auto py-10'>
        {coinData?.image.large && (
          <Image
            priority
            width={150}
            height={150}
            className='w-40'
            alt={coinData?.name}
            src={coinData?.image.large}
          />
        )}
        <h1 className='text-center text-3xl font-bold'>{coinData?.name}</h1>
      </header>
      <Chart coinId={coinId} />
      <Table cols={cols} rows={tableRows(coinData)} loading={loading} />
    </>
  );
};

export default Coin;
