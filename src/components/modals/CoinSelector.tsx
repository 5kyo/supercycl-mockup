import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n";
import { COINS } from "../../constants/coins";
import BottomSheet from "../common/BottomSheet";
import type { CSSProperties } from "react";

const searchInput: CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "var(--bg-input)",
  color: "var(--text-primary)",
  borderRadius: "var(--radius-sm)",
  fontSize: "14px",
  border: "1px solid var(--border-color)",
  marginBottom: "12px",
};

const coinRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 4px",
  borderBottom: "1px solid var(--border-light)",
  cursor: "pointer",
};

interface Props {
  readonly onClose: () => void;
}

export default function CoinSelector({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const { state, dispatch } = useApp();
  const { t } = useTranslation();

  const filtered = COINS.filter((c) =>
    c.symbol.toLowerCase().includes(query.toLowerCase()) ||
    c.pair.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <BottomSheet title={t("coinSelector.title")} onClose={onClose}>
      <input
        style={searchInput}
        type="text"
        placeholder={t("coinSelector.search")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.map((coin) => {
        const isSelected = coin.symbol === state.selectedCoin.symbol;
        const isPositive = coin.change24h >= 0;

        return (
          <div
            key={coin.symbol}
            style={{ ...coinRow, background: isSelected ? "var(--bg-hover)" : "transparent" }}
            onClick={() => {
              dispatch({ type: "SELECT_COIN", coin });
              onClose();
            }}
          >
            <div>
              <span style={{ fontSize: "14px", fontWeight: 600 }}>{coin.pair}</span>
              {isSelected && <span style={{ marginLeft: "6px", fontSize: "10px", color: "var(--accent-purple)" }}>&#9733;</span>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500 }}>${coin.price.toLocaleString()}</span>
              <span style={{
                fontSize: "11px",
                fontWeight: 600,
                color: isPositive ? "var(--accent-green)" : "var(--accent-red)",
                minWidth: "48px",
                textAlign: "right",
              }}>
                {isPositive ? "+" : ""}{coin.change24h}%
              </span>
            </div>
          </div>
        );
      })}
    </BottomSheet>
  );
}
