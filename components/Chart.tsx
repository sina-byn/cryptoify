import { FC, MouseEvent, useState } from 'react';

// * recharts
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

// * hooks
import useAxios from '../hooks/useAxios';

// * utils
import { formatChartData } from '../utils/functions';
import Button from './Button';

// * interfaces
interface ChartProps {
  coinId: string;
}

interface ChartData {
  '24h': RangeData;
  '7d': RangeData;
  '30d': RangeData;
  '1y': RangeData;
}

interface ApiData {
  prices: RangeData;
  market_caps: RangeData;
  total_volumes: RangeData;
}

type RangeData = [number, number][];

type Timeframe = '24h' | '7d' | '30d' | '1y';

const timeframes: Timeframe[] = ['24h', '7d', '30d', '1y'];

const Chart: FC<ChartProps> = ({ coinId }) => {
  const axios = useAxios<ApiData>();
  const [chartData, setChartData] = useState<ChartData>({
    '24h': [],
    '7d': [],
    '30d': [],
    '1y': [],
  });
  const [timeframe, setTimeframe] = useState<Timeframe>('24h');

  const timeFrameChangeHandler = (e: MouseEvent) => {
    const targetBtn = e.target as HTMLElement;
    const timeframe = targetBtn.dataset.timeframe;
    setTimeframe(timeframe as Timeframe);
  };

  axios.get_all(
    [
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`,
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`,
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=365`,
    ],
    {
      setState: (data: ApiData[]) => {
        setChartData(prev => {
          const prevData = { ...prev };
          Object.keys(prevData).forEach(
            // @ts-ignore
            (key, idx) => (prevData[key] = data[idx].prices)
          );
          return prevData;
        });
      },
      dependencies: [coinId],
      revalidation: { revalidate: true },
    }
  );

  return (
    <>
      <div className='chart h-[50vh]'>
        <ResponsiveContainer width='100%' height='100%' debounce={300}>
          <AreaChart
            data={formatChartData(chartData[timeframe])}
            margin={{ top: 5, right: 30, bottom: 5 }}
          >
            <defs>
              <linearGradient id='chart-gradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey='date' />
            <YAxis domain={['auto', 'auto']} />
            <Area
              dot={false}
              dataKey='price'
              type='monotone'
              stroke='#8884d8'
              fillOpacity={1}
              fill='url(#chart-gradient)'
            />
            <Legend />
            <CartesianGrid />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className='timeframe-controls flex items-center justify-center gap-6 pt-3'>
        {timeframes.map(range => (
          <Button
            key={range}
            data-timeframe={range}
            onClick={timeFrameChangeHandler}
            className={`
              text-gray-200 px-4 rounded-full hover:bg-blue-600
              ${range === timeframe ? 'bg-blue-900' : 'bg-blue-500'}
            `}
          >
            {range}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Chart;
