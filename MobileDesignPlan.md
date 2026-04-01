# Supercycl Mobile - Figma 디자인 반영 계획서

## 개요

Figma 디자인 시안(`Supercycl-mobile`)을 기반으로 현재 React+Vite 목업 코드를 전면 조정한다.
기존 컴포넌트 구조, 상태 관리(AppContext), 라우팅은 유지하되, **시각적 스타일과 레이아웃**을 Figma에 맞춘다.
애니메이션은 기존 코드에 이미 구현된 것을 그대로 유지한다.

---

## Phase 1: 디자인 시스템 업데이트

### 1-1. CSS 변수 (global.css)

| 항목 | 현재 값 | Figma 값 | 비고 |
|------|---------|----------|------|
| `--bg-primary` | `#0a0a0a` | `#050505` | GRAY 50 |
| `--bg-secondary` | `#0b0b0b` | `#050505` | 동일하게 통일 |
| `--bg-card` | `#222222` | `#242424` | GRAY 300 |
| `--bg-input` | `#1a1a1a` | `#1D1D1D` | GRAY 250 |
| `--bg-hover` | `#2a2a2a` | `#2C2C2C` | GRAY 400 |
| `--text-primary` | `#ffffff` | `#FFFFFF` | 유지 |
| `--text-secondary` | `#9f9f9f` | `#9F9F9F` | 유지 |
| `--text-tertiary` | `#4b4b4b` | `#666666` | GRAY 600 (밝아짐) |
| `--accent-green` | `#00d68f` | `#00DE0B` | PRIMARY 200 (형광 초록) |
| `--accent-red` | `#ff4d6a` | `#FF5938` | SECONDARY Red 100 |
| `--color-pri-1` | `#00ff6a` | `#00FF6A` | 유지 |
| `--color-pri-2` | `#37ff00` | `#37FF00` | 유지 |
| `--color-pri-3` | `#00de0b` | `#00DE0B` | 유지 |
| `--border-color` | `#333333` | `#2C2C2C` | GRAY 400 |
| `--border-light` | `#222222` | `#242424` | GRAY 300 |

**신규 변수 추가:**

| 변수 | 값 | 용도 |
|------|-----|------|
| `--gray-100` | `#151515` | 버튼 텍스트 (어두운 배경 위) |
| `--gray-250` | `#1D1D1D` | 입력 필드, 드롭다운 배경 |
| `--gray-300` | `#242424` | 카드, 구분선 |
| `--gray-400` | `#2C2C2C` | 보더, 구분선 |
| `--gray-450` | `#363636` | 비활성 도트, 약한 텍스트 |
| `--gray-500` | `#505050` | 타임스탬프 텍스트 |
| `--gray-600` | `#666666` | 보조 텍스트, 비활성 탭 |
| `--gray-800` | `#E0E0E0` | 강조 보조 텍스트 |

### 1-2. 폰트

| 항목 | 현재 | Figma |
|------|------|-------|
| `--font-family` | `Inter` | `IBM Plex Sans` |
| `--font-mono` | `SF Mono` | `IBM Plex Sans` (숫자도 동일 폰트) |

- `index.html`에 Google Fonts CDN 추가: `IBM Plex Sans` (400, 500, 600, 700)
- `Noto Sans KR` (400, 700) — 한국어 텍스트용 (로그인 모달 등에서 사용)

### 1-3. 뷰포트

| 항목 | 현재 | Figma |
|------|------|-------|
| `#root max-width` | `428px` | `360px` |
| BottomNav `max-width` | `428px` | `360px` |

---

## Phase 2: 공통 컴포넌트 수정

### 2-1. Logo (`components/common/Logo.tsx`)

**현재:** 텍스트 gradient "Supercycl"
**Figma:** SVG 로고 이미지 (`logo_supercycl`) + 아이콘

- Figma에서 로고 에셋을 다운로드하여 `public/` 폴더에 저장
- Logo 컴포넌트를 SVG/이미지 기반으로 교체
- Testnet 배지를 로고 옆에 배치하는 `Header` 컴포넌트 신규 생성

