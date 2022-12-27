import { FC, useState } from 'react';

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

// * interfaces
interface ChartProps {
  coinId: string;
}

interface ChartData {
  '30d': RangeData;
}

interface ApiData {
  prices: RangeData;
  market_caps: RangeData;
  total_volumes: RangeData;
}

type RangeData = [number, number][];

const Chart: FC<ChartProps> = ({ coinId }) => {
  const [chartData, setChartData] = useState<ChartData>({
    '30d': [],
  });
  
  const axios = useAxios<ChartData>();

  axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`,
    {
      setState: (data: ApiData) => {
        setChartData(prev => ({ ...prev, '30d': data.prices }));
      },
      dependencies: [coinId],
    }
  );

  return (
    <div className='chart h-[50vh]'>
      <ResponsiveContainer width='100%' height='100%' debounce={300}>
        <AreaChart
          data={formatChartData(chartData['30d'])}
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
  );
};

export default Chart;
