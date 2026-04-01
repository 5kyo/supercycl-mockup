# Supercycl Mobile UI/UX 개선 계획

> 현재 목업 앱을 **모바일 네이티브 수준의 트레이딩 경험**으로 끌어올리기 위한 종합 개선 계획.
> supercycl.io 랜딩 페이지의 톤앤매너를 기반으로 브랜드 일관성을 확보한다.

---

## 1. 브랜드 톤앤매너 정렬

### 1.1 현재 문제점

| 항목 | 현재 (목업) | supercycl.io | 괴리 |
|------|------------|--------------|------|
| Primary Color | Purple `#6366f1` | Neon Green `#00ff6a` / `#37ff00` | 완전히 다른 브랜드 컬러 |
| 폰트 | Inter | LineSeedSans (display) + IBM Plex Sans (body) | 브랜드 폰트 미사용 |
| 배경 | `#0a0a0f` (dark blue tint) | `#0a0a0a` (pure dark) | 미세한 톤 차이 |
| 메시징 | 일반적 ("Welcome to Supercycl") | 강렬한 ("Trade Different, Ride the Supercycl") | 브랜드 보이스 부재 |
| 그래디언트 | Purple gradient | Green glow gradient (`#00ff0080`) | 액센트 방향성 불일치 |

### 1.2 개선 방향

**브랜드 보이스**: 대담하고 자신감 있는 크립토 네이티브 톤
- "Trade Different, Ride the Supercycl" 스타일의 짧고 강렬한 카피
- "One Interface, All Exchanges" 같은 가치 제안 중심 메시징
- 과장 없이 명확한 혜택 전달

**비주얼 아이덴티티**:
- Neon Green을 primary accent로 전환
- 다크 배경 위 고대비 텍스트
- 미니멀하고 구조적인 레이아웃 (그리드 기반)
- 호버/인터랙션 시 subtle한 green glow 효과

---

## 2. 디자인 시스템 개편

### 2.1 컬러 팔레트 변경

```css
/* AS-IS (Purple 기반) */
--accent-purple: #6366f1;
--bg-primary: #0a0a0f;
--bg-secondary: #12121a;

/* TO-BE (supercycl.io 브랜드 정렬) */
--color-pri-1: #00ff6a;        /* Primary Green - CTA, 강조 */
--color-pri-2: #37ff00;        /* Secondary Green - 호버, 활성 상태 */
--color-pri-3: #00de0b;        /* Tertiary Green - 아이콘, 배지 */
--color-bg-g: #092900;         /* Green tinted background - 카드 하이라이트 */
--color-bg: #0a0a0a;           /* Pure dark background */
--color-gray-7: #0b0b0b;       /* Deepest surface */
--color-gray-5: #222222;       /* Card/Surface background */
--color-gray-3: #4b4b4b;       /* Border, divider */
--color-gray-2: #9f9f9f;       /* Secondary text */
--color-gray-1: #e0e0e0;       /* Primary text */
--color-error: #ff5938;         /* Error (supercycl.io 기준) */

/* 트레이딩 전용 (유지) */
--color-buy: #00d68f;           /* Long/Buy - green */
--color-sell: #ff4d6a;          /* Short/Sell - red */
--color-warning: #f0b90b;      /* Warning - yellow */
```

### 2.2 타이포그래피 변경

```css
/* AS-IS */
font-family: 'Inter', sans-serif;

/* TO-BE */
--font-display: 'LineSeedSans', sans-serif;   /* 타이틀, 헤딩, 네비게이션 */
--font-body: 'IBM Plex Sans', sans-serif;       /* 본문, 데이터, 입력 필드 */
--font-mono: 'IBM Plex Mono', monospace;        /* 가격, 수치 데이터 */
```

**타입 스케일 (모바일 최적화)**:

| Token | Size | Line Height | 용도 |
|-------|------|-------------|------|
| `t4` | 34px | 38px | 페이지 타이틀 (Landing hero) |
| `h1` | 28px | 36px | 섹션 타이틀 |
| `h2` | 20px | 26px | 카드 타이틀, 모달 헤더 |
| `h4` | 16px | 22px | 서브 헤딩, 탭 라벨 |
| `b5` | 16px | 22px | 본문 텍스트 |
| `b6` | 14px | 20px | 보조 텍스트 |
| `b8` | 14px | 18.2px | 데이터 텍스트 (IBM Plex Sans) |
| `b16` | 13px | 16px | 캡션, 라벨 |
| `c1` | 12px | 16px | 태그, 배지 |

### 2.3 그래디언트 & 이펙트

```css
/* Green glow gradient (supercycl.io 스타일) */
.glow-up {
  background-image: linear-gradient(transparent 0 50%, #00ff6a80 100%),
                    linear-gradient(90deg, transparent, #000000e6 20% 80%, transparent);
}

/* Card hover effect */
.card-hover {
  border: 1px solid transparent;
  transition: border-color 0.3s, padding 0.3s;
}
.card-hover:active {
  border-color: #222;
}

/* CTA Button glow */
.btn-primary {
  background: #37ff00;
  color: #0a0a0a;
  box-shadow: 0 0 20px #00ff6a40;
}
```

---

## 3. 페이지별 모바일 UX 개선

### 3.1 Landing Page (`/`)

**현재**: 단순 로고 + "Welcome" 텍스트 + Google 로그인 버튼
**개선안**:

- **Hero 카피 변경**: "Welcome to Supercycl" → **"Trade Different,\nRide the Supercycl"**
- **서브 카피 추가**: "Seamlessly connect and manage multiple exchanges from a single platform"
- **CTA 버튼 스타일**: Purple → Neon Green 배경 + 다크 텍스트 (supercycl.io의 "START TRADING" 스타일)
- **배경 이펙트**: 하단에서 올라오는 subtle green glow gradient
- **Testnet 뱃지**: 우상단 고정, green 보더로 변경
- **로고**: gradient-text를 green 계열로 변경
- **진입 애니메이션**: 로고 fade-in → 타이틀 slide-up → CTA fade-in (순차적)

### 3.2 Login Page (`/login`)

**개선안**:
- Google OAuth 버튼 디자인을 supercycl.io의 버튼 스타일에 맞춤 (rounded, border-gray-5)
- "Connect your existing accounts and start trading instantly" 카피 추가
- 뒤로가기 버튼에 touch feedback (scale + opacity transition)

### 3.3 Terms Page (`/terms`)

**개선안**:
- 체크박스 active 색상: Purple → Green
- "Accept" 버튼: Green primary CTA 스타일
- 약관 텍스트 가독성 향상 (line-height 조정, gray-2 색상)

### 3.4 Onboarding Page (`/onboarding`)

**개선안**:
- 스텝 인디케이터 색상: Purple → Green
- 스피너 애니메이션 색상: Green glow
- 성공 화면: Checkmark 아이콘에 green glow pulse 효과
- 잔액 표시: IBM Plex Mono 폰트 + 큰 사이즈
- 프로그레스 바 추가: 3단계 각 스텝 진행률 시각화

### 3.5 Trading Page (`/trade`) — 핵심 개선 영역

#### 3.5.1 CoinInfoBar (상단 코인 정보)

