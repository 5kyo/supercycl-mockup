export interface Position {
  readonly id: string;
  readonly coin: string;
  readonly side: "Long" | "Short";
  readonly leverage: number;
  readonly size: number;
  readonly sizeUnit: string;
  readonly margin: number;
  readonly entryPrice: number;
  readonly markPrice: number;
  readonly liqPrice: number;
  readonly pnl: number;
  readonly pnlPercent: number;
  readonly unrealizedPnl: number;
  readonly tp: number | null;
  readonly sl: number | null;
  readonly isAuto: boolean;
}

export interface OpenOrder {
  readonly id: string;
  readonly coin: string;
  readonly symbol: string;
  readonly side: "Long" | "Short";
  readonly limitPrice: number;
  readonly size: number;
  readonly leverage: number;
  readonly createdAt: number;
}

export const DEFAULT_POSITIONS: readonly Position[] = [
  {
    id: "pos-1",
    coin: "XRPUSDT",
    side: "Short",
    leverage: 2,
    size: 0.0004,
    sizeUnit: "XRP",
    margin: 27.47,
    entryPrice: 2.83,
    markPrice: 2.9,
    liqPrice: 3.5,
    pnl: -3.2,
    pnlPercent: -7.4,
    unrealizedPnl: -70,
    tp: 2.65,
    sl: 3.1,
    isAuto: true,
  },
  {
    id: "pos-2",
    coin: "BTCUSDT",
    side: "Long",
    leverage: 2,
    size: 0.0004,
    sizeUnit: "BTC",
    margin: 27.47,
    entryPrice: 94677,
    markPrice: 95200,
    liqPrice: 47338,
    pnl: 3.4,
    pnlPercent: 8.2,
    unrealizedPnl: 10,
    tp: 96500,
    sl: 93000,
    isAuto: true,
  },
] as const;
