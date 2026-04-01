export interface Signal {
  readonly id: string;
  readonly coin: string;
  readonly pair: string;
  readonly direction: "LONG" | "SHORT";
  readonly entryPrice: number;
  readonly targetPrice: number;
  readonly stopLoss: number;
  readonly leverage: number;
  readonly confidence: "HIGH" | "MEDIUM" | "LOW";
  readonly reasoning: string;
  readonly timestamp: string;
  readonly status: "ACTIVE" | "HIT_TP" | "HIT_SL" | "EXPIRED" | "CANCELLED";
  readonly pnlPercent?: number;
}

export type SignalFilter = "ALL" | "LONG" | "SHORT" | "ACTIVE" | "CLOSED";

export interface SignalState {
  readonly signals: readonly Signal[];
  readonly unreadCount: number;
  readonly filter: SignalFilter;
}

export interface SignalPrefill {
  readonly coinSymbol: string;
  readonly price: number;
  readonly leverage: number;
  readonly tp: number;
  readonly sl: number;
  readonly side: "Long" | "Short";
}

export const SIGNAL_STATS = {
  hitCount: 23,
  missCount: 7,
  expiredCount: 2,
  avgPnlPercent: 1.82,
  hitRate: 71.9,
} as const;

export const MOCK_SIGNALS: readonly Signal[] = [
  {
    id: "sig-001",
    coin: "BTC",
    pair: "BTC-USDC",
    direction: "LONG",
    entryPrice: 94200,
    targetPrice: 96800,
    stopLoss: 92500,
    leverage: 2,
    confidence: "HIGH",
    reasoning: "BTC 4H bullish divergence confirmed, support bounce",
    timestamp: "2026-03-31T14:30:00Z",
    status: "ACTIVE",
  },
  {
    id: "sig-002",
    coin: "SOL",
    pair: "SOL-USDC",
    direction: "SHORT",
    entryPrice: 178.5,
    targetPrice: 170.0,
    stopLoss: 183.0,
    leverage: 2,
    confidence: "MEDIUM",
    reasoning: "Overbought RSI + approaching daily resistance",
    timestamp: "2026-03-31T14:15:00Z",
    status: "ACTIVE",
  },
  {
    id: "sig-003",
    coin: "ETH",
    pair: "ETH-USDC",
    direction: "LONG",
    entryPrice: 2650,
    targetPrice: 2720,
    stopLoss: 2610,
    leverage: 2,
    confidence: "HIGH",
    reasoning: "ETH/BTC ratio bottom confirmed, volume rising",
    timestamp: "2026-03-31T13:00:00Z",
    status: "HIT_TP",
    pnlPercent: 2.64,
  },
  {
    id: "sig-004",
    coin: "DOGE",
    pair: "DOGE-USDC",
    direction: "LONG",
    entryPrice: 0.182,
    targetPrice: 0.195,
    stopLoss: 0.174,
    leverage: 1,
    confidence: "LOW",
    reasoning: "Meme coin momentum, social media trending",
    timestamp: "2026-03-31T11:00:00Z",
    status: "HIT_SL",
    pnlPercent: -4.40,
  },
  {
    id: "sig-005",
    coin: "ARB",
    pair: "ARB-USDC",
    direction: "SHORT",
    entryPrice: 1.12,
    targetPrice: 1.02,
    stopLoss: 1.18,
    leverage: 2,
    confidence: "MEDIUM",
    reasoning: "L2 token bearish trend, unlock schedule imminent",
    timestamp: "2026-03-31T09:00:00Z",
    status: "EXPIRED",
  },
];

export const INITIAL_SIGNAL_STATE: SignalState = {
  signals: MOCK_SIGNALS,
  unreadCount: 2,
  filter: "ALL",
};
