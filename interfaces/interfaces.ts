interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  market_cap_change_percentage_24h: number;
  price_change_percentage_24h: number;
}

export type { Coin };