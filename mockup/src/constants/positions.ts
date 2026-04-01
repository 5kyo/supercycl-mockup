export interface Position {
  readonly id: string;
  readonly coin: string;
  readonly side: "Long" | "Short";
  readonly size: number;
  readonly sizeUnit: string;
  readonly entryPrice: number;
  readonly markPrice: number;
  readonly pnl: number;
  readonly pnlPercent: number;
  readonly tp: number | null;
  readonly sl: number | null;
  readonly isAuto: boolean;
}

export const DEFAULT_POSITIONS: readonly Position[] = [
  {
    id: "pos-1",
    coin: "ETHUSDT",
    side: "Long",
    size: 10,
    sizeUnit: "ETH",
    entryPrice: 2000,
    markPrice: 2015,
    pnl: 150,
    pnlPercent: 7.5,
    tp: 2036,
    sl: 1900,
    isAuto: true,
  },
] as const;
