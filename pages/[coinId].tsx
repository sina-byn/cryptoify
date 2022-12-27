import type { NextPage } from 'next';
import { useRouter } from 'next/router';

// * hooks
import useAxios from '../hooks/useAxios';

// * configs
import tableRows from '../configs/CoinTable.config';

// * components
import Chart from '../components/Chart';
import Table from '../components/Table';
import { useState } from 'react';

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
      setState: data => setCoinData(data),
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
      <Chart coinId={coinId} />
      <Table cols={cols} rows={tableRows(coinData)} loading={loading} />
    </>
  );
};

export default Coin;
