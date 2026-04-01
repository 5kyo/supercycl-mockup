import { createContext, useContext, useReducer, type ReactNode } from "react";
import { type Position, DEFAULT_POSITIONS } from "../constants/positions";
import { DEFAULT_COIN, COINS, type Coin } from "../constants/coins";
import { DEFAULT_TP_PERCENT, DEFAULT_SL_PERCENT, DEFAULT_LEVERAGE } from "../constants/defaults";
import { type SignalState, type SignalFilter, type SignalPrefill, INITIAL_SIGNAL_STATE } from "../constants/signals";

export type TabKey = "trade" | "signal" | "portfolio" | "settings";

export interface AppState {
  readonly isLoggedIn: boolean;
  readonly hasAcceptedTerms: boolean;
  readonly hasCompletedOnboarding: boolean;
  readonly hasSeenLeverageNotice: boolean;

  readonly selectedCoin: Coin;
  readonly leverage: number;
  readonly orderType: "limit" | "market" | "conditional";

  readonly autoTpSlEnabled: boolean;
  readonly takeProfitPercent: number;
  readonly stopLossPercent: number;

  readonly positions: readonly Position[];
  readonly activeTab: TabKey;
  readonly toastMessage: string | null;

  readonly signalState: SignalState;
  readonly prefillData: SignalPrefill | null;
}

const initialState: AppState = {
  isLoggedIn: false,
  hasAcceptedTerms: false,
  hasCompletedOnboarding: false,
  hasSeenLeverageNotice: false,

  selectedCoin: DEFAULT_COIN,
  leverage: DEFAULT_LEVERAGE,
  orderType: "market",

  autoTpSlEnabled: true,
  takeProfitPercent: DEFAULT_TP_PERCENT,
  stopLossPercent: DEFAULT_SL_PERCENT,

  positions: [...DEFAULT_POSITIONS],
  activeTab: "trade",
  toastMessage: null,

  signalState: INITIAL_SIGNAL_STATE,
  prefillData: null,
};