### 2-2. Header (신규: `components/common/Header.tsx`)

**Figma 패턴:** 모든 화면에 공통 헤더 존재

- `header_01`: 로고 + Testnet 배지 (Landing, Terms, Trading) — `px: 20px`, `py: 18px`, `h: 56px`
- `header_02`: X 닫기 버튼만 (Onboarding 완료) — `justify-content: flex-end`
- `header_03`: 로고 + Testnet 배지 (Signal 등) — `p: 16px`
- **없음:** Onboarding 설정 중 화면(Onboarding_04)은 헤더 없이 상태바만 표시

```
[Logo][Testnet Badge]                    ← header_01 (px:20) / header_03 (p:16)
                              [X 닫기]   ← header_02
(상태바만)                               ← Onboarding_04
```

- variant prop으로 구분: `"default"` | `"close"` | `"none"`
- `header_01`과 `header_03`의 차이: padding만 다름 (`px:20/py:18` vs `p:16`)

### 2-3. Button (`components/common/Button.tsx`)

**현재:** 채워진 배경 스타일
**Figma:** 테두리(border) 스타일 버튼이 주요 CTA

| 변경 사항 | 상세 |
|-----------|------|
| `google` variant | `bg: rgba(5,5,5,0.6)`, `border: 1px solid #666`, 둥근모서리 `32px` |
| `primary` variant | 동일 border 스타일로 변경 |
| `buy` variant | `bg: #00DE0B`, `color: #151515`, `border-radius: 3px` |
| `sell` variant | `bg: #FF5938`, `color: #151515`, `border-radius: 3px` |
| 폰트 | `IBM Plex Sans Medium`, `16px` |
| padding | `18px` → `20px` (vertical) |

### 2-4. TestnetBadge 개선

**현재:** 텍스트 배지
**Figma:** 녹색 플래그 형태 배지

- Figma 에셋을 활용하거나 CSS로 플래그 모양 재현

### 2-5. BottomNav (`components/layout/BottomNav.tsx`)

**현재:** 이모지 아이콘
**Figma:** SVG 아이콘 (선 스타일)

| 변경 사항 | 상세 |
|-----------|------|
| 아이콘 | 이모지 → SVG 아이콘 (Trade: 차트, Signal: 시그널, Portfolio: 지갑, Setting: 설정) |
| 배경 | `#050505`, 상단 `#242424` 1px 보더 |
| 높이 | `50px` 고정 |
| 활성 탭 | 흰색 텍스트 + 흰색 아이콘 |
| 비활성 탭 | `#666666` 텍스트 + 아이콘 |
| 폰트 | `11px`, `IBM Plex Sans Regular` |
| `max-width` | `360px` |

---

## Phase 3: 페이지별 수정

### 3-1. Landing Page (`pages/LandingPage.tsx`)

**현재 vs Figma 차이점:**

| 항목 | 현재 | Figma |
|------|------|-------|
| 레이아웃 | 중앙 정렬, 수직 나열 | 상단 헤더 + 중간 타이틀 + 배경이미지 + 하단 CTA |
| 타이틀 | `26px`, fontWeight 800 | `34px`, IBM Plex Sans Medium, `line-height: 36px` |
| "Supercycl" | 일반 흰색 | `#00DE0B` (초록색) |
| 부제 | "Seamlessly connect..." | 제거 |
| CTA 버튼 | 파란 배경 "Start with Google" | 투명+테두리 "Continue with Google" |
| 하단 텍스트 | "TESTNET MODE" 배지 | `#00DE0B` "Test environment. No real funds used." |
| 배경 | radial gradient 글로우 | 파티클 웨이브 이미지 |
| 헤더 | 없음 | Logo + Testnet 배지 |

**구현:**
- 상단에 `Header` 컴포넌트 추가
- 타이틀 영역: `top: 124px`, `left: 20px`, 좌측 정렬
- 배경 이미지: `public/images/landing-bg.png` (Figma 에셋)
- CTA 영역: 하단 고정 (`top: 510px`)
- TESTNET 배지 → 초록 텍스트로 교체
- 부제, 로고 아이콘, 하단 뱃지 제거

