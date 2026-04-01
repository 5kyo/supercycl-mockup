import { useState } from "react";
import type { CSSProperties } from "react";
import { asset } from "../../utils/asset";

const container: CSSProperties = {
  width: "100%",
  height: "176px",
  background: "#050505",
  position: "relative",
  overflow: "hidden",
};

const TIME_RANGES = ["3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h"] as const;

export default function Chart() {
  const [range, setRange] = useState<string>("1h");

  return (
    <div style={container}>
      <div style={{
        display: "flex",
        gap: "0",
        padding: "4px 8px",
        overflowX: "auto",
      }}>
        {TIME_RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            style={{
              padding: "4px 6px",
              fontSize: "10px",
              fontWeight: range === r ? 600 : 400,
              color: range === r ? "#fff" : "#666",
              background: range === r ? "#2c2c2c" : "transparent",
              borderRadius: "2px",
              whiteSpace: "nowrap",
            }}
          >
            {r}
          </button>
        ))}
      </div>

      <img
        src={asset("images/chart-candle.png")}
        alt="Chart"
        style={{
          width: "100%",
          height: "calc(100% - 28px)",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
}
