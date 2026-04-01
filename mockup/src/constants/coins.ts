export interface Coin {
  readonly symbol: string;
  readonly pair: string;
  readonly price: number;
  readonly change24h: number;
  readonly volume: string;
}

export const COINS: readonly Coin[] = [
  { symbol: "BTC", pair: "BTC-USDC", price: 94677, change24h: -7.2, volume: "1.2B" },
  { symbol: "ETH", pair: "ETH-USDC", price: 2015, change24h: 2.1, volume: "580M" },
  { symbol: "SOL", pair: "SOL-USDC", price: 148.5, change24h: -3.4, volume: "320M" },
  { symbol: "XRP", pair: "XRP-USDC", price: 2.83, change24h: 1.2, volume: "210M" },
] as const;

export const DEFAULT_COIN = COINS[0];