**현재 문제**: 정보 밀도가 낮고 탭 어포던스 부족
**개선안**:
- 코인명 터치 시 CoinSelector 열림을 시각적으로 암시 (chevron 아이콘 추가)
- 가격 변동률 뱃지: 상승 green, 하락 red, 배경색 포함
- 24h High/Low 미니 바 추가 (현재가 위치 시각화)
- Sticky 헤더에 blur backdrop 효과: `backdrop-filter: blur(12px)`

#### 3.5.2 Chart

**현재 문제**: 단순 SVG, 인터랙션 없음
**개선안**:
- 차트 그래디언트: Purple → Green 계열
- 터치 드래그 시 크로스헤어 + 가격 툴팁
- 시간 범위 선택 탭 추가 (1H, 4H, 1D, 1W)
- 캔들스틱 차트 옵션 (라인 ↔ 캔들 전환)
- 차트 높이: 200px → 240px (정보 가독성)

#### 3.5.3 Orderbook

**개선안**:
- 폰트: monospace → IBM Plex Mono
- 수량 바 높이/너비 비율 최적화
- Spread 표시에 퍼센트 추가
- 실시간 업데이트 느낌의 subtle flash 애니메이션
- 호가 터치 시 OrderForm 가격 자동 입력

#### 3.5.4 OrderForm

**개선안**:
- Buy/Long 버튼: `#00d68f` 유지, Sell/Short: `#ff4d6a` 유지
- 레버리지 셀렉터: Green 액센트로 변경
- 퍼센트 슬라이더: 트랙 색상 green gradient
- 입력 필드 포커스 border: Green
- 주문 유형 탭 (Limit/Market/Conditional): active 상태 green underline
- 주문 확인 시 haptic feedback 느낌의 micro-animation

#### 3.5.5 Dashboard (Positions / Orders / History)

**개선안**:
- 포지션 카드: PnL 양수 green glow border, 음수 red subtle border
- 탭 카운트 뱃지: Green 배경
- 빈 상태 UI: "No open positions" 일러스트레이션 + CTA
- 스와이프 제스처: 포지션 카드 좌측 스와이프 → 빠른 청산 버튼

#### 3.5.6 Bottom Navigation

**개선안**:
- 이모지 아이콘 → SVG 커스텀 아이콘 (line style, supercycl.io 톤에 맞춤)
- 활성 탭: Green 하이라이트 (underline 또는 dot indicator)
- 비활성 탭: `gray-3` 색상
- 탭 전환 시 subtle scale 트랜지션

---

## 4. 유스메타 시그널 페이지 (`Signal`)

### 4.1 개요

**유스메타 시그널**은 특정 코인에 대한 **롱/숏 트레이딩 알림**을 실시간으로 제공하는 기능이다.
기존 BottomNav에 **Signal 탭을 추가**하여 Trade, Signal, Portfolio, Settings 4탭 구조로 확장한다.

> 파트너 코드 `YOUTHMETA`가 이미 defaults.ts에 존재하므로, 시그널은 유스메타 브랜드와 연동되는 핵심 기능으로 포지셔닝.

### 4.2 BottomNav 변경

```
AS-IS (3탭):  Trade 📊  |  Portfolio 📈  |  Settings ⚙
TO-BE (4탭):  Trade 📊  |  Signal ⚡  |  Portfolio 📈  |  Settings ⚙
```

- Signal 탭 아이콘: 번개(⚡) → 추후 SVG 커스텀 아이콘으로 교체
- 새 시그널 도착 시 탭에 **green dot badge** 표시 (읽지 않은 알림 수)
- `activeTab` 타입 확장: `"trade" | "signal" | "portfolio" | "settings"`

### 4.3 시그널 데이터 모델

```typescript
interface Signal {
  readonly id: string;                    // 고유 ID
  readonly coin: string;                  // "BTC", "ETH", "SOL" 등
  readonly pair: string;                  // "BTC-USDC"
  readonly direction: "LONG" | "SHORT";   // 포지션 방향
  readonly entryPrice: number;            // 진입 추천가
  readonly targetPrice: number;           // 목표가 (TP)
  readonly stopLoss: number;              // 손절가 (SL)
  readonly leverage: number;              // 추천 레버리지
  readonly confidence: "HIGH" | "MEDIUM" | "LOW";  // 신뢰도
  readonly reasoning: string;             // 시그널 근거 (1-2줄)
  readonly timestamp: string;             // ISO 8601
  readonly status: "ACTIVE" | "HIT_TP" | "HIT_SL" | "EXPIRED" | "CANCELLED";
  readonly pnlPercent?: number;           // 결과 수익률 (종료된 시그널)
}

interface SignalState {
  readonly signals: readonly Signal[];
  readonly unreadCount: number;
  readonly filter: "ALL" | "LONG" | "SHORT" | "ACTIVE" | "CLOSED";
}
```

### 4.4 시그널 페이지 레이아웃

```
┌─────────────────────────────────┐
│ ⚡ YouthMeta Signals        🔔 3 │  ← 헤더: 타이틀 + 읽지 않은 수
├─────────────────────────────────┤
│ [ALL] [LONG] [SHORT] [ACTIVE]  │  ← 필터 탭 (pill 스타일)
├─────────────────────────────────┤
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🟢 LONG  BTC-USDC      2m ago│ │  ← 시그널 카드
│ │ Entry $94,200 → TP $96,800 │ │
│ │ SL $92,500  ·  Lev 2x     │ │
│ │ Confidence: ●●●○ HIGH      │ │
│ │ "BTC 4H 강세 다이버전스 확인" │ │
│ │                             │ │
│ │ [시그널로 주문하기]           │ │  ← CTA: 원탭 주문 연동
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🔴 SHORT SOL-USDC    15m ago│ │
│ │ Entry $178.50 → TP $170.00 │ │
│ │ SL $183.00  ·  Lev 2x     │ │
│ │ Confidence: ●●○○ MEDIUM    │ │
│ │ "과매수 RSI + 저항선 접근"   │ │
│ │                             │ │
│ │ [시그널로 주문하기]           │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ✅ HIT TP  ETH-USDC   1h ago│ │  ← 종료된 시그널
│ │ Entry $2,650 → TP $2,720   │ │
│ │ 결과: +2.64%               │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

### 4.5 시그널 카드 디자인

**활성 시그널 (ACTIVE)**:
- LONG: 좌측 보더 `#00d68f` (green) + 배경 `rgba(0, 214, 143, 0.05)`
- SHORT: 좌측 보더 `#ff4d6a` (red) + 배경 `rgba(255, 77, 106, 0.05)`
- 신규 시그널 (30초 이내): green glow pulse 애니메이션
- 카드 구조:
  - **Row 1**: 방향 배지 + 코인 페어 + 시간 (relative time)
  - **Row 2**: Entry → Target 가격 (화살표 강조)
  - **Row 3**: SL 가격 + 추천 레버리지
  - **Row 4**: 신뢰도 인디케이터 (도트 4개, 채워진 수로 표현)
  - **Row 5**: 근거 텍스트 (1줄, 말줄임)
  - **Row 6**: CTA 버튼 "시그널로 주문하기"

