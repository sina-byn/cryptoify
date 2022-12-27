import type { NextPage } from 'next';
import { useRouter } from 'next/router';

// * components
import Chart from '../components/Chart';

const Coin: NextPage = () => {  
  const router = useRouter();
  const coinId = router.query.coinId as string;

  return (
    <Chart coinId={coinId} />
  );
};

export default Coin;
