import { useState } from "react";
import { useApp } from "../context/AppContext";
import Header from "../components/common/Header";
import CoinInfoBar from "../components/trading/CoinInfoBar";
import Chart from "../components/trading/Chart";
import Orderbook from "../components/trading/Orderbook";
import OrderForm from "../components/trading/OrderForm";
import Dashboard from "../components/trading/Dashboard";
import BottomNav from "../components/layout/BottomNav";
import Toast from "../components/common/Toast";
import AdjustLeverage from "../components/modals/AdjustLeverage";
import AutoTpSlModal from "../components/modals/AutoTpSlModal";
import CoinSelector from "../components/modals/CoinSelector";
import SettingsPage from "./SettingsPage";
import SignalPage from "./SignalPage";
import PortfolioPage from "./PortfolioPage";
import type { CSSProperties } from "react";

const wrapper: CSSProperties = {
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  background: "#050505",
  animation: "fadeIn 0.3s ease-out",
};

const scrollArea: CSSProperties = {
  flex: 1,
  overflowY: "auto",
  paddingBottom: "64px",
};

const splitLayout: CSSProperties = {
  display: "flex",
  gap: "8px",
  padding: "0 16px",
};

export default function TradingPage() {
  const { state } = useApp();
  const [showLeverage, setShowLeverage] = useState(false);
  const [showTpSl, setShowTpSl] = useState(false);
  const [showCoinSelector, setShowCoinSelector] = useState(false);

  const isTrade = state.activeTab === "trade";
  const isSignal = state.activeTab === "signal";

  return (
    <div style={wrapper}>
      {/* Header */}
      <Header />

      {/* Top bar - only on trade tab */}
      {isTrade && (
        <CoinInfoBar onCoinSelect={() => setShowCoinSelector(true)} />
      )}

      {/* Scrollable content */}
      <div style={scrollArea}>
        {isTrade && (
          <>
            <Chart />
            <div style={splitLayout}>
              <div style={{ flex: "0 0 170px", width: "170px", maxWidth: "170px", minWidth: 0, overflow: "hidden", position: "relative" }}>
                <OrderForm
                  onLeverageTap={() => setShowLeverage(true)}
                  onTpSlEdit={() => setShowTpSl(true)}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Orderbook />
              </div>
            </div>
            <Dashboard />
          </>
        )}

        {isSignal && <SignalPage />}

        {state.activeTab === "portfolio" && <PortfolioPage />}

        {state.activeTab === "settings" && (
          <SettingsPage onTpSlEdit={() => setShowTpSl(true)} />
        )}
      </div>

      <BottomNav />

      {showLeverage && <AdjustLeverage onClose={() => setShowLeverage(false)} />}
      {showTpSl && <AutoTpSlModal onClose={() => setShowTpSl(false)} />}
      {showCoinSelector && <CoinSelector onClose={() => setShowCoinSelector(false)} />}

      <Toast />
    </div>
  );
}