### 3-2. Login Page (`pages/LoginPage.tsx`)

**현재:** 별도 전체 페이지 (뒤로가기 버튼 + 로고 + "Log in or sign up")
**Figma:** Landing 위에 **Bottom Sheet 모달 오버레이** (Google 계정 선택)

**Figma 상세 구조 (Onboarding_02):**
- 배경: Landing 페이지 그대로 + 검정 dim 오버레이 (`opacity: 0.8`)
- Bottom Sheet: 흰색(`#FFFFFF`) 배경, 상단 둥근 모서리 `20px`
- 모달 높이: `304px`, 하단 고정
- 상단 손잡이: `40px × 4px`, `#E0E0E0`, `border-radius: 4px`
- 구글 로고 이미지 (중앙)
- 타이틀: "Supercycl에 로그인" (`22px`, IBM Plex Sans Medium + Noto Sans KR)
- 계정 정보 카드: `#EFEFEF` 배경, `12px` radius
  - 좌: 원형 아바타 (`40px`, `#008E66` 배경, 이니셜 "김")
  - 중: 이름 "홍길동" (Bold 16px, `#050505`) + 이메일 (Regular 14px, `#505050`)
  - 우: 화살표 아이콘
- CTA 버튼: "홍길동(으)로 계속" (`#0B34A4` 파란 배경, `22px` radius, `44px` 높이)

**구현 방식:**
- 현재 별도 페이지 구조를 유지하되, Landing 배경 위에 BottomSheet를 렌더링
- 또는 LandingPage 내에서 로그인 상태를 관리하여 BottomSheet를 조건부 표시

### 3-3. Terms Page (`pages/TermsPage.tsx`)

**현재 vs Figma 차이점:**

| 항목 | 현재 | Figma |
|------|------|-------|
| 타이틀 | "Agreement Required" | "Review and accept the terms" |
| 폰트 | `22px`, weight 700 | `28px`, IBM Plex Sans Medium, `line-height: 30px` |
| 이미지 | 없음 | 클럭/네트워크 일러스트레이션 |
| 체크박스 | HTML input checkbox | 원형 커스텀 체크박스 (`24px`, 초록 배경) |
| 약관 텍스트 | 초록색 링크 | 흰색 밑줄 링크 |
| Accept 버튼 | primary 채워진 스타일 | 테두리 스타일 |
| Decline 버튼 | ghost 스타일 | 제거 |
| 헤더 | 없음 | Logo + Testnet 배지 |

**구현:**
- 헤더 추가
- 타이틀/폰트 변경
- 일러스트 이미지 추가 (Figma 에셋)
- 커스텀 원형 체크박스 구현
- 링크 스타일 변경 (흰색 + 밑줄)
- Accept 버튼 스타일 변경
- Decline 버튼 제거

### 3-4. Onboarding Page (`pages/OnboardingPage.tsx`)

**설정 중 단계 (Onboarding_04):**

| 항목 | 현재 | Figma |
|------|------|-------|
| 헤더 | 없음 | 없음 (상태바만 표시) |
| 일러스트 | 없음 | 지갑 아이콘 일러스트 (중앙, `y:152`, `120×120`) |
| 타이틀 | "Setting up your trading account..." (18px, weight 600) | "Setting up your trading account" (`26px`, Medium, 중앙정렬, `y:288`) |
| 진행 단계 | 세로 리스트 (원형 아이콘 24px, 체크마크) | 세로 도트 리스트 (도트 `8px` + 점선 연결) |
| 활성 단계 | 초록 배경 원 + 흰 체크 | 초록 도트 (`#00DE0B`) + 초록 텍스트 |
| 비활성 단계 | 회색 배경 원 + 빈 원 | 회색 도트 (`#666`) + 회색 텍스트 (`#666`) |
| 단계 텍스트 | `14px` | `16px`, IBM Plex Sans Regular |
| 스피너 | 원형 로딩 애니메이션 | **없음** (제거) |
| 도트 연결선 | 없음 | 세로 점선 (도트 사이 연결) |