**종료된 시그널 (HIT_TP / HIT_SL / EXPIRED)**:
- 배경: `var(--color-gray-5)` (dimmed)
- 상태 배지: ✅ HIT TP (green), ❌ HIT SL (red), ⏰ EXPIRED (gray)
- 결과 PnL 표시: 양수 green, 음수 red
- CTA 버튼 없음, 축소된 카드 높이

**CANCELLED 시그널**:
- 취소선 + gray 텍스트
- 맨 아래로 정렬

### 4.6 시그널 → 주문 연동 플로우

```
[시그널로 주문하기] 터치
    ↓
확인 바텀시트 표시:
┌─────────────────────────────────┐
│ 시그널 기반 주문 확인             │
│                                 │
│ BTC-USDC  LONG                  │
│ 주문 타입: Limit                │
│ 진입가: $94,200                 │
│ 수량: (잔액 기반 자동 계산)       │
│ 레버리지: 2x                    │
│ TP: $96,800 (+2.76%)           │
│ SL: $92,500 (-1.80%)           │
│                                 │
│ [수정하기]     [주문 실행]       │
└─────────────────────────────────┘
```

- **"주문 실행"**: 즉시 주문 생성 → Trade 탭으로 이동 → Toast "주문이 실행되었습니다"
- **"수정하기"**: Trade 탭으로 이동 + OrderForm에 시그널 값 pre-fill (코인, 가격, 레버리지, TP/SL)

### 4.7 시그널 알림 시스템

- 새 시그널 도착 시:
  - Signal 탭이 아닌 곳에 있으면 BottomNav 배지 카운트 증가
  - 인앱 push 배너 (상단 슬라이드 다운, 3초 후 자동 닫힘)
  - 배너 터치 → Signal 탭으로 이동 + 해당 시그널 하이라이트

```
┌─────────────────────────────────┐
│ ⚡ New Signal: LONG BTC +2.76%  │  ← 인앱 알림 배너
│    Entry $94,200 · HIGH conf.   │
└─────────────────────────────────┘
```

### 4.8 시그널 성과 요약 (헤더 하단)

```
┌─────────────────────────────────┐
│  최근 30일 성과                   │
│  ✅ 23 적중  ❌ 7 실패  ⏰ 2 만료 │
│  평균 수익률: +1.82%  적중률: 72% │
└─────────────────────────────────┘
```

- Signal 페이지 상단, 필터 탭 위에 배치
- 카드 형태, `var(--color-gray-5)` 배경
- 적중률에 따라 색상 변화 (70%+ green, 50-70% yellow, 50%- red)

### 4.9 AppContext 확장

```typescript
// 새로운 액션 타입 추가
type Action =
  | ... (기존 액션들)
  | { type: "SET_SIGNAL_FILTER"; filter: SignalState["filter"] }
  | { type: "MARK_SIGNALS_READ" }
  | { type: "EXECUTE_SIGNAL_ORDER"; signalId: string }

// AppState 확장
interface AppState {
  ... (기존 상태)
  signalState: SignalState;
}
```

### 4.10 목업 시그널 데이터 (constants/signals.ts)

```typescript
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
    reasoning: "BTC 4H 강세 다이버전스 확인, 지지선 반등",
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
    reasoning: "과매수 RSI + 일봉 저항선 접근",
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
    reasoning: "ETH/BTC 비율 바닥 확인, 거래량 증가",
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
    reasoning: "밈코인 모멘텀, 소셜 미디어 트렌딩",
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
    reasoning: "L2 토큰 전반 약세, 언락 스케줄 임박",
    timestamp: "2026-03-31T09:00:00Z",
    status: "EXPIRED",
  },
];
```

---

## 5. 시나리오 퀵 점프 버튼 (Dev Navigation)

### 5.1 개요

목업 시연 시 각 주요 화면/시나리오로 **즉시 이동**할 수 있는 개발용 퀵 네비게이션 바.
프로덕션 빌드에서는 숨기고, 개발/시연 모드에서만 표시한다.

### 5.2 퀵 점프 대상 시나리오

| # | 시나리오 | 라우트/상태 | 설명 |
|---|---------|-----------|------|
| 1 | **Landing** | `/` | 첫 진입 화면 |
| 2 | **Login** | `/login` | Google OAuth 로그인 |
| 3 | **Terms** | `/terms` | 이용약관 동의 |
| 4 | **Onboarding** | `/onboarding` | 지갑 생성 & 펀딩 |
| 5 | **Trade** | `/trade` + `activeTab: "trade"` | 메인 트레이딩 뷰 |
| 6 | **Signal** | `/trade` + `activeTab: "signal"` | 유스메타 시그널 |
| 7 | **Portfolio** | `/trade` + `activeTab: "portfolio"` | 포트폴리오 |
| 8 | **Settings** | `/trade` + `activeTab: "settings"` | 설정 |
| 9 | **Order Placed** | `/trade` + 주문 실행 상태 | 주문 후 포지션 확인 |
| 10 | **Signal → Order** | `/trade` + 시그널 주문 실행 | 시그널 기반 주문 플로우 |

### 5.3 UI 디자인

```
┌─────────────────────────────────────────────┐
│ 🚀 Quick Jump                          [×]  │  ← 접기/펼치기 토글
├─────────────────────────────────────────────┤
│                                             │
│ [Landing] [Login] [Terms] [Onboarding]      │  ← 인증 플로우
│                                             │
│ [Trade] [Signal] [Portfolio] [Settings]      │  ← 메인 탭
│                                             │
│ [Order Placed] [Signal→Order]               │  ← 복합 시나리오
│                                             │
└─────────────────────────────────────────────┘
```

### 5.4 동작 방식

**표시 조건**:
```typescript
// 환경 변수 또는 URL 파라미터로 제어
const SHOW_DEV_NAV = import.meta.env.DEV ||
                     new URLSearchParams(window.location.search).has("dev");
```

**위치**: 화면 최상단, 고정 (sticky top), 모든 페이지 위에 오버레이
- 접힌 상태: 우상단 작은 FAB 버튼 (🚀) → 터치 시 펼침
- 펼친 상태: 상단 바 형태로 전체 버튼 노출
- 접기/펼치기 상태는 sessionStorage에 저장

**버튼 스타일**:
- 배경: `rgba(255, 255, 255, 0.1)` + blur backdrop
- 텍스트: `#e0e0e0`, 12px, IBM Plex Sans
- 활성 상태 (현재 위치): green border + `var(--color-pri-1)` 텍스트
- 터치 피드백: scale(0.95) + opacity 변화

### 5.5 시나리오 점프 로직

각 버튼은 **라우트 이동 + 상태 리셋/설정**을 동시에 수행한다:

