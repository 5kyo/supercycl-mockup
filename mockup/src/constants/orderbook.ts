export interface OrderbookRow {
  readonly price: number;
  readonly size: number;
  readonly total: number;
}

export const ASKS: readonly OrderbookRow[] = [
  { price: 94900, size: 0.3, total: 0.3 },
  { price: 94850, size: 0.8, total: 1.1 },
  { price: 94800, size: 1.5, total: 2.6 },
  { price: 94750, size: 0.6, total: 3.2 },
  { price: 94700, size: 2.1, total: 5.3 },
] as const;

export const BIDS: readonly OrderbookRow[] = [
  { price: 94650, size: 1.8, total: 1.8 },
  { price: 94600, size: 0.9, total: 2.7 },
  { price: 94550, size: 2.3, total: 5.0 },
  { price: 94500, size: 0.5, total: 5.5 },
  { price: 94450, size: 1.2, total: 6.7 },
] as const;

export const SPREAD_PRICE = 94677;