**완료 단계 (Onboarding_05):**

| 항목 | 현재 | Figma |
|------|------|-------|
| 헤더 | 없음 | `header_02`: X 닫기 버튼만 (우측 정렬, `24px` 아이콘) |
| 상단 로고 | 체크마크 아이콘 | Supercycl 로고 (`y:140`, 중앙정렬) |
| 타이틀 | "You're all set!" (22px, weight 700) | "You're all set!" (`26px`, Medium, 중앙정렬, `y:200`) |
| 잔액 카드 | 일반 카드 (bg-card, 10px radius) | 티켓 스타일 카드 (`#1A1A1A` 배경, `8px` radius, 양쪽 반원 노치 `32px`) |
| 잔액 카드 패딩 | `20px` | `pt: 32px`, `pb: 36px` |
| "Balance" | `13px`, text-secondary | `16px`, Regular, `#666` |
| 금액 | `28px`, mono 폰트 | `22px`, IBM Plex Sans Medium, `line-height: 28px` |
| "(Testnet)" | 초록 텍스트 | **제거** |
| 부제 | "Binance, BingX..." | **제거** |
| CTA 위치 | marginTop 32px | 고정 위치 `y:548` (하단) |
| CTA 스타일 | primary 채워진 버튼 | 테두리 스타일 "Start Trading" (`border: 1px solid #666`, `border-radius: 32px`) |

### 3-5. Trading Page (`pages/TradingPage.tsx` + 하위 컴포넌트)

#### CoinInfoBar

| 항목 | 현재 | Figma |
|------|------|-------|
| 배경 | blur 반투명 | `#050505` 불투명 |
| 페어 표시 | `BTC/USDC` | `BTC / USDT` (Bold, 16px) |
| 가격 | 달러 기호 포함 | 가격만 표시 (별도 영역) |
| 변화율 | 배지 스타일 | 좌측 페어 아래 `#FF5938` 텍스트 |
| Testnet 배지 | 우측 | 헤더로 이동 |
| 하단 보더 | `var(--border-color)` | `#2C2C2C` 1px |

#### Chart

| 항목 | 현재 | Figma |
|------|------|-------|
| 높이 | `240px` | `176px` |
| 차트 타입 | SVG 라인 차트 | 캔들스틱 이미지 |
| 시간대 탭 | `1H, 4H, 1D, 1W` | `3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h` |
| MA 라인 | 없음 | MA5, MA10, MA30 표시 |
| 가격 표시 | 없음 | 우측에 가격 눈금 |

- 캔들스틱 차트 이미지를 Figma에서 에셋으로 추출하여 사용

#### Orderbook + OrderForm (레이아웃 변경)

**현재:** 세로 나열 (Orderbook → OrderForm)
**Figma:** 가로 분할 (좌: OrderForm, 우: Orderbook + 가격)

```
┌─────────────────────────────────────┐
│ [Market       ▼] │  Price    Size  │
│ [Isolated ▼][2x▼]│  66,922   875   │ ← Ask (빨강)
│ [Price(USDT)    ] │  66,922   875   │
│ [Size    BTC ▼  ] │  66,918.0    >  │ ← Spread
│ [━━━━●━━━━━━━━━━] │  66,922   875   │ ← Bid (초록)
│ Cost / Liq info   │  66,922   875   │
│ [Buy/Long][Sell]  │  [B 58%  42% S] │
└─────────────────────────────────────┘
```

**OrderForm 변경:**
- 드롭다운 스타일: `#1D1D1D` 배경, `2px` radius, 작은 화살표
- Market 타입: 탭 → 드롭다운
- Isolated / Leverage: 별도 드롭다운 (나란히 배치)
- Input Box: `#1D1D1D` 배경, 상단 라벨, 값 표시
- Size 슬라이더: 5단계 도트 (0/25/50/75/100) + 핸들
- Buy/Long: `#00DE0B` 배경, `#151515` 텍스트, `3px` radius
- Sell/Short: `#FF5938` 배경, `#151515` 텍스트, `3px` radius
- Auto TP/SL 섹션 제거 (Figma에 없음)
- Cost, Long/Short Est. Liquidation Price 정보 추가

