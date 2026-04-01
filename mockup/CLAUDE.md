# Supercycl Mockup

Crypto trading mobile mockup app (360px fixed-width, mobile-only).

## Tech Stack

- React 19 + TypeScript 5.9 + Vite 8
- Three.js (WebGL canvas effects)
- React Router DOM 7 (BrowserRouter, basename: `/supercycl-mockup`)
- Inline CSS (`CSSProperties`) — no Tailwind, no CSS modules

## Commands

```bash
cd mockup
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Directory Structure

```
src/
├── pages/            # Route-level components (*Page.tsx)
├── components/
│   ├── common/       # Button, Modal, BottomSheet, Header, Toast, Logo
│   ├── trading/      # Chart, OrderForm, Orderbook, Dashboard, PositionCard, SignalCard
│   ├── modals/       # CoinSelector, AdjustLeverage, AutoTpSlModal, SignalOrderSheet
│   ├── layout/       # BottomNav
│   └── canvas/       # PlasmaOrb, WaveCanvas, ShaderProgram
├── context/          # AppContext (useReducer state management)
├── constants/        # Static data (coins, positions, signals, defaults)
├── hooks/            # Custom hooks
└── styles/           # global.css (CSS variables, reset), animations.css
```

## Routing

| Path | Page | Description |
|------|------|-------------|
| `/` | LandingPage | Landing with PlasmaOrb |
| `/login` | LoginPage | Google OAuth mock |
| `/terms` | TermsPage | Terms acceptance |
| `/onboarding` | OnboardingPage | Wallet setup |
| `/trade` | TradingPage | Main app (tab-based sub-views) |

TradingPage uses `activeTab` state for sub-views: `trade`, `signal`, `portfolio`, `settings`.

## State Management

Single `AppContext` with `useReducer`. Access via `useApp()` hook.

Key state: `selectedCoin`, `leverage`, `orderType`, `positions`, `activeTab`, `signalState`, `autoTpSlEnabled`, `prefillData`.

Actions: `LOGIN`, `SELECT_COIN`, `SET_LEVERAGE`, `SET_ORDER_TYPE`, `PLACE_ORDER`, `CLOSE_POSITION`, `SET_TAB`, `SHOW_TOAST`, `UPDATE_TP_SL`, `PREFILL_FROM_SIGNAL`, `EXECUTE_SIGNAL_ORDER`, etc.

## Code Conventions

- **Styling**: Inline `CSSProperties` objects defined as constants at file top. No className-based styling.
- **Naming**: PascalCase components, `*Page.tsx` for pages, `*.ts` for non-JSX.
- **Props**: Always use `readonly` modifier. Use `interface Props` naming.
- **State**: Immutable updates only (`{ ...state, field: newValue }`). All state fields are `readonly`.
- **Exports**: `export default function ComponentName` for components.
- **Imports**: `import type` for type-only imports.
- **Layout**: All components target 360px max-width. Use flexbox for layout.

## Deployment

GitHub Pages via `.github/workflows/deploy.yml`. Pushes to `main` trigger auto-deploy.
Base path: `/supercycl-mockup/` (set in both `vite.config.ts` and BrowserRouter `basename`).

## Important Notes

- 360px mobile-only — no responsive breakpoints, no media queries
- Dark theme only (`--bg-primary: #050505`)
- Design tokens are in `src/styles/global.css` as CSS variables
- Animations defined in `src/styles/animations.css`
- See `DesignSystem.md` for full design token reference