```typescript
interface ScenarioJump {
  readonly label: string;
  readonly route: string;
  readonly stateOverrides: Partial<AppState>;
}

const SCENARIOS: readonly ScenarioJump[] = [
  {
    label: "Landing",
    route: "/",
    stateOverrides: {
      isLoggedIn: false,
      hasAcceptedTerms: false,
      hasCompletedOnboarding: false,
    },
  },
  {
    label: "Login",
    route: "/login",
    stateOverrides: {
      isLoggedIn: false,
      hasAcceptedTerms: false,
      hasCompletedOnboarding: false,
    },
  },
  {
    label: "Terms",
    route: "/terms",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: false,
      hasCompletedOnboarding: false,
    },
  },
  {
    label: "Onboarding",
    route: "/onboarding",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: false,
    },
  },
  {
    label: "Trade",
    route: "/trade",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: true,
      activeTab: "trade",
    },
  },
  {
    label: "Signal",
    route: "/trade",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: true,
      activeTab: "signal",
    },
  },
  {
    label: "Portfolio",
    route: "/trade",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: true,
      activeTab: "portfolio",
    },
  },
  {
    label: "Settings",
    route: "/trade",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: true,
      activeTab: "settings",
    },
  },
  {
    label: "Order Placed",
    route: "/trade",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: true,
      activeTab: "trade",
      // positions에 샘플 포지션 추가된 상태
      // toastMessage: "주문이 실행되었습니다"
    },
  },
  {
    label: "Signal→Order",
    route: "/trade",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: true,
      activeTab: "signal",
      // 시그널 주문 확인 바텀시트 자동 오픈
    },
  },
];
```

### 5.6 AppContext 확장 (퀵 점프 지원)

```typescript
// 새로운 액션 추가
type Action =
  | ... (기존 액션들)
  | { type: "JUMP_TO_SCENARIO"; overrides: Partial<AppState> }

// Reducer 처리
case "JUMP_TO_SCENARIO":
  return { ...initialState, ...action.overrides };
```

### 5.7 컴포넌트 구조

```
/src
  /components
    /dev
      - DevNav.tsx              // 퀵 점프 바 컴포넌트
      - ScenarioButton.tsx      // 개별 시나리오 버튼
  /constants
    - scenarios.ts              // 시나리오 정의 배열
```

### 5.8 키보드 숏컷 (데스크톱 시연용)

브라우저에서 시연 시 키보드로도 빠른 전환 가능:

