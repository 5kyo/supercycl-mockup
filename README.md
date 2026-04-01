# Supercycl Mockup

크립토 트레이딩 모바일 목업 앱 (360px, mobile-only)

**Live Demo**: https://5kyo.github.io/supercycl-mockup/

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build | Vite 8 |
| Routing | React Router DOM 7 |
| 3D/WebGL | Three.js |
| Deploy | GitHub Pages |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── pages/            # Route-level page components
├── components/
│   ├── common/       # Button, Modal, BottomSheet, Header, Toast
│   ├── trading/      # Chart, OrderForm, Orderbook, Dashboard
│   ├── modals/       # CoinSelector, AdjustLeverage, AutoTpSlModal
│   ├── layout/       # BottomNav
│   └── canvas/       # PlasmaOrb, WaveCanvas (WebGL)
├── context/          # AppContext (useReducer 상태 관리)
├── constants/        # 코인, 포지션, 시그널 등 목업 데이터
├── utils/            # asset() 경로 유틸
└── styles/           # CSS variables, animations
```

## Features

- **Landing**: Three.js 기반 PlasmaOrb 3D 비주얼
- **Trading**: 캔들 차트, 주문폼 (지정가/시장가/조건부), 오더북, 포지션 관리
- **Signal**: AI 트레이딩 시그널 목록, 원클릭 주문 실행
- **Portfolio**: 보유 포지션 요약, 총 자산/PnL
- **Auto TP/SL**: 자동 익절/손절 설정
- **Dark Theme**: #050505 기반 다크 모드

## Deployment

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드 및 GitHub Pages에 배포합니다.

## Docs

- [CLAUDE.md](./CLAUDE.md) — 프로젝트 컨벤션 및 개발 가이드
- [DesignSystem.md](./DesignSystem.md) — 디자인 토큰 및 컴포넌트 패턴
