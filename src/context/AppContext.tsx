import { createContext, useContext, useReducer, type ReactNode } from "react";
import { type Position, type OpenOrder, DEFAULT_POSITIONS } from "../constants/positions";
import { DEFAULT_COIN, COINS, type Coin } from "../constants/coins";
import { DEFAULT_TP_PERCENT, DEFAULT_SL_PERCENT, DEFAULT_LEVERAGE } from "../constants/defaults";
import { type SignalState, type SignalFilter, type SignalPrefill, INITIAL_SIGNAL_STATE } from "../constants/signals";
import type { Language } from "../i18n/types";

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
  readonly openOrders: readonly OpenOrder[];
  readonly activeTab: TabKey;
  readonly toastMessage: string | null;

  readonly signalState: SignalState;
  readonly prefillData: SignalPrefill | null;

  readonly language: Language;
}

function getInitialLanguage(): Language {
  const stored = localStorage.getItem("supercycl-language");
  return stored === "ko" ? "ko" : "en";
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
  openOrders: [],
  activeTab: "trade",
  toastMessage: null,

  signalState: INITIAL_SIGNAL_STATE,
  prefillData: null,

  language: getInitialLanguage(),
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
  | { type: "PLACE_ORDER"; side: "Long" | "Short"; orderType: "limit" | "market" | "conditional"; limitPrice: number; size: number }
  | { type: "SET_TAB"; tab: TabKey }
  | { type: "SHOW_TOAST"; message: string }
  | { type: "HIDE_TOAST" }
  | { type: "SET_SIGNAL_FILTER"; filter: SignalFilter }
  | { type: "MARK_SIGNALS_READ" }
  | { type: "EXECUTE_SIGNAL_ORDER"; signalId: string; orderType: "limit" | "market"; leverage: number }
  | { type: "PREFILL_FROM_SIGNAL"; prefill: SignalPrefill }
  | { type: "CLEAR_PREFILL" }
  | { type: "CLOSE_POSITION"; id: string }
  | { type: "CANCEL_ORDER"; orderId: string }
  | { type: "SET_LANGUAGE"; language: Language }
;

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
      const entryPrice = state.prefillData ? state.prefillData.price : coin.price;

      if (action.orderType === "limit") {
        const newOrder: OpenOrder = {
          id: `ord-${Date.now()}`,
          coin: `${coin.symbol}USDT`,
          symbol: coin.symbol,
          side: action.side,
          limitPrice: action.limitPrice,
          size: action.size,
          leverage: state.leverage,
          createdAt: Date.now(),
        };
        return { ...state, openOrders: [...state.openOrders, newOrder] };
      }

      const pnlSign = action.side === "Long" ? 1 : -1;
      const pnlAmount = Math.round((Math.random() * 200 - 50) * 100) / 100;
      const markPrice = entryPrice + pnlSign * Math.abs(pnlAmount);
      const newPosition: Position = {
        id: `pos-${Date.now()}`,
        coin: `${coin.symbol}USDT`,
        side: action.side,
        leverage: state.leverage,
        size: action.size,
        sizeUnit: coin.symbol,
        margin: Math.round(entryPrice * action.size / state.leverage * 100) / 100,
        entryPrice,
        markPrice,
        liqPrice: Math.round(entryPrice * (1 - pnlSign * 0.5 / state.leverage) * 100) / 100,
        pnl: pnlAmount,
        pnlPercent: Math.round((pnlAmount / entryPrice) * 10000) / 100,
        unrealizedPnl: pnlAmount,
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
    case "CLOSE_POSITION":
      return { ...state, positions: state.positions.filter((p) => p.id !== action.id) };
    case "CANCEL_ORDER":
      return { ...state, openOrders: state.openOrders.filter((o) => o.id !== action.orderId) };
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

      if (action.orderType === "limit") {
        const newOrder: OpenOrder = {
          id: `ord-${Date.now()}`,
          coin: `${coin.symbol}USDT`,
          symbol: coin.symbol,
          side,
          limitPrice: signal.entryPrice,
          size: 0.01,
          leverage: action.leverage,
          createdAt: Date.now(),
        };
        return {
          ...state,
          selectedCoin: coin,
          leverage: action.leverage,
          openOrders: [...state.openOrders, newOrder],
          activeTab: "trade",
        };
      }

      const pnlSign = side === "Long" ? 1 : -1;
      const pnlAmount = Math.round((Math.random() * 200 - 50) * 100) / 100;
      const newPosition: Position = {
        id: `pos-${Date.now()}`,
        coin: `${coin.symbol}USDT`,
        side,
        leverage: action.leverage,
        size: 0.01,
        sizeUnit: coin.symbol,
        margin: Math.round(signal.entryPrice * 0.01 / action.leverage * 100) / 100,
        entryPrice: signal.entryPrice,
        markPrice: signal.entryPrice + pnlSign * Math.abs(pnlAmount),
        liqPrice: Math.round(signal.entryPrice * (1 - pnlSign * 0.5 / action.leverage) * 100) / 100,
        pnl: pnlAmount,
        pnlPercent: Math.round((pnlAmount / signal.entryPrice) * 10000) / 100,
        unrealizedPnl: pnlAmount,
        tp: signal.targetPrice,
        sl: signal.stopLoss,
        isAuto: true,
      };
      return {
        ...state,
        selectedCoin: coin,
        leverage: action.leverage,
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
    case "SET_LANGUAGE":
      localStorage.setItem("supercycl-language", action.language);
      return { ...state, language: action.language };
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