| 단축키 | 시나리오 |
|--------|---------|
| `1` | Landing |
| `2` | Login |
| `3` | Terms |
| `4` | Onboarding |
| `5` | Trade |
| `6` | Signal |
| `7` | Portfolio |
| `8` | Settings |
| `9` | Order Placed |
| `0` | Signal→Order |
| `` ` `` (백틱) | DevNav 토글 |

```typescript
// useEffect로 키보드 이벤트 바인딩
useEffect(() => {
  if (!SHOW_DEV_NAV) return;

  const handleKeyDown = (e: KeyboardEvent) => {
    // input/textarea에 포커스가 있으면 무시
    if (e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement) return;

    const index = parseInt(e.key);
    if (!isNaN(index) && index >= 0 && index <= 9) {
      const scenario = SCENARIOS[index === 0 ? 9 : index - 1];
      jumpToScenario(scenario);
    }
    if (e.key === "`") {
      toggleDevNav();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);
```

---

## 6. 모바일 인터랙션 & 마이크로 UX

### 6.1 터치 피드백

```
모든 터치 가능한 요소에 적용:
- 버튼: active 시 scale(0.97) + opacity(0.8)
- 카드: active 시 background-color transition
- 리스트 아이템: active 시 배경 하이라이트
- 탭: active 시 scale(0.95)
```

### 6.2 모달 & 바텀시트

**현재**: 기본 Modal + BottomSheet
**개선안**:
- BottomSheet: 드래그 핸들 개선 (더 넓은 터치 영역, 시각적 bar)
- 드래그 다운으로 닫기 제스처
- 배경 딤 처리: `rgba(0, 0, 0, 0.7)` + blur
- 열림/닫힘 애니메이션: spring easing (더 자연스러운 느낌)

### 6.3 Toast 알림

**개선안**:
- 위치: 하단 → 상단으로 이동 (트레이딩 뷰에서 바텀 네비와 겹침 방지)
- 성공: Green 보더 + green 아이콘
- 에러: Red 보더 + red 아이콘 (`#ff5938`)
- 스와이프로 닫기 지원

### 6.4 페이지 전환

```
Landing → Login: slide-right
Login → Terms: slide-right
Terms → Onboarding: fade
Onboarding → Trading: fade + scale-up
Trading 탭 전환: cross-fade (no slide)
```

---

## 7. 성능 & 기술 개선

### 7.1 스타일링 전환

**현재**: React inline styles (CSSProperties)
**개선안**: CSS Variables + 유틸리티 클래스 기반

이유:
- 인라인 스타일은 pseudo-class (:hover, :active, :focus) 지원 불가
- 애니메이션/트랜지션에 제약
- 재사용성 낮음
- 번들 사이즈 불필요하게 증가

방안:
- global.css에 CSS 변수 통합 (supercycl.io 토큰 기반)
- 컴포넌트별 CSS 모듈 또는 가벼운 유틸리티 클래스 도입
- 애니메이션은 CSS keyframes로 관리 (현재 animations.css 확장)

### 7.2 폰트 로딩 최적화

```html
<!-- LineSeedSans + IBM Plex Sans preload -->
<link rel="preload" href="/fonts/LINESeedSans-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/IBMPlexSans-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/IBMPlexMono-Regular.woff2" as="font" type="font/woff2" crossorigin>
```

- `font-display: swap` 적용
- Inter 폰트 제거

### 7.3 Safe Area 강화

```css
/* 현재: BottomNav에만 적용 */
/* 개선: 전체 레이아웃에 safe area 반영 */

:root {
  --safe-top: env(safe-area-inset-top);
  --safe-bottom: env(safe-area-inset-bottom);
  --safe-left: env(safe-area-inset-left);
  --safe-right: env(safe-area-inset-right);
}

/* 상단 sticky 요소 */
.sticky-header {
  top: var(--safe-top);
  padding-top: var(--safe-top);
}

/* 하단 고정 요소 */
.fixed-bottom {
  padding-bottom: calc(var(--safe-bottom) + 8px);
}
```

---

## 8. 구현 우선순위

### Phase 1: 브랜드 정렬 (높음)
1. 컬러 팔레트 전환 (Purple → Green)
2. 폰트 변경 (Inter → LineSeedSans + IBM Plex Sans)
3. Landing 페이지 카피 & CTA 개선
4. 로고 그래디언트 변경

### Phase 2: 코어 트레이딩 UX (높음)
5. CoinInfoBar 정보 밀도 개선
6. OrderForm 인터랙션 개선
7. 차트 그래디언트 & 시간 범위 탭
8. BottomNav 4탭 확장 (Signal 탭 추가) & 아이콘 교체

### Phase 3: 유스메타 시그널 (높음)
9. Signal 데이터 모델 & constants/signals.ts
10. SignalPage 컴포넌트 (시그널 리스트 + 필터)
11. SignalCard 컴포넌트 (LONG/SHORT 카드 디자인)
12. 시그널 → 주문 연동 (확인 바텀시트 + OrderForm pre-fill)
13. 시그널 알림 배너 & 읽지 않은 수 뱃지
14. 시그널 성과 요약 헤더

### Phase 4: 시나리오 퀵 점프 (중간)
15. DevNav 컴포넌트 (FAB + 펼침 바)
16. JUMP_TO_SCENARIO 액션 & 리듀서
17. 10개 시나리오 정의 (constants/scenarios.ts)
18. 키보드 숏컷 바인딩
19. 환경 변수 / URL 파라미터 기반 표시 제어

### Phase 5: 인터랙션 품질 (중간)
20. 터치 피드백 전역 적용
21. 모달/바텀시트 제스처 개선
22. 페이지 전환 애니메이션
23. Toast 위치 & 디자인 개선

### Phase 6: 폴리시 (중간-낮음)
24. Dashboard 포지션 카드 개선
25. 빈 상태 UI
26. 스와이프 제스처
27. 스타일링 시스템 전환 (inline → CSS modules)

---

## 9. 디자인 참고 가이드라인

### supercycl.io에서 가져올 핵심 원칙

1. **대비**: 다크 배경(`#0a0a0a`) 위 밝은 텍스트(`#e0e0e0`) + Neon Green 포인트
2. **미니멀리즘**: 불필요한 장식 요소 배제, 콘텐츠와 기능에 집중
3. **구조적 레이아웃**: 그리드 기반, 명확한 시각적 위계
4. **마이크로 인터랙션**: border-color transition, padding transition 등 subtle한 변화
5. **타이포그래피 위계**: 큰 타이틀(LineSeedSans) + 깔끔한 본문(IBM Plex Sans)
6. **CTA 명확성**: Green 배경 + 다크 텍스트로 최고 시인성

### 모바일에서 하지 않을 것

- 과도한 애니메이션 (배터리 소모, 인지 부하)
- 작은 터치 타겟 (최소 44px)
- 수평 스크롤 (의도적 캐러셀 제외)
- 한 화면에 너무 많은 정보 (스크롤 가능한 섹션으로 분리)
- 시스템 폰트 대신 웹폰트 과다 사용 (3개 이내)

---

## 10. 기획 교차 검수 (Cross-Review)

> 기획서의 각 항목을 실제 코드베이스와 대조하여 **불일치, 누락, 리스크**를 식별한 결과.

### 10.1 컬러 시스템 불일치 검출

| 위치 | 현재 코드 | 기획서 TO-BE | 수정 필요 파일 |
|------|----------|-------------|--------------|
| `global.css` | `--accent-purple: #6366f1` 외 5개 purple 참조 | `--color-pri-1: #00ff6a` 등 green 계열 | `global.css` |
| `Logo.tsx` | `linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)` 하드코딩 | green 계열 그래디언트 | `Logo.tsx` |
| `LandingPage.tsx` | `linear-gradient(180deg, #0f1628, #0a0a0f)` 하드코딩 | `#0a0a0a` pure dark + green glow | `LandingPage.tsx` |
| `TermsPage.tsx` | `accent-purple` 체크박스 | green 계열 | `TermsPage.tsx` |
| `Dashboard.tsx` | `accent-purple` 카운트 뱃지 | green 계열 | `Dashboard.tsx` |
| `PositionCard.tsx` | `rgba(99,102,241,0.15)` Auto 뱃지 purple 하드코딩 | green 계열 | `PositionCard.tsx` |
| `BottomNav.tsx` | `accent-purple` 활성 탭 | green 계열 | `BottomNav.tsx` |
| `Button.tsx` | primary variant `accent-purple` | green CTA | `Button.tsx` |

**영향도**: 총 **8개 파일**에서 purple 참조를 green으로 변경해야 함. `global.css` CSS 변수를 먼저 바꾸면 `var()` 참조하는 곳은 자동 반영되지만, **하드코딩된 hex 값 7곳**은 개별 수정 필요.

### 10.2 데이터 모델 정합성 검증

**Signal 모델 vs 기존 모델 충돌 검사**:

| 항목 | 검증 결과 | 상태 |
|------|----------|------|
| Signal.coin ↔ Coin.symbol | Signal에서 사용하는 coin("BTC")이 COINS 배열의 symbol과 일치 | OK |
| Signal.pair ↔ Coin.pair | Signal "BTC-USDC" vs Coin "BTC-USDC" | OK |
| Signal.leverage ↔ MAX_LEVERAGE | 시그널 데이터에 leverage:2, MAX_LEVERAGE=2 | OK |
| Signal.entryPrice ↔ Coin.price | sig-001 BTC entryPrice 94200 vs Coin BTC price 94677 | **주의**: 시차 반영으로 자연스러우나 문서에 설명 필요 |
| Signal.stopLoss 계산 | sig-002 SOL SL 183.0 vs entry 178.5 = +2.52% | OK (SHORT이므로 위쪽 SL) |
| EXECUTE_SIGNAL_ORDER → PLACE_ORDER 연동 | 현재 PLACE_ORDER는 selectedCoin 기준으로 동작 | **수정 필요**: 시그널 코인으로 SELECT_COIN 먼저 dispatch 필요 |

**발견된 문제**:
1. `PLACE_ORDER` 액션이 `state.selectedCoin`에 의존 → 시그널 주문 시 **코인 전환이 선행되어야 함**
2. `PLACE_ORDER`의 가격 계산이 `state.selectedCoin.price` 기준 → 시그널의 `entryPrice`를 사용해야 함
3. 기존 `orderType`이 "limit" | "market" | "conditional"인데 시그널 주문은 항상 "limit"으로 강제해야 함

### 10.3 상태 관리 충돌 분석

**activeTab 타입 확장 영향**:

```
현재: "trade" | "portfolio" | "settings"
변경: "trade" | "signal" | "portfolio" | "settings"
```

영향 받는 파일:
| 파일 | 영향 | 수정 내용 |
|------|------|----------|
| `AppContext.tsx` | AppState 타입, Action 타입, reducer | 타입 확장 + signalState 추가 + 새 액션 3개 |
| `BottomNav.tsx` | tabs 배열, Tab 타입 | Signal 탭 추가 |
| `TradingPage.tsx` | 탭 콘텐츠 렌더링 switch | `"signal"` 케이스 추가 |

**QuickJump JUMP_TO_SCENARIO 리스크**:
- `{ ...initialState, ...action.overrides }` 패턴은 signalState, positions 등 중첩 객체를 shallow merge → **signalState 내부 프로퍼티가 누락될 수 있음**
- 해결: spread 시 중첩 객체는 별도 처리 필요

```typescript
// 문제가 되는 패턴
case "JUMP_TO_SCENARIO":
  return { ...initialState, ...action.overrides };
  // ⚠️ action.overrides.signalState가 없으면 initialState.signalState 사용 → OK
  // ⚠️ action.overrides.signalState가 부분 객체면 → 필드 누락 가능

// 안전한 패턴
case "JUMP_TO_SCENARIO":
  return {
    ...initialState,
    ...action.overrides,
    signalState: { ...initialState.signalState, ...action.overrides.signalState },
  };
```

### 10.4 컴포넌트 라인 수 검증 (코딩 스타일 규칙 준수)

> 규칙: 파일 200-400줄 적정, 800줄 max

| 파일 | 현재 줄수 | 개선 후 예상 | 위험 |
|------|----------|------------|------|
| `AppContext.tsx` | 142 | ~220 (Signal 상태 추가) | OK |
| `TradingPage.tsx` | 87 | ~120 (Signal 탭 추가) | OK |
| `OrderForm.tsx` | 143 | ~160 (pre-fill 로직 추가) | OK |
| `BottomNav.tsx` | 65 | ~85 (4탭 + 뱃지) | OK |
| `SignalPage.tsx` (신규) | 0 | ~150 (리스트 + 필터 + 성과요약) | OK |
| `SignalCard.tsx` (신규) | 0 | ~120 (카드 + CTA) | OK |
| `SignalOrderSheet.tsx` (신규) | 0 | ~100 (확인 바텀시트) | OK |
| `DevNav.tsx` (신규) | 0 | ~130 (FAB + 바 + 키보드) | OK |

모든 파일이 400줄 이내로 유지 가능. 위반 리스크 없음.

### 10.5 누락 항목 발견

| # | 누락 항목 | 설명 | 심각도 |
|---|----------|------|--------|
| 1 | **Signal → OrderForm pre-fill 메커니즘** | "수정하기" 버튼 시 OrderForm에 값 전달하는 구체적 상태 흐름 미정의 | HIGH |
| 2 | **BottomNav 4탭 레이아웃** | 428px에 4탭 배치 시 터치 타겟 44px 보장 검증 필요 | MEDIUM |
| 3 | **시그널 필터 "CLOSED" 정의** | 필터에 "CLOSED"가 있으나 Signal.status에는 없음 → HIT_TP + HIT_SL + EXPIRED + CANCELLED 의 합집합인지 명시 필요 | MEDIUM |
| 4 | **Google SVG 아이콘 중복** | LandingPage.tsx와 LoginPage.tsx에 동일 SVG 하드코딩 → 공통 컴포넌트 추출 필요 | LOW |
| 5 | **시그널 빈 상태 UI** | 시그널이 없을 때의 empty state 디자인 미정의 | LOW |
| 6 | **DevNav z-index 충돌** | DevNav z-index vs Modal(100) vs Toast(200) 간 레이어 우선순위 미정의 | LOW |

### 10.6 검수 결과 요약

```
총 검수 항목: 32개
  ✅ 정상: 23개
  ⚠️ 수정 필요: 6개
  ❌ 누락/불일치: 3개

주요 액션 아이템:
1. [HIGH] Signal → Trade pre-fill 상태 흐름 정의 추가
2. [HIGH] PLACE_ORDER 액션 확장 (시그널 기반 주문 지원)
3. [MEDIUM] JUMP_TO_SCENARIO 중첩 객체 deep merge 패턴 적용
4. [MEDIUM] 필터 "CLOSED" = HIT_TP | HIT_SL | EXPIRED | CANCELLED 명시
5. [MEDIUM] 4탭 터치 타겟 계산 검증 (428px ÷ 4 = 107px → 44px 이상 OK)
6. [LOW] Google SVG 아이콘 공통 컴포넌트화
```

---

## 11. 구현 계획 (Implementation Plan)

> 교차 검수 결과를 반영한 파일 단위 구현 명세.
> 각 Phase별로 **수정 파일, 변경 내용, 의존성**을 명시한다.

### 11.1 Phase 1: 브랜드 정렬

#### Task 1-1: CSS 변수 전면 교체
**파일**: `mockup/src/styles/global.css`
**변경**:
```css
/* 삭제 */
--accent-purple: #6366f1;
--bg-primary: #0a0a0f;
--bg-secondary: #12121a;
--bg-card: #1a1a2e;
--bg-input: #1e1e30;
--bg-hover: #2a2a3e;
--border-color: #2a2a3e;
--border-light: #1e1e30;

/* 추가 */
--color-pri-1: #00ff6a;
--color-pri-2: #37ff00;
--color-pri-3: #00de0b;
--color-bg: #0a0a0a;
--color-bg-surface: #0b0b0b;
--color-bg-card: #222222;
--color-bg-input: #1a1a1a;
--color-bg-hover: #2a2a2a;
--color-bg-g: #092900;
--color-gray-1: #e0e0e0;
--color-gray-2: #9f9f9f;
--color-gray-3: #4b4b4b;
--color-error: #ff5938;
--border-color: #4b4b4b;
--border-light: #222222;
```
**호환성 유지**: 기존 `--accent-green`, `--accent-red`, `--accent-yellow` 변수명은 유지 (값만 매핑 변경)
**의존성**: 없음 (최초 작업)

#### Task 1-2: 하드코딩 Purple 제거
**파일 목록 (7곳)**:
| 파일 | 줄 | AS-IS | TO-BE |
|------|-----|-------|-------|
| `Logo.tsx` | gradient | `#6366f1, #8b5cf6, #a78bfa` | `#00ff6a, #37ff00, #00de0b` |
| `LandingPage.tsx` | background | `#0f1628...#0a0a0f` | `#0a0a0a` + green glow |
| `PositionCard.tsx` | Auto badge | `rgba(99,102,241,0.15)` | `rgba(0,255,106,0.12)` |
| `Button.tsx` | primary variant | `var(--accent-purple)` | `var(--color-pri-2)` |
| `Dashboard.tsx` | count badge | `var(--accent-purple)` | `var(--color-pri-1)` |
| `BottomNav.tsx` | active tab | `var(--accent-purple)` | `var(--color-pri-1)` |
| `TermsPage.tsx` | checkbox accent | `var(--accent-purple)` | `var(--color-pri-1)` |

**의존성**: Task 1-1 완료 후

#### Task 1-3: 폰트 변경
**파일**:
- `mockup/index.html`: Google Inter CDN 제거, LineSeedSans + IBM Plex Sans 로컬 preload 추가
- `mockup/src/styles/global.css`: `--font-family` 변수 변경
- `mockup/public/fonts/`: woff2 파일 배치 (LineSeedSans-Regular, LineSeedSans-Bold, IBMPlexSans-Regular, IBMPlexSans-Medium, IBMPlexSans-SemiBold, IBMPlexMono-Regular)

**의존성**: 없음 (Task 1-1과 병렬 가능)

#### Task 1-4: Landing 페이지 리디자인
**파일**: `mockup/src/pages/LandingPage.tsx`
**변경**:
- Hero 카피: "Welcome to Supercycl" → "Trade Different,\nRide the Supercycl"
- 서브 카피 추가
- CTA 버튼: green background + dark text
- 배경: green glow gradient
- 진입 순차 애니메이션 (CSS animation-delay 활용)

**의존성**: Task 1-1, 1-2, 1-3 완료 후

### 11.2 Phase 2: 코어 트레이딩 UX

#### Task 2-1: CoinInfoBar 강화
**파일**: `mockup/src/components/trading/CoinInfoBar.tsx`
**변경**:
- Chevron 아이콘 추가 (dropdown 인디케이터)
- 가격 변동률 컬러 뱃지 (배경색 포함)
- `backdrop-filter: blur(12px)` 추가
- Coin 타입에 `high24h`, `low24h` 프로퍼티 추가 고려 → **결정: 목업이므로 하드코딩 값 사용**

**의존성**: Phase 1 완료 후

#### Task 2-2: Chart Green 전환 + 시간 탭
**파일**: `mockup/src/components/trading/Chart.tsx`
**변경**:
- SVG gradient stop color: purple → green
- 시간 범위 탭 UI 추가 (1H, 4H, 1D, 1W) — 목업이므로 탭 UI만, 데이터 변경 없음
- 차트 높이: 200px → 240px

**의존성**: Phase 1 완료 후

#### Task 2-3: OrderForm 디자인 개선
**파일**: `mockup/src/components/trading/OrderForm.tsx`
**변경**:
- 활성 탭 underline → green
- 퍼센트 슬라이더 트랙 green
- 입력 필드 포커스 시 border green
- **시그널 pre-fill 지원 준비**: props에 `prefillData?: SignalPrefill` 추가

```typescript
interface SignalPrefill {
  readonly coin: Coin;
  readonly price: number;
  readonly leverage: number;
  readonly tp: number;
  readonly sl: number;
  readonly side: "Long" | "Short";
}
```

**의존성**: Phase 1 완료 후, Signal pre-fill은 Phase 3에서 연동

#### Task 2-4: BottomNav 4탭 확장
**파일**: `mockup/src/components/layout/BottomNav.tsx`
**변경**:
```typescript
// AS-IS
const tabs = [
  { key: "trade", label: "Trade", icon: "📊" },
  { key: "portfolio", label: "Portfolio", icon: "📈" },
  { key: "settings", label: "Settings", icon: "⚙" },
];

// TO-BE
const tabs = [
  { key: "trade", label: "Trade", icon: "📊" },
  { key: "signal", label: "Signal", icon: "⚡" },
  { key: "portfolio", label: "Portfolio", icon: "📈" },
  { key: "settings", label: "Settings", icon: "⚙" },
];
```
- unreadCount 뱃지 렌더링 (props로 전달 또는 context에서 읽기)
- 터치 타겟 검증: 428px ÷ 4 = 107px per tab → 44px minimum 충족

**의존성**: AppContext activeTab 타입 확장 (Task 2-5)

#### Task 2-5: AppContext 타입 확장
**파일**: `mockup/src/context/AppContext.tsx`
**변경**:
- `activeTab` 타입에 `"signal"` 추가
- `SignalState` 인터페이스 추가 (signals, unreadCount, filter)
- `signalState` 프로퍼티를 AppState에 추가
- initialState에 signalState 기본값 설정

```typescript
const initialSignalState: SignalState = {
  signals: MOCK_SIGNALS,
  unreadCount: 2,  // ACTIVE 시그널 수
  filter: "ALL",
};
```

**의존성**: 없음 (Phase 2 최초 작업)

### 11.3 Phase 3: 유스메타 시그널

#### Task 3-1: 시그널 상수 & 타입 정의
**신규 파일**: `mockup/src/constants/signals.ts`
**내용**:
- `Signal` 인터페이스 export
- `SignalState` 인터페이스 export
- `MOCK_SIGNALS` 상수 export (5개 시그널)
- `SignalPrefill` 인터페이스 export
- `SIGNAL_STATS` 상수 (성과 요약 데이터)

```typescript
export const SIGNAL_STATS = {
  hitCount: 23,
  missCount: 7,
  expiredCount: 2,
  avgPnlPercent: 1.82,
  hitRate: 71.9,
} as const;
```

**의존성**: 없음

#### Task 3-2: AppContext 리듀서 확장
**파일**: `mockup/src/context/AppContext.tsx`
**변경** (Task 2-5에서 타입만 추가한 상태에서 이어서):
- 새 액션 추가:

```typescript
| { type: "SET_SIGNAL_FILTER"; filter: SignalState["filter"] }
| { type: "MARK_SIGNALS_READ" }
| { type: "EXECUTE_SIGNAL_ORDER"; signalId: string }
| { type: "PREFILL_FROM_SIGNAL"; prefill: SignalPrefill }
```

- `SET_SIGNAL_FILTER`: signalState.filter 업데이트
- `MARK_SIGNALS_READ`: unreadCount → 0
- `EXECUTE_SIGNAL_ORDER`:
  1. Signal에서 Coin 찾기
  2. SELECT_COIN 효과
  3. PLACE_ORDER와 유사하지만 Signal.entryPrice 기반
  4. Signal status는 변경하지 않음 (목업)
- `PREFILL_FROM_SIGNAL`:
  1. selectedCoin 변경
  2. leverage 변경
  3. activeTab → "trade"
  4. **별도 prefillData 상태에 저장** (OrderForm이 읽고 초기화)

**교차 검수 반영**:
- "CLOSED" 필터는 `status !== "ACTIVE"` 로 처리
- EXECUTE_SIGNAL_ORDER에서 `selectedCoin` 전환 선행 포함

**의존성**: Task 3-1

#### Task 3-3: SignalCard 컴포넌트
**신규 파일**: `mockup/src/components/trading/SignalCard.tsx`
**Props**: `signal: Signal`, `onExecute: (id: string) => void`, `onModify: (id: string) => void`
**구조**:
- Row 1: 방향 배지 (LONG green / SHORT red) + pair + relative time
- Row 2: Entry → Target (화살표)
- Row 3: SL + Leverage
- Row 4: Confidence dots (●●●○ 패턴)
- Row 5: reasoning (text-overflow: ellipsis)
- Row 6: CTA 버튼 (ACTIVE일 때만)
- 종료 시그널: dimmed + 상태 배지 + PnL

**예상 줄수**: ~120줄
**의존성**: Task 3-1

#### Task 3-4: SignalOrderSheet 컴포넌트
**신규 파일**: `mockup/src/components/modals/SignalOrderSheet.tsx`
**Props**: `signal: Signal`, `onExecute: () => void`, `onModify: () => void`, `onClose: () => void`
**구조**:
- BottomSheet 기반
- 시그널 정보 요약 (코인, 방향, 가격, 레버리지, TP/SL)
- 수량 자동 계산 (ACCOUNT.balance 기반)
- "수정하기" 버튼 → `onModify` (prefill 후 Trade 탭 이동)
- "주문 실행" 버튼 → `onExecute` (즉시 주문)

**예상 줄수**: ~100줄
**의존성**: Task 3-1, BottomSheet 컴포넌트 (기존)

#### Task 3-5: SignalPage 컴포넌트
**신규 파일**: `mockup/src/pages/SignalPage.tsx`
**구조**:
1. 헤더: "YouthMeta Signals" + 알림 아이콘 with unread count
2. 성과 요약 카드 (SIGNAL_STATS)
3. 필터 탭 바: [ALL] [LONG] [SHORT] [ACTIVE] [CLOSED] (pill 스타일)
4. 시그널 리스트 (SignalCard 반복)
5. 빈 상태 UI (필터 결과 없을 때)
6. SignalOrderSheet (선택된 시그널)

**로컬 state**:
- `selectedSignalId: string | null` (바텀시트 표시용)

**필터 로직**:
```typescript
const filtered = signals.filter(s => {
  if (filter === "ALL") return true;
  if (filter === "LONG") return s.direction === "LONG";
  if (filter === "SHORT") return s.direction === "SHORT";
  if (filter === "ACTIVE") return s.status === "ACTIVE";
  if (filter === "CLOSED") return s.status !== "ACTIVE";
  return true;
});
```

**예상 줄수**: ~150줄
**의존성**: Task 3-2, 3-3, 3-4

#### Task 3-6: TradingPage에 Signal 탭 연동
**파일**: `mockup/src/pages/TradingPage.tsx`
**변경**:
- import SignalPage
- 탭 렌더링에 `"signal"` 케이스 추가
- Signal 탭 진입 시 `MARK_SIGNALS_READ` dispatch
- `signalState` context에서 가져오기 추가

```typescript
// 기존 탭 렌더링 switch 확장
{activeTab === "signal" && <SignalPage />}
```

**의존성**: Task 3-5, Task 2-4

#### Task 3-7: 시그널 알림 배너
**신규 파일**: `mockup/src/components/common/SignalBanner.tsx`
**구조**:
- 화면 상단 fixed, z-index: 150
- slideDown 애니메이션으로 등장
- 3초 후 slideUp으로 퇴장
- 터치 시 Signal 탭으로 이동

**목업 동작**: DevNav에서 "시그널 도착" 시나리오 트리거 시 표시

**예상 줄수**: ~60줄
**의존성**: animations.css (slideDown 키프레임 기존 존재)

### 11.4 Phase 4: 시나리오 퀵 점프

#### Task 4-1: 시나리오 상수 정의
**신규 파일**: `mockup/src/constants/scenarios.ts`
**내용**: 10개 ScenarioJump 객체 배열 (섹션 5.5에 정의된 것 그대로)
**의존성**: AppState 타입 확장 완료 (Phase 2-3)

#### Task 4-2: AppContext JUMP_TO_SCENARIO 액션
**파일**: `mockup/src/context/AppContext.tsx`
**변경**:
```typescript
case "JUMP_TO_SCENARIO":
  return {
    ...initialState,
    ...action.overrides,
    signalState: {
      ...initialState.signalState,
      ...(action.overrides.signalState ?? {}),
    },
  };
```
**교차 검수 반영**: 중첩 객체 deep merge 패턴 적용
**의존성**: Task 4-1

#### Task 4-3: DevNav 컴포넌트
**신규 파일**: `mockup/src/components/dev/DevNav.tsx`
**구조**:
- SHOW_DEV_NAV 조건부 렌더링
- FAB 토글 (접힘/펼침)
- 시나리오 버튼 그리드 (3행: 인증 플로우 / 메인 탭 / 복합 시나리오)
- `useNavigate` + `dispatch(JUMP_TO_SCENARIO)` 조합
- 키보드 숏컷 useEffect
- sessionStorage 상태 저장
- z-index: **250** (Toast 200, Modal 100 위에 표시)

**예상 줄수**: ~130줄
**의존성**: Task 4-1, 4-2

#### Task 4-4: App.tsx에 DevNav 마운트
**파일**: `mockup/src/App.tsx`
**변경**:
```typescript
import { DevNav } from "./components/dev/DevNav";

// Router 내부, Routes 위에 배치
<DevNav />
<Routes>...</Routes>
```
**의존성**: Task 4-3

### 11.5 Phase 5-6: 인터랙션 & 폴리시 (요약)

이 단계는 기능 변경 없이 **시각/인터랙션 품질** 향상이므로 파일 단위 명세 대신 작업 카테고리로 정리:

| 작업 | 대상 파일 | 설명 |
|------|----------|------|
| 터치 피드백 | Button.tsx, BottomNav.tsx, SignalCard.tsx, PositionCard.tsx | `:active` pseudo-class → CSS 클래스 전환 필요 (inline style 한계) |
| 모달 제스처 | BottomSheet.tsx, Modal.tsx | 드래그 닫기: `touchstart`/`touchmove`/`touchend` 이벤트 핸들링 |
| 페이지 전환 | App.tsx | `react-router` + CSS 트랜지션 또는 `framer-motion` 도입 고려 |
| Toast 개선 | Toast.tsx | 위치 상단 이동, 타입별 아이콘/보더 분기 |
| 포지션 카드 | PositionCard.tsx | PnL 기반 보더 색상, glow 효과 |
| 빈 상태 UI | Dashboard.tsx, SignalPage.tsx | 일러스트레이션 + CTA 버튼 |
| Google 아이콘 추출 | 신규 `GoogleIcon.tsx` | LandingPage + LoginPage에서 중복 SVG 제거 |
| 스타일 시스템 전환 | 전체 컴포넌트 | inline style → CSS modules (대규모 리팩터, 별도 PR 권장) |

### 11.6 신규 파일 목록 총정리

```
mockup/src/
├── constants/
│   ├── signals.ts          ← NEW (Signal 타입 + 목업 데이터 + 성과 통계)
│   └── scenarios.ts        ← NEW (10개 시나리오 정의)
├── pages/
│   └── SignalPage.tsx       ← NEW (시그널 메인 페이지)
├── components/
│   ├── trading/
│   │   └── SignalCard.tsx   ← NEW (시그널 카드 컴포넌트)
│   ├── modals/
│   │   └── SignalOrderSheet.tsx  ← NEW (시그널 주문 확인 바텀시트)
│   ├── common/
│   │   ├── SignalBanner.tsx  ← NEW (인앱 알림 배너)
│   │   └── GoogleIcon.tsx    ← NEW (공통 SVG 아이콘, Phase 6)
│   └── dev/
│       └── DevNav.tsx        ← NEW (개발용 퀵 점프 네비게이션)
└── public/
    └── fonts/                ← NEW (LineSeedSans, IBM Plex Sans, IBM Plex Mono)
```

**신규 파일: 8개** | **수정 파일: 12개** | **총 영향 파일: 20개**

### 11.7 의존성 그래프 & 작업 순서

```
Phase 1 (병렬 가능)
  ├─ Task 1-1 (global.css)
  ├─ Task 1-3 (폰트) ──────────────────────────────┐
  └─ Task 1-2 (purple 제거) ← depends on 1-1       │
       └─ Task 1-4 (Landing) ← depends on 1-1,1-2,1-3
                                                     │
Phase 2 (순차 시작, 내부 병렬)                        │
  ├─ Task 2-5 (AppContext 타입) ← 독립, 먼저 시작    │
  ├─ Task 2-1 (CoinInfoBar) ← Phase 1 후            │
  ├─ Task 2-2 (Chart) ← Phase 1 후                  │
  ├─ Task 2-3 (OrderForm) ← Phase 1 후              │
  └─ Task 2-4 (BottomNav) ← Task 2-5 후             │
                                                     │
Phase 3 (순차)                                       │
  ├─ Task 3-1 (signals.ts) ← 독립                   │
  ├─ Task 3-2 (AppContext 리듀서) ← Task 2-5, 3-1   │
  ├─ Task 3-3 (SignalCard) ← Task 3-1               │
  ├─ Task 3-4 (SignalOrderSheet) ← Task 3-1         │
  ├─ Task 3-5 (SignalPage) ← Task 3-2, 3-3, 3-4    │
  ├─ Task 3-6 (TradingPage 연동) ← Task 3-5, 2-4   │
  └─ Task 3-7 (SignalBanner) ← Task 3-2             │
                                                     │
Phase 4 (Phase 3 완료 후)                            │
  ├─ Task 4-1 (scenarios.ts) ← Phase 3 완료         │
  ├─ Task 4-2 (JUMP_TO_SCENARIO) ← Task 4-1        │
  ├─ Task 4-3 (DevNav) ← Task 4-1, 4-2             │
  └─ Task 4-4 (App.tsx 마운트) ← Task 4-3           │
                                                     │
Phase 5-6: 독립적 폴리시 작업 (순서 무관)             │
```
