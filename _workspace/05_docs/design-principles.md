# 설계 원칙

Supercycl 디자인 시스템의 핵심 원칙. 모든 디자인 결정과 컴포넌트 구현은 이 원칙을 따른다.

---

## 1. Dark-First

Supercycl은 다크 테마 전용 앱이다. 모든 색상, 대비, 그림자는 어두운 배경(`#050505`)을 기준으로 설계한다.

### 적용 예시

- 페이지 배경: `--s-surface-page` (#050505)
- 카드 배경: `--s-surface-card` (#242424)
- 텍스트: `--s-text-primary` (#ffffff), `--s-text-secondary` (#9f9f9f)
- 그림자: 높은 불투명도(`rgba(0,0,0,0.3~0.6)`)로 어두운 배경에서도 깊이감 표현

### 의사결정 기준

- 밝은 테마를 고려하지 않는다. 다크 전용이므로 `prefers-color-scheme` 분기가 없다.
- 대비비는 어두운 배경 기준으로 WCAG 2.1 AA(4.5:1)를 충족해야 한다.
- 글래스모픽 효과(`backdrop-filter: blur`)는 어두운 반투명 배경에서만 적용한다.

---

## 2. Token-Driven

하드코딩된 값을 사용하지 않는다. 모든 시각적 속성은 3계층 토큰을 통해 제어한다.

### 3-Tier 토큰 체계

| 계층 | 접두사 | 역할 | 사용처 |
|------|--------|------|--------|
| Primitive | `--p-*` | 원시값 (색상 팔레트, 크기) | 시맨틱 토큰의 원본. 컴포넌트에서 직접 참조 금지 |
| Semantic | `--s-*` | 의미 기반 (surface, text, border) | 컴포넌트 개발 시 주로 사용하는 API |
| Component | `--c-*` | 컴포넌트 전용 (button, input) | 특정 컴포넌트의 세밀한 제어 |

### 올바른 사용

```tsx
// DO: 시맨틱 또는 컴포넌트 토큰 사용
const style: CSSProperties = {
  background: 'var(--s-surface-card)',
  color: 'var(--s-text-primary)',
  borderRadius: 'var(--c-card-radius)',
};

// DON'T: 하드코딩된 값 사용
const style: CSSProperties = {
  background: '#242424',
  color: '#ffffff',
  borderRadius: '4px',
};
```

### TypeScript 객체 접근

```tsx
import { tokens } from '@tokens/tokens';

const style: CSSProperties = {
  background: tokens.semantic.color.surface.card,
  color: tokens.semantic.color.text.primary,
};
```

---

## 3. Mobile-Native

360px 고정 너비, 모바일 전용. 반응형 브레이크포인트나 미디어 쿼리를 사용하지 않는다.

### 레이아웃 규칙

- 최대 너비: 360px (모든 컴포넌트)
- 레이아웃: Flexbox 기반 (Grid 사용 최소화)
- 터치 타겟: 최소 44px (WCAG 2.5.5)
- 고정 요소: BottomNav(하단 50px), Header(상단 56px)

### 간격 체계

4px 기본 그리드. `--p-space-*` 토큰을 사용한다.

```
2px (0.5) → 4px (1) → 6px (1.5) → 8px (2) → 10px (2.5) → 12px (3)
→ 14px (3.5) → 16px (4) → 18px (4.5) → 20px (5) → 24px (6)
```

### 스크롤 영역 계산

```
콘텐츠 높이 = 100vh - Header(56px) - BottomNav(50px)
           = 100vh - 106px
```

---

## 4. Accessible

WCAG 2.1 AA 기준을 준수한다. 접근성은 선택이 아니라 필수 요구사항이다.

### 핵심 기준

| 항목 | 기준 | 검증 방법 |
|------|------|----------|
| 색상 대비 | 일반 텍스트 4.5:1, 대형 텍스트 3:1 | 대비비 매트릭스 참조 |
| 키보드 접근 | 모든 인터랙티브 요소에 키보드 도달 가능 | Tab, Enter, Space, Escape |
| ARIA 시맨틱 | dialog, tablist, alert, status 패턴 | 스크린리더 테스트 |
| 포커스 관리 | Modal/Sheet 포커스 트랩, 포커스 복원 | 키보드 내비게이션 테스트 |
| 모션 감소 | `prefers-reduced-motion` 존중 | 시스템 설정 변경 후 확인 |

### 컴포넌트별 패턴

```tsx
// Modal: role="dialog" + aria-modal
<div role="dialog" aria-modal="true" aria-label={title}>

// Toast: role="status" + aria-live
<div role="status" aria-live="polite" aria-atomic="true">

// BottomNav: role="tablist" + role="tab"
<nav role="tablist" aria-label="Main navigation">
  <button role="tab" aria-selected={isActive}>
```

---

## 5. Trading-Optimized

크립토 트레이딩 도메인에 최적화된 시각 언어를 사용한다.

### 트레이딩 색상 체계

| 의미 | 시맨틱 토큰 | 색상 | 용도 |
|------|------------|------|------|
| 매수 / 롱 / 수익 | `--s-trading-buy` | #00de0b (Green) | 매수 버튼, PnL 양수, 롱 포지션 |
| 매도 / 숏 / 손실 | `--s-trading-sell` | #ff5938 (Red) | 매도 버튼, PnL 음수, 숏 포지션 |
| 중립 | `--s-trading-neutral` | #9f9f9f (Gray) | 변동 없음, 대기 상태 |

### 트레이딩 버튼 스타일

Buy/Sell 버튼은 일반 버튼과 다른 스타일을 적용한다:
- 작은 border-radius (`4px` vs 일반 `32px`)
- 어두운 텍스트 (`#0a0a0a`) on 밝은 배경
- semibold 폰트 웨이트

### 숫자 표시 규칙

- 가격: 모노스페이스 폰트 (`--s-font-family-mono`)
- 양수: 녹색 (`--s-trading-profit`)
- 음수: 빨간색 (`--s-trading-loss`)
- 퍼센트: 부호 포함 표시 (+12.34%, -5.67%)

---

## 코드 컨벤션

### 스타일링

인라인 `CSSProperties` 객체를 사용한다. Tailwind, CSS Modules, styled-components를 사용하지 않는다.

```tsx
// 스타일 상수는 파일 상단에 정의
const containerStyle: CSSProperties = {
  background: 'var(--s-surface-card)',
  padding: 'var(--p-space-3)',
  borderRadius: 'var(--c-card-radius)',
};

// 컴포넌트 내에서 조건부 스타일 합성
const computedStyle: CSSProperties = {
  ...containerStyle,
  ...(isActive ? activeStyle : undefined),
  ...style, // 외부 style prop은 마지막에 병합
};
```

### Props 타입

```tsx
// readonly modifier 필수
interface Props {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly disabled?: boolean;
  readonly style?: CSSProperties;
}
```

### 상태 관리

불변 업데이트만 허용한다.

```tsx
// DO: 새 객체 생성
dispatch({ type: 'SET_LEVERAGE', payload: newLeverage });
// reducer: return { ...state, leverage: action.payload };

// DON'T: 직접 변경
state.leverage = newLeverage;
```

### 파일 구성

| 규칙 | 값 |
|------|-----|
| 컴포넌트 파일 | PascalCase (`Button.tsx`) |
| 페이지 파일 | `*Page.tsx` |
| 비JSX 파일 | camelCase (`tokens.ts`) |
| 파일당 라인 | 200~400 (최대 800) |
| 함수당 라인 | 50 이하 |
| export | `export default function ComponentName` |
| 타입 import | `import type { CSSProperties }` |
