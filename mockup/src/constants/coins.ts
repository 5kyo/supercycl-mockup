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
  { symbol: "DOGE", pair: "DOGE-USDC", price: 0.1823, change24h: 5.8, volume: "180M" },
  { symbol: "ARB", pair: "ARB-USDC", price: 1.12, change24h: -1.5, volume: "95M" },
  { symbol: "AVAX", pair: "AVAX-USDC", price: 35.8, change24h: 0.8, volume: "110M" },
  { symbol: "MATIC", pair: "MATIC-USDC", price: 0.58, change24h: -2.3, volume: "75M" },
  { symbol: "LINK", pair: "LINK-USDC", price: 14.2, change24h: 3.1, volume: "88M" },
] as const;

export const DEFAULT_COIN = COINS[0];