**Orderbook 변경:**
- 헤더 제거 (Price / Size 라벨만)
- Ask(빨강) 4줄 + Spread + Bid(초록) 4줄
- Total 열 제거 → Size만 표시
- 하단: Buy/Sell 비율 바 (`B 58% / 42% S`)

#### Dashboard

- 현재 구현 유지 (Figma에 해당 화면 없으므로 기존 스타일만 색상 조정)

### 3-6. Signal Page (`pages/SignalPage.tsx`)

**현재 vs Figma 차이점:**

| 항목 | 현재 | Figma |
|------|------|-------|
| 헤더 | "⚡ YouthMeta Signals" | 제거 (헤더는 공통 Header) |
| 성과 요약 | 카드 형태 | 인라인 텍스트 (Hit 💚 2, Miss 💔 1, Expired 🩶 2) |
| Avg PnL / Hit Rate | 카드 내부 | 우측 정렬 텍스트 |
| 필터 탭 | pill 형태 (초록 활성) | 텍스트 탭 + 밑줄 (흰색 활성) |
| 시그널 카드 | 좌측 테두리 + 배경 | 플랫 레이아웃, 좌측 컬러 바 |

**SignalCard 변경:**

```
┌─────────────────────────────────────┐
│ ▌ BTCUSDT    Long          16h ago  │
│   Entry   TP      SL    High   R:R  │
│   2.83    96,000  92,000 ●●●  1:1.5 │
│   "BTC 4H bullish divergence..."    │
│   [  Modify  ] [ Execute Signal ]   │
└─────────────────────────────────────┘
```

- 배경: 투명 (카드 배경 제거, 현재의 `dirBg` 색상 배경 삭제)
- 좌측 컬러 바: `4px` width, `16px` height, `2px` radius (현재 `borderLeft: 3px` → 독립 div로 변경)
- 페어명: `14px SemiBold` (현재와 동일)
- 방향: Long=`#00DE0B`, Short=`#FF5938`, `13px Medium` (현재 pill 배지 → 단순 텍스트)
- 타임스탬프: `#505050` `9px` (현재 `#4b4b4b` `10px`)
- 데이터 행 레이아웃: **5열 그리드** (Entry Price, TP, SL, Confidence, R:R)
  - 라벨: `10px` Regular, `#666`
  - 값: `12px` Medium, 흰색 (TP는 `#00DE0B`, Short의 TP는 `#FF5938`)
- Confidence: 도트 아이콘 이미지 (현재 텍스트 ●○ → 이미지 에셋)
- Reasoning: `#363636`, `10px` Regular (현재 `12px` italic → `10px` normal)
- 버튼 높이: `26px` (현재 `padding: 10px` → 더 컴팩트)
- Modify 버튼: `#242424` 배경, `#E0E0E0` 텍스트, `2px` radius, `10px` Medium
- Execute Signal 버튼: Long=`#00DE0B` / Short=`#FF5938`, `#151515` 텍스트, `2px` radius
- 버튼 너비: 각각 `162px` (50:50 비율)
- 구분선: 카드 사이 `#2C2C2C` 1px, `width: 328px` (좌우 `16px` 패딩)

**Signal 성과 요약 변경:**

| 항목 | 현재 | Figma |
|------|------|-------|
| 컨테이너 | 카드 (`bg-card`, border) | 배경 없음, 인라인 텍스트 |
| "Last 30 days performance" | "Last 30 Days Performance" (12px, fontWeight 600) | `10px` Medium, `#666` |
| 통계 행 | 한 줄 (✅ Hit ❌ Miss ⏰ Exp) | "Hit 💚 **2**", "Miss 💔 **1**", "Expired 🩶 **2**" (세로 구분선 포함) |
| 통계 숫자 | 인라인 | `16px Bold` 큰 숫자 |
| Avg PnL / Hit Rate | 카드 하단 | 우측 상단 (`9px`, Avg PnL: `#00DE0B`, Hit Rate: `#00DE0B`) |

