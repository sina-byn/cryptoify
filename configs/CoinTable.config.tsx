// * interfaces
import type { SingleCoinData } from '../interfaces/interfaces';

interface RowData {
  title: string;
  key: string;
  wrapper?: null | Function;
}

const defaultWrapper = (value: string | number) => `$${value.toLocaleString()}`;
const percentWrapper= (value: string | number) => `${value.toLocaleString()}%`;

const tableRows = (data: SingleCoinData | null) => {
  if (data == null) return [];

  const rowsData: RowData[] = [
    { title: 'market cap rank', key: 'market_data.market_cap_rank', wrapper: null },
    { title: 'coin', key: 'name', wrapper: null },
    { title: 'symbol', key: 'symbol', wrapper: null },
    { title: 'current price', key: 'market_data.current_price.usd' },
    { title: 'market cap', key: 'market_data.market_cap.usd' },
    { title: 'total volume', key: 'market_data.total_volume.usd' },
    { title: 'ath', key: 'market_data.ath.usd' },
    { title: 'atl', key: 'market_data.atl.usd' },
    { title: 'high 24h', key: 'market_data.high_24h.usd' },
    { title: 'low 24h', key: 'market_data.low_24h.usd' },
    { title: 'price change - 24h', key: 'market_data.price_change_percentage_24h_in_currency.usd', wrapper: percentWrapper },
    { title: 'price change - 7d', key: 'market_data.price_change_percentage_7d_in_currency.usd', wrapper: percentWrapper },
    { title: 'price change - 30d', key: 'market_data.price_change_percentage_30d_in_currency.usd', wrapper: percentWrapper },
    { title: 'price change - 1y', key: 'market_data.price_change_percentage_1y_in_currency.usd', wrapper: percentWrapper },
  ];

  return rowsData.map(({title, key, wrapper = defaultWrapper}) => {
    const keyChunks = key.split('.');
    let currValue = data;

    for (let i = 0; i < keyChunks.length; i++) {
      const key = keyChunks[i];
      // @ts-ignore
      currValue = currValue[key];
    }

    return {
      title: title,
      value: wrapper ? wrapper(currValue) : currValue,
    };
  });
};

export default tableRows;
