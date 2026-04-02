# BottomNav

앱 하단에 고정되는 탭 네비게이션. 4개의 주요 섹션(Trade, Signal, Portfolio, Settings) 간 이동에 사용한다.

---

## 사용 시점

- TradingPage의 메인 네비게이션으로 사용
- 앱 전체에서 항상 화면 하단에 고정 표시
- 4개의 주요 탭 간 전환

---

## 기본 사용법

```tsx
import { BottomNav } from '@components';
import type { TabItem, TabKey } from '@components';

const tabs: readonly TabItem[] = [
  {
    key: 'trade',
    label: 'Trade',
    icon: (active: boolean) => <TradeIcon color={active ? 'var(--c-nav-icon-active)' : 'var(--c-nav-icon-inactive)'} />,
  },
  {
    key: 'signal',
    label: 'Signal',
    icon: (active: boolean) => <SignalIcon color={active ? 'var(--c-nav-icon-active)' : 'var(--c-nav-icon-inactive)'} />,
  },
  {
    key: 'portfolio',
    label: 'Portfolio',
    icon: (active: boolean) => <PortfolioIcon color={active ? 'var(--c-nav-icon-active)' : 'var(--c-nav-icon-inactive)'} />,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: (active: boolean) => <SettingsIcon color={active ? 'var(--c-nav-icon-active)' : 'var(--c-nav-icon-inactive)'} />,
  },
];

function TradingPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('trade');

  return (
    <>
      {/* 탭별 콘텐츠 */}
      {activeTab === 'trade' && <TradeView />}
      {activeTab === 'signal' && <SignalView />}
      {activeTab === 'portfolio' && <PortfolioView />}
      {activeTab === 'settings' && <SettingsView />}

      <BottomNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </>
  );
}
```

---

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `tabs` | `readonly TabItem[]` | (필수) | 탭 항목 배열 |
| `activeTab` | `TabKey` | (필수) | 현재 활성 탭 키 |
| `onTabChange` | `(tab: TabKey) => void` | (필수) | 탭 변경 핸들러 |
| `style` | `CSSProperties` | `undefined` | nav 스타일 오버라이드 |

### TabItem 타입

```tsx
type TabKey = 'trade' | 'signal' | 'portfolio' | 'settings';

interface TabItem {
  readonly key: TabKey;
  readonly label: string;
  readonly icon: (active: boolean) => ReactNode;
}
```

### Export 타입

```tsx
export type { TabKey, TabItem, BottomNavProps };
```

---

## 스타일 사양

| 속성 | 토큰 | 실제 값 |
|------|------|---------|
| 배경 | `--c-nav-bg` | #050505 |
| 높이 | `--c-nav-height` | 50px |
| 상단 보더 | `--c-nav-border-top` | 1px solid #242424 |
| z-index | `--c-nav-z` | 50 |
| 활성 아이콘 | `--c-nav-icon-active` | #ffffff |
| 비활성 아이콘 | `--c-nav-icon-inactive` | #7a7a7a |
| 라벨 폰트 | `--c-nav-label-size` | 11px |
| 최대 너비 | 하드코딩 | 360px |

### 탭 상태별 스타일

| 상태 | 아이콘 색상 | 라벨 굵기 |
|------|----------|----------|
| 활성 | `--c-nav-icon-active` (#ffffff) | medium (500) |
| 비활성 | `--c-nav-icon-inactive` (#7a7a7a) | regular (400) |

---

## 아이콘 함수 패턴

`icon` prop은 활성 상태를 인자로 받는 함수다. 활성/비활성에 따라 아이콘 색상이나 스타일을 변경할 수 있다.

```tsx
// SVG 아이콘 예시
const tradeIcon = (active: boolean): ReactNode => (
  <svg width="20" height="20" viewBox="0 0 20 20">
    <path
      d="M..."
      fill={active ? 'var(--c-nav-icon-active)' : 'var(--c-nav-icon-inactive)'}
    />
  </svg>
);

// 또는 filled/outlined 변경
const portfolioIcon = (active: boolean): ReactNode =>
  active ? <PortfolioFilledIcon /> : <PortfolioOutlinedIcon />;
```

---

## 접근성

| 항목 | 구현 상태 | 설명 |
|------|----------|------|
| role="tablist" | PASS | `<nav>`에 올바르게 설정 |
| role="tab" | PASS | 각 버튼에 설정 |
| aria-selected | PASS | 활성 탭에 `aria-selected="true"` |
| aria-label (nav) | PASS | "Main navigation" |
| aria-label (tab) | PASS | 각 탭에 label 텍스트 |
| 키보드 Enter/Space | PASS | onKeyDown 핸들러 |
| tabIndex 관리 | PASS | 활성 탭만 `tabIndex={0}`, 나머지 `-1` |
| 비활성 탭 대비 | **P0 수정 필요** | #7a7a7a (4.89:1) 적용 시 PASS |
| 포커스 표시자 | **P2** | outline 없음, `:focus-visible` 필요 |
| Arrow 키 내비게이션 | **P2** | WAI-ARIA tablist 패턴 미구현 |

### 키보드 동작

| 키 | 동작 |
|-----|------|
| `Tab` | 활성 탭으로 포커스 이동 (비활성 탭은 건너뜀) |
| `Enter` | 탭 활성화 |
| `Space` | 탭 활성화 |
| `ArrowRight/ArrowDown` | 다음 탭으로 이동 (미구현, **P2**) |
| `ArrowLeft/ArrowUp` | 이전 탭으로 이동 (미구현, **P2**) |

### WAI-ARIA Tablist 패턴

현재 Enter/Space만 지원한다. 완전한 WAI-ARIA tablist 패턴은 Arrow 키로 탭 간 이동을 지원해야 한다. 접근성 보고서 P2 항목으로 개선이 권장된다.

---

## 레이아웃 주의사항

BottomNav는 `position: fixed`로 하단에 고정된다. 콘텐츠가 BottomNav 뒤에 가려지지 않도록 페이지 하단에 여백을 확보해야 한다.

```tsx
// 페이지 콘텐츠에 하단 여백 추가
const pageStyle: CSSProperties = {
  paddingBottom: '60px', // nav height(50px) + 여유
};
```

---

## Do / Don't

### DO

- 4개의 주요 섹션에만 사용한다
- icon 함수에서 active 상태에 따라 시각적 차이를 준다
- 라벨을 짧고 명확하게 작성한다 (한 단어)
- 콘텐츠 영역에 BottomNav 높이만큼 하단 여백을 확보한다

```tsx
// DO: 명확한 라벨 + 아이콘 상태 반영
const tabs: TabItem[] = [
  { key: 'trade', label: 'Trade', icon: (active) => <TradeIcon active={active} /> },
];
```

### DON'T

- 5개 이상의 탭을 넣지 않는다
- 탭 라벨에 긴 텍스트를 사용하지 않는다
- icon 함수에서 active 상태를 무시하지 않는다
- BottomNav를 조건부로 숨기지 않는다 (일관된 네비게이션)

```tsx
// DON'T: 긴 라벨
{ key: 'portfolio', label: 'My Portfolio & History', icon: ... }

// DON'T: 활성 상태 무시
{ key: 'trade', label: 'Trade', icon: () => <TradeIcon /> }

// DO: 활성 상태 반영
{ key: 'trade', label: 'Trade', icon: (active) => <TradeIcon active={active} /> }
```
