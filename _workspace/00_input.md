# Design System Input

## Brand Information
- **App Name**: Supercycl
- **Domain**: Crypto trading mobile mockup
- **Theme**: Dark-only (`--bg-primary: #050505`)
- **Primary Color**: Green (`#00ff6a`, `#37ff00`, `#00de0b`)
- **Error/Sell Color**: Red (`#ff5938`)
- **Warning Color**: Yellow (`#f0b90b`)
- **Info Color**: Blue (`#4285f4`)
- **Tone**: Technical, precise, high-contrast dark UI

## Framework
- React 19 + TypeScript 5.9 + Vite 8
- Inline CSS (`CSSProperties`) — no Tailwind, no CSS modules
- 360px fixed-width, mobile-only

## Existing Assets
- **Tokens**: `src/styles/global.css` (CSS variables, not formalized into 3-tier)
- **Animations**: `src/styles/animations.css` (16 keyframes)
- **Design Spec**: `DesignSystem.md` (informal documentation)
- **Components**: 22 components across common/, trading/, modals/, layout/, canvas/

## Component Scope
Full system — formalize all existing components:

### Common (6)
- Button (7 variants: primary, secondary, google, buy, sell, danger, ghost)
- Modal (backdrop + panel)
- BottomSheet (slide-up, handle bar)
- Toast (auto-dismiss 3s)
- Header (logo + testnet badge)
- Logo

### Trading (6)
- Chart, OrderForm, Orderbook, Dashboard, PositionCard, SignalCard, CoinInfoBar

### Modals (5)
- CoinSelector, AdjustLeverage, AutoTpSlModal, LeverageNotice, SignalOrderSheet

### Layout (1)
- BottomNav (4 tabs: Trade, Signal, Portfolio, Settings)

### Canvas (2)
- PlasmaOrb, WaveCanvas (WebGL/Three.js)

## Accessibility Level
- WCAG 2.1 AA

## Typography
- Primary: IBM Plex Sans
- Korean: Noto Sans KR
- Monospace: IBM Plex Sans, SF Mono, Menlo

## Key Design Tokens (Current)
- Font sizes: 8px, 9px, 10px, 11px, 12px, 13px, 14px, 16px
- Spacing base: 4px (6, 8, 10, 12, 14, 16, 20, 24)
- Border radius: 2-4px (inputs), 6px (sm), 10px (md), 16px (lg), 20px (xl), 9999px (full)
- Z-index: 0 (base), 50 (nav), 100 (modal), 101 (sheet), 200 (toast)