**Signal 필터 탭 변경:**

| 항목 | 현재 | Figma |
|------|------|-------|
| 스타일 | pill 형태 (초록 활성, bg-card 비활성) | 텍스트만 (`9px` Medium) |
| 활성 표시 | 초록 배경 | 흰색 텍스트 + 하단 밑줄 (`2px`, `16px` width, 흰색) |
| 비활성 | 회색 배경 + 보더 | `#666` 텍스트, 밑줄 없음 |
| 간격 | `gap: 6px`, `padding: 6px 14px` | 넓은 간격, 탭 간 여백 |

---

## Phase 4: 에셋 관리

### Figma에서 다운로드할 에셋

| 에셋 | 용도 | 저장 경로 |
|------|------|----------|
| `logo_supercycl` | 헤더 로고 (텍스트 + 아이콘) | `public/images/logo.svg` |
| `logo_icon` | Supercycl 아이콘 단독 (로그인 모달, 완료 페이지) | `public/images/logo-icon.svg` |
| `Flag/testnet` | Testnet 배지 (플래그 형태) | `public/images/testnet-badge.svg` |
| `landing-bg` (image 1) | 랜딩/로그인 배경 파티클 웨이브 이미지 | `public/images/landing-bg.png` |
| `terms-illustration` (img_01) | 약관 페이지 클럭/네트워크 일러스트 | `public/images/terms-illust.png` |
| `onboarding-wallet` (img_01) | 온보딩 설정 중 지갑 아이콘 일러스트 | `public/images/onboarding-wallet.png` |
| `chart-candle` (010101 1) | 트레이딩 캔들차트 이미지 | `public/images/chart-candle.png` |
| `icon-x` (icon_x) | X 닫기 버튼 (Onboarding 완료 헤더) | `public/images/icon-close.svg` |
| `icon-trade` | 하단탭 Trade 아이콘 (사각 차트) | SVG inline |
| `icon-signal` | 하단탭 Signal 아이콘 (시그널 파형) | SVG inline |
| `icon-portfolio` | 하단탭 Portfolio 아이콘 (지갑/차트) | SVG inline |
| `icon-setting` | 하단탭 Setting 아이콘 (톱니바퀴) | SVG inline |
| `icon-google` | 구글 로그인 아이콘 (컬러 G) | 기존 유지 |
| `confidence-dots` | 시그널 카드 신뢰도 도트 (3단계) | SVG inline 또는 에셋 |
| `ticket-notch` | 잔액 카드 양쪽 반원 노치 | CSS로 구현 (`32px` 원형 오버레이) |

> **참고:** Figma MCP에서 가져온 이미지 URL은 7일 후 만료되므로,
> 구현 시 에셋을 다운로드하여 `public/` 폴더에 저장한다.

---

## 구현 순서

| 단계 | 작업 | 영향 범위 | 우선순위 |
|------|------|----------|---------|
| **Step 1** | CSS 변수 + 폰트 변경 | `global.css`, `index.html` | 🔴 필수 |
| **Step 2** | 뷰포트 360px 변경 | `global.css`, `BottomNav.tsx` | 🔴 필수 |
| **Step 3** | 공통 Header 컴포넌트 생성 | 신규 파일 | 🔴 필수 |
| **Step 4** | Logo 컴포넌트 SVG 교체 | `Logo.tsx` | 🔴 필수 |
| **Step 5** | Button 스타일 변경 | `Button.tsx` | 🔴 필수 |
| **Step 6** | Landing Page 리디자인 | `LandingPage.tsx` | 🔴 필수 |
| **Step 7** | Login Page 조정 | `LoginPage.tsx` | 🟡 중요 |
| **Step 8** | Terms Page 리디자인 | `TermsPage.tsx` | 🟡 중요 |
| **Step 9** | Onboarding Page 리디자인 | `OnboardingPage.tsx` | 🟡 중요 |
| **Step 10** | BottomNav SVG 아이콘 변경 | `BottomNav.tsx` | 🟡 중요 |
| **Step 11** | CoinInfoBar + Header 통합 | `CoinInfoBar.tsx`, `TradingPage.tsx` | 🟡 중요 |
| **Step 12** | Chart 캔들스틱 이미지 교체 | `Chart.tsx` | 🟡 중요 |
| **Step 13** | OrderForm + Orderbook 레이아웃 변경 | `OrderForm.tsx`, `Orderbook.tsx`, `TradingPage.tsx` | 🔴 필수 |
| **Step 14** | Signal Page 리디자인 | `SignalPage.tsx`, `SignalCard.tsx` | 🟡 중요 |
| **Step 15** | 에셋 다운로드 및 교체 | `public/images/` | 🟡 중요 |