type Action =
  | { type: "LOGIN" }
  | { type: "ACCEPT_TERMS" }
  | { type: "COMPLETE_ONBOARDING" }
  | { type: "DISMISS_LEVERAGE_NOTICE" }
  | { type: "SELECT_COIN"; coin: Coin }
  | { type: "SET_LEVERAGE"; leverage: number }
  | { type: "SET_ORDER_TYPE"; orderType: "limit" | "market" | "conditional" }
  | { type: "UPDATE_TP_SL"; tp: number; sl: number }
  | { type: "TOGGLE_AUTO_TP_SL" }
  | { type: "PLACE_ORDER"; side: "Long" | "Short" }
  | { type: "SET_TAB"; tab: TabKey }
  | { type: "SHOW_TOAST"; message: string }
  | { type: "HIDE_TOAST" }
  | { type: "SET_SIGNAL_FILTER"; filter: SignalFilter }
  | { type: "MARK_SIGNALS_READ" }
  | { type: "EXECUTE_SIGNAL_ORDER"; signalId: string }
  | { type: "PREFILL_FROM_SIGNAL"; prefill: SignalPrefill }
  | { type: "CLEAR_PREFILL" }
  | { type: "JUMP_TO_SCENARIO"; overrides: Partial<AppState> };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true };
    case "ACCEPT_TERMS":
      return { ...state, hasAcceptedTerms: true };
    case "COMPLETE_ONBOARDING":
      return { ...state, hasCompletedOnboarding: true };
    case "DISMISS_LEVERAGE_NOTICE":
      return { ...state, hasSeenLeverageNotice: true };
    case "SELECT_COIN":
      return { ...state, selectedCoin: action.coin };
    case "SET_LEVERAGE":
      return { ...state, leverage: action.leverage };
    case "SET_ORDER_TYPE":
      return { ...state, orderType: action.orderType };
    case "UPDATE_TP_SL":
      return {
        ...state,
        takeProfitPercent: action.tp,
        stopLossPercent: action.sl,
        autoTpSlEnabled: true,
      };
    case "TOGGLE_AUTO_TP_SL":
      return { ...state, autoTpSlEnabled: !state.autoTpSlEnabled };
    case "PLACE_ORDER": {
      const coin = state.selectedCoin;
      const pnlSign = action.side === "Long" ? 1 : -1;
      const pnlAmount = Math.round((Math.random() * 200 - 50) * 100) / 100;
      const entryPrice = state.prefillData ? state.prefillData.price : coin.price;
      const markPrice = entryPrice + pnlSign * Math.abs(pnlAmount);
      const newPosition: Position = {
        id: `pos-${Date.now()}`,
        coin: `${coin.symbol}USDT`,
        side: action.side,
        size: 0.01,
        sizeUnit: coin.symbol,
        entryPrice,
        markPrice,
        pnl: pnlAmount,
        pnlPercent: Math.round((pnlAmount / entryPrice) * 10000) / 100,
        tp: state.autoTpSlEnabled
          ? Math.round(entryPrice * (1 + (pnlSign * state.takeProfitPercent) / 100) * 100) / 100
          : null,
        sl: state.autoTpSlEnabled
          ? Math.round(entryPrice * (1 - (pnlSign * state.stopLossPercent) / 100) * 100) / 100
          : null,
        isAuto: state.autoTpSlEnabled,
      };
      return { ...state, positions: [...state.positions, newPosition] };
    }
    case "SET_TAB":
      return { ...state, activeTab: action.tab };
    case "SHOW_TOAST":
      return { ...state, toastMessage: action.message };
    case "HIDE_TOAST":
      return { ...state, toastMessage: null };
    case "SET_SIGNAL_FILTER":
      return {
        ...state,
        signalState: { ...state.signalState, filter: action.filter },
      };
    case "MARK_SIGNALS_READ":
      return {
        ...state,
        signalState: { ...state.signalState, unreadCount: 0 },
      };
    case "EXECUTE_SIGNAL_ORDER": {
      const signal = state.signalState.signals.find((s) => s.id === action.signalId);
      if (!signal) return state;
      const coin = COINS.find((c) => c.symbol === signal.coin) ?? state.selectedCoin;
      const side: "Long" | "Short" = signal.direction === "LONG" ? "Long" : "Short";
      const pnlSign = side === "Long" ? 1 : -1;
      const pnlAmount = Math.round((Math.random() * 200 - 50) * 100) / 100;
      const newPosition: Position = {
        id: `pos-${Date.now()}`,
        coin: `${coin.symbol}USDT`,
        side,
        size: 0.01,
        sizeUnit: coin.symbol,
        entryPrice: signal.entryPrice,
        markPrice: signal.entryPrice + pnlSign * Math.abs(pnlAmount),
        pnl: pnlAmount,
        pnlPercent: Math.round((pnlAmount / signal.entryPrice) * 10000) / 100,
        tp: signal.targetPrice,
        sl: signal.stopLoss,
        isAuto: true,
      };
      return {
        ...state,
        selectedCoin: coin,
        leverage: signal.leverage,
        positions: [...state.positions, newPosition],
        activeTab: "trade",
      };
    }
    case "PREFILL_FROM_SIGNAL": {
      const coin = COINS.find((c) => c.symbol === action.prefill.coinSymbol) ?? state.selectedCoin;
      return {
        ...state,
        selectedCoin: coin,
        leverage: action.prefill.leverage,
        orderType: "limit",
        activeTab: "trade",
        prefillData: action.prefill,
      };
    }
    case "CLEAR_PREFILL":
      return { ...state, prefillData: null };
    case "JUMP_TO_SCENARIO":
      return {
        ...initialState,
        ...action.overrides,
        signalState: {
          ...initialState.signalState,
          ...(action.overrides.signalState ?? {}),
        },
      };
    default:
      return state;
  }
}

interface AppContextValue {
  readonly state: AppState;
  readonly dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