---

## 교차검수 결과 (Figma 재확인)

모든 7개 화면(Onboarding_01~05, Trading_01, Trading_04)의 Figma 디자인 컨텍스트 + 스크린샷을 재확인하여 아래 수정사항을 반영하였다.

### 수정된 항목

| # | 원래 계획 | 수정 내용 | 근거 (Figma 노드) |
|---|----------|----------|------------------|
| 1 | Login Page: "시각적으로 Figma 스타일 적용" (모호) | Bottom Sheet 모달 상세 스펙 추가 (흰색 배경, 계정 카드, 파란 CTA) | Onboarding_02 (`30:690`) |
| 2 | Onboarding 설정: "가로 프로그레스 바 + 텍스트" | **세로 도트 리스트** (8px 도트 + 점선 연결)로 수정 | Onboarding_04 (`30:1823`) |
| 3 | Onboarding 설정: "핸드폰 일러스트 이미지" | **지갑 아이콘 일러스트**로 수정 | Onboarding_04 노드 `30:1828` |
| 4 | Onboarding 설정: 스피너 → 이미지 | **스피너 제거** (Figma에 로딩 스피너 없음) | Onboarding_04 전체 |
| 5 | Header: variant 2개 | variant 3개로 확장 (`"none"` 추가 — Onboarding_04) | Onboarding_04에 헤더 없음 |
| 6 | 폰트: IBM Plex Sans만 | **Noto Sans KR** 추가 (한국어 텍스트용) | Onboarding_02 (`30:766`, `30:775`) |
| 7 | 에셋: 10개 | **15개**로 확대 (logo-icon, icon-close, confidence-dots 등 추가) | 전체 화면 재확인 |
| 8 | Signal 성과 요약: 설명 부족 | Figma 레이아웃 상세 추가 (숫자 크기, 구분선, Avg PnL 위치) | Trading_04 (`92:5308`) |
| 9 | Signal 필터 탭: 설명 부족 | 텍스트+밑줄 스타일 상세 추가 | Trading_04 (`92:5357`) |
| 10 | SignalCard: 설명 부족 | 5열 그리드, 버튼 크기, 색상 상세 추가 | Trading_04 (`92:5366`, `92:5392`) |

### 확인 완료 (변경 불필요)

- Landing Page (Onboarding_01): 계획 정확 ✓
- Terms Page (Onboarding_03): 계획 정확 ✓
- Onboarding 완료 (Onboarding_05): 계획 정확, 상세 보강 ✓
- Trading 메인 (Trading_01): 계획 정확 ✓
- CSS 변수/폰트/뷰포트: 계획 정확 ✓

---

## 유의사항

1. **기존 기능 유지:** 상태 관리(AppContext), 라우팅, 모달 동작은 변경하지 않음
2. **애니메이션 유지:** 기존 `animations.css`의 fadeIn, slideUp 등은 그대로 유지
3. **Tailwind 미사용:** Figma에서 생성된 Tailwind 코드는 참조용. 기존 CSS Variables + inline style 패턴 유지
4. **에셋 만료:** Figma MCP 에셋 URL은 7일 후 만료. 구현 시 즉시 다운로드
5. **반응형:** 360px 고정 뷰포트, 모바일 전용
6. **폰트 로딩:** IBM Plex Sans가 로드되지 않을 경우 Inter → system font fallback
