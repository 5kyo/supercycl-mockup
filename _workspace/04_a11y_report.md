# Supercycl 접근성 검증 보고서

## 요약

| 항목 | 값 |
|------|-----|
| **검증 일자** | 2026-04-02 |
| **기준** | WCAG 2.1 Level AA |
| **검증 대상** | 7개 컴포넌트 + 디자인 토큰 (tokens.css) |
| **종합 판정** | **CONDITIONAL PASS** -- P0 이슈 3건 수정 필요 |

| 심각도 | 건수 |
|--------|------|
| P0 (차단) | 3 |
| P1 (주요) | 5 |
| P2 (보완) | 6 |


---

## 대비비 매트릭스

모든 대비비는 WCAG 2.1 상대 휘도(relative luminance) 공식으로 계산됨.

| 전경 | 배경 | 대비비 | AA 일반(4.5:1) | AA 대형(3:1) | AAA(7:1) |
|------|------|--------|---------------|-------------|----------|
| `#ffffff` (--s-text-primary) | `#050505` (--s-surface-page) | **20.38:1** | PASS | PASS | PASS |
| `#9f9f9f` (--s-text-secondary) | `#050505` (--s-surface-page) | **7.70:1** | PASS | PASS | PASS |
| `#666666` (--s-text-tertiary) | `#050505` (--s-surface-page) | **3.55:1** | FAIL | PASS | FAIL |
| `#ffffff` (--s-text-primary) | `#242424` (--s-surface-card) | **15.52:1** | PASS | PASS | PASS |
| `#9f9f9f` (--s-text-secondary) | `#242424` (--s-surface-card) | **5.86:1** | PASS | PASS | FAIL |
| `#666666` (--s-text-tertiary) | `#242424` (--s-surface-card) | **2.70:1** | FAIL | FAIL | FAIL |
| `#00de0b` (--s-trading-buy) | `#050505` (--s-surface-page) | **11.12:1** | PASS | PASS | PASS |
| `#ff5938` (--s-trading-sell) | `#050505` (--s-surface-page) | **6.54:1** | PASS | PASS | FAIL |
| `#ffffff` (buy text) | `#00de0b` (buy bg) | **1.83:1** | FAIL | FAIL | FAIL |
| `#ffffff` (sell text) | `#ff5938` (sell bg) | **3.12:1** | FAIL | PASS | FAIL |
| `#ffffff` (primary text) | `#050505` (glassmorphic worst) | **20.38:1** | PASS | PASS | PASS |
| `#9f9f9f` (input label) | `#1d1d1d` (input bg) | **6.37:1** | PASS | PASS | FAIL |
| `#ffffff` (toast text) | `#242424` (toast bg) | **15.52:1** | PASS | PASS | PASS |
| `#ffffff` (nav active) | `#050505` (nav bg) | **20.38:1** | PASS | PASS | PASS |
| `#666666` (nav inactive) | `#050505` (nav bg) | **3.55:1** | FAIL | PASS | FAIL |
| `#505050` (disabled text) | `#050505` (page bg) | **2.53:1** | FAIL | FAIL | FAIL |
| `#ff5938` (error) | `#242424` (card bg) | **4.98:1** | PASS | PASS | FAIL |
| `#00de0b` (buy) | `#242424` (card bg) | **8.47:1** | PASS | PASS | PASS |
| `#0a0a0a` (--s-text-on-accent) | `#00de0b` (buy bg) | **10.80:1** | PASS | PASS | PASS |


---

## 컴포넌트별 검증 결과

### Button

| 검증 항목 | WCAG 기준 | 결과 | 심각도 | 상세 |
|----------|----------|------|--------|------|
| Buy 버튼 텍스트 대비 | 1.4.3 | FAIL | **P0** | `#ffffff` on `#00de0b` = 1.83:1 (최소 4.5:1 필요) |
| Sell 버튼 텍스트 대비 | 1.4.3 | FAIL | **P0** | `#ffffff` on `#ff5938` = 3.12:1 (최소 4.5:1 필요) |
| role 속성 | 4.1.2 | PASS | -- | `<button>` 네이티브, `as="a"`일 때 `role="link"` 설정 |
| aria-disabled | 4.1.2 | PASS | -- | disabled 시 `aria-disabled` 설정됨 |
| aria-busy (loading) | 4.1.2 | PASS | -- | isLoading 시 `aria-busy="true"` 설정됨 |
| 키보드 Enter/Space | 2.1.1 | PASS | -- | onKeyDown 핸들러에서 Enter/Space 처리 |
| 포커스 표시자 | 2.4.7 | FAIL | **P1** | `outline: 'none'` 으로 기본 포커스 링 제거, 대체 포커스 스타일 없음 |
| 스피너 접근성 | 1.3.1 | PASS | -- | 스피너에 `aria-hidden="true"` 설정 |
| 로딩 상태 텍스트 | 1.3.1 | FAIL | **P2** | isLoading 시 스크린리더 사용자에게 "로딩 중" 안내 없음 |
| as="a" role 중복 | 4.1.2 | FAIL | **P2** | `<a>` 요소에 `role="link"` 명시는 불필요 (네이티브 시맨틱) |

### Input

| 검증 항목 | WCAG 기준 | 결과 | 심각도 | 상세 |
|----------|----------|------|--------|------|
| label 연결 | 1.3.1 | PASS | -- | `htmlFor` + `id` 자동 생성 (useId) |
| aria-invalid | 4.1.2 | PASS | -- | error 존재 시 `aria-invalid="true"` |
| aria-describedby | 4.1.2 | PASS | -- | error/helper 메시지를 `aria-describedby`로 연결 |
| 에러 메시지 | 3.3.1 | PASS | -- | `role="alert"`로 에러 즉시 안내 |
| 포커스 표시자 | 2.4.7 | FAIL | **P1** | 포커스 시 border 색상 변경은 있으나, 포커스 링(outline)이 없어 대비가 부족할 수 있음 |
| label 대비 | 1.4.3 | PASS | -- | `#9f9f9f` on `#1d1d1d` = 6.37:1 (단, label 크기가 8px로 매우 작음) |
| label 크기 | 1.4.4 | FAIL | **P2** | label 폰트 크기 8px (--p-font-size-2xs)은 가독성에 문제 |
| 필수 입력 표시 | 3.3.2 | FAIL | **P2** | required 필드에 대한 시각적/프로그래밍적 표시 없음 |

### Card

| 검증 항목 | WCAG 기준 | 결과 | 심각도 | 상세 |
|----------|----------|------|--------|------|
| 시맨틱 마크업 | 1.3.1 | FAIL | **P2** | `<div>` 사용, 콘텐츠에 따라 `<article>` 또는 `<section>` 권장 |
| indicator 접근성 | 1.3.1 | PASS | -- | 장식 indicator에 `aria-hidden="true"` |
| tertiary 텍스트 on card | 1.4.3 | FAIL | **P1** | `#666666` on `#242424` = 2.70:1 (3:1 미달, UI 컴포넌트 기준도 미충족) |

### Modal

| 검증 항목 | WCAG 기준 | 결과 | 심각도 | 상세 |
|----------|----------|------|--------|------|
| role="dialog" | 4.1.2 | PASS | -- | 올바르게 설정됨 |
| aria-modal | 4.1.2 | PASS | -- | `aria-modal="true"` 설정됨 |
| aria-label | 4.1.2 | PASS | -- | title이 `aria-label`로 전달됨 |
| Escape 닫기 | 2.1.1 | PASS | -- | document keydown으로 Escape 처리 |
| 포커스 이동 | 2.4.3 | PASS | -- | 열릴 때 패널로 포커스 이동, 닫힐 때 이전 요소 복원 |
| 포커스 트랩 | 2.4.3 | FAIL | **P1** | Tab 키로 포커스가 모달 바깥으로 이탈 가능. 포커스 트랩 구현 필요 |
| 닫기 버튼 | 4.1.2 | PASS | -- | `aria-label="Close modal"` 설정됨 |
| title 없을 때 | 4.1.2 | FAIL | **P2** | title 미제공 시 `aria-label={undefined}`, 대안 필요 |

### BottomSheet

| 검증 항목 | WCAG 기준 | 결과 | 심각도 | 상세 |
|----------|----------|------|--------|------|
| role="dialog" | 4.1.2 | PASS | -- | 올바르게 설정됨 |
| aria-modal | 4.1.2 | PASS | -- | `aria-modal="true"` 설정됨 |
| aria-label | 4.1.2 | PASS | -- | title 또는 'Bottom sheet' 폴백 제공 |
| Escape 닫기 | 2.1.1 | PASS | -- | document keydown으로 Escape 처리 |
| 포커스 이동 | 2.4.3 | PASS | -- | 열릴 때 시트로 포커스 이동, 닫힐 때 복원 |
| 포커스 트랩 | 2.4.3 | FAIL | **P1** | Modal과 동일, Tab 키 포커스 트랩 미구현 |
| 핸들 장식 | 1.3.1 | PASS | -- | handle에 `aria-hidden="true"` |

### Toast

| 검증 항목 | WCAG 기준 | 결과 | 심각도 | 상세 |
|----------|----------|------|--------|------|
| role="status" | 4.1.2 | PASS | -- | 올바르게 설정됨 |
| aria-live="polite" | 4.1.2 | PASS | -- | 변경 시 스크린리더가 읽어줌 |
| aria-atomic | 4.1.2 | PASS | -- | 전체 토스트 내용을 읽어줌 |
| 텍스트 대비 | 1.4.3 | PASS | -- | `#ffffff` on `#242424` = 15.52:1 |
| 아이콘 장식 | 1.3.1 | PASS | -- | `aria-hidden="true"` |
| error 변형 live region | 4.1.3 | FAIL | **P1** | error 변형은 `aria-live="assertive"` + `role="alert"` 사용이 적절 |

### BottomNav

| 검증 항목 | WCAG 기준 | 결과 | 심각도 | 상세 |
|----------|----------|------|--------|------|
| role="tablist" | 4.1.2 | PASS | -- | `<nav>`에 `role="tablist"` |
| role="tab" | 4.1.2 | PASS | -- | 각 버튼에 `role="tab"` |
| aria-selected | 4.1.2 | PASS | -- | 활성 탭에 `aria-selected="true"` |
| aria-label | 4.1.2 | PASS | -- | 각 탭에 `aria-label` + nav에 "Main navigation" |
| 키보드 Enter/Space | 2.1.1 | PASS | -- | onKeyDown 핸들러에서 처리 |
| 비활성 탭 대비 | 1.4.3 | FAIL | **P0** | `#666666` on `#050505` = 3.55:1, 일반 텍스트 기준 FAIL |
| 포커스 표시자 | 2.4.7 | FAIL | **P2** | `outline: 'none'`, 대체 포커스 스타일 없음 |
| Arrow 키 내비게이션 | 2.1.1 | FAIL | **P2** | WAI-ARIA tablist 패턴은 Arrow 키로 탭 간 이동 권장, 미구현 |


---

## 이슈 요약

### P0 -- 차단 (즉시 수정)

| # | 컴포넌트 | 이슈 | WCAG 기준 | 대비비 | 권장 수정 |
|---|---------|------|----------|--------|----------|
| 1 | Button (buy) | 흰색 텍스트가 녹색 배경에서 읽히지 않음 | 1.4.3 | 1.83:1 | 텍스트를 `#0a0a0a` (어두운 색)으로 변경 (10.80:1) |
| 2 | Button (sell) | 흰색 텍스트가 빨간 배경에서 대비 부족 | 1.4.3 | 3.12:1 | 텍스트를 `#0a0a0a` 으로 변경 또는 배경을 `#cc3820`으로 어둡게 |
| 3 | BottomNav | 비활성 탭 텍스트 대비 부족 (일반 텍스트 기준) | 1.4.3 | 3.55:1 | `--c-nav-icon-inactive`를 `#7a7a7a` (--p-gray-650) 이상으로 밝게 |

### P1 -- 주요 (다음 릴리스 전 수정)

| # | 컴포넌트 | 이슈 | WCAG 기준 | 권장 수정 |
|---|---------|------|----------|----------|
| 4 | Button | 포커스 표시자 없음 (outline: none) | 2.4.7 | 포커스 시 outline 또는 box-shadow로 포커스 링 표시 |
| 5 | Input | 포커스 링 없음, border 변경만으로 부족 | 2.4.7 | 포커스 시 2px outline + offset 추가 |
| 6 | Modal | 포커스 트랩 미구현 | 2.4.3 | Tab/Shift+Tab을 모달 내부로 제한하는 트랩 로직 추가 |
| 7 | BottomSheet | 포커스 트랩 미구현 | 2.4.3 | Modal과 동일한 포커스 트랩 로직 추가 |
| 8 | Toast (error) | error 변형에 assertive live region 필요 | 4.1.3 | variant === 'error' 시 `role="alert"` + `aria-live="assertive"` |

### P2 -- 보완 (개선 권장)

| # | 컴포넌트 | 이슈 | WCAG 기준 | 권장 수정 |
|---|---------|------|----------|----------|
| 9 | Card | `<div>` 대신 시맨틱 태그 권장 | 1.3.1 | `as` prop으로 `<article>` / `<section>` 선택 가능하게 |
| 10 | Card | tertiary 텍스트 on card bg 대비 부족 (2.70:1) | 1.4.3 | `--s-text-tertiary`를 `#7a7a7a`로 밝게 조정 |
| 11 | Button | isLoading 시 스크린리더 안내 부재 | 1.3.1 | `<span className="sr-only">Loading...</span>` 추가 |
| 12 | Button | `<a>`에 불필요한 `role="link"` | 4.1.2 | `Element === 'a'`일 때 role 생략 |
| 13 | Input | label 폰트 8px 가독성 문제 | 1.4.4 | 최소 10px (--p-font-size-sm) 이상 권장 |
| 14 | BottomNav | Arrow 키 내비게이션 미구현 | 2.1.1 | WAI-ARIA tablist 패턴에 따라 좌/우 화살표 키 지원 |


---

## 키보드 내비게이션 테스트

| 컴포넌트 | Tab | Enter | Space | Escape | Arrow | 결과 |
|---------|-----|-------|-------|--------|-------|------|
| Button | O (tabIndex 관리) | O (keyDown 처리) | O (keyDown 처리) | -- | -- | PASS |
| Input | O (네이티브) | O (네이티브) | -- | -- | -- | PASS |
| Card | -- (비인터랙티브) | -- | -- | -- | -- | N/A |
| Modal | O (포커스 이동) | -- | -- | O (Escape 닫기) | -- | PARTIAL (트랩 없음) |
| BottomSheet | O (포커스 이동) | -- | -- | O (Escape 닫기) | -- | PARTIAL (트랩 없음) |
| Toast | -- (비인터랙티브) | -- | -- | -- | -- | N/A |
| BottomNav | O (tabIndex 관리) | O (keyDown 처리) | O (keyDown 처리) | -- | X (미구현) | PARTIAL |


---

## 권장 수정 사항

### 1. [P0] Buy/Sell 버튼 텍스트 색상 변경

**문제**: 흰색 텍스트(#ffffff)가 녹색(#00de0b)/빨간색(#ff5938) 배경 위에서 대비 부족.

**tokens.css 수정**:
```css
/* 변경 전 */
--c-button-text-buy:  #ffffff;
--c-button-text-sell: #ffffff;

/* 변경 후 */
--c-button-text-buy:  #0a0a0a;  /* 10.80:1 on #00de0b -- PASS */
--c-button-text-sell: #0a0a0a;  /* 5.79:1 on #ff5938 -- PASS */
```

> 대안: 텍스트를 어둡게 하지 않으려면, 배경색을 어둡게 조정.
> - buy bg: `#009a08` (흰색 대비 4.59:1)
> - sell bg: `#c43a20` (흰색 대비 5.34:1)

### 2. [P0] BottomNav 비활성 탭 색상 조정

**tokens.css 수정**:
```css
/* 변경 전 */
--c-nav-icon-inactive: var(--s-text-tertiary);  /* #666666 -> 3.55:1 */

/* 변경 후 */
--c-nav-icon-inactive: var(--p-gray-650);  /* #7a7a7a -> 4.89:1 -- PASS */
```

### 3. [P1] 포커스 표시자 추가

**Button.tsx -- baseStyle 수정**:
```tsx
const baseStyle: CSSProperties = {
  // ... 기존 스타일 유지
  outline: 'none',  // 삭제하지 말고 아래로 대체
};

// 포커스 스타일을 위한 CSS-in-JS 패턴 (또는 global.css에 추가)
// global.css에 추가 권장:
```

**global.css 추가**:
```css
/* 포커스 표시자 -- 모든 인터랙티브 요소 */
button:focus-visible,
a:focus-visible,
input:focus-visible,
[role="tab"]:focus-visible {
  outline: 2px solid var(--s-border-focus);
  outline-offset: 2px;
}
```

> 인라인 CSS만 사용하는 프로젝트 규칙상, `:focus-visible` 의사 클래스는 인라인으로 처리할 수 없으므로 global.css에 최소한의 포커스 규칙을 추가하는 것이 적절함.

### 4. [P1] Modal/BottomSheet 포커스 트랩

**공통 유틸리티 함수**:
```tsx
function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', handleTab);
    return () => container.removeEventListener('keydown', handleTab);
  }, [containerRef, isActive]);
}
```

**Modal.tsx 적용**:
```tsx
// useEffect 내부에 추가
useFocusTrap(panelRef, isOpen);
```

### 5. [P1] Toast error 변형 assertive 처리

**Toast.tsx 수정**:
```tsx
// 변경 전
<div
  style={toastStyle}
  role="status"
  aria-live="polite"
  aria-atomic="true"
>

// 변경 후
<div
  style={toastStyle}
  role={variant === 'error' ? 'alert' : 'status'}
  aria-live={variant === 'error' ? 'assertive' : 'polite'}
  aria-atomic="true"
>
```

### 6. [P2] Card 시맨틱 태그 지원

**Card.tsx -- Props에 `as` 추가**:
```tsx
interface Props extends Omit<HTMLAttributes<HTMLElement>, 'style'> {
  readonly as?: 'div' | 'article' | 'section';
  // ... 기존 props
}

export default function Card({
  as: Element = 'div',
  // ... 기존 params
}: Props) {
  return (
    <Element style={rootStyle} {...rest}>
      {/* ... 기존 내용 */}
    </Element>
  );
}
```

### 7. [P2] BottomNav Arrow 키 내비게이션

**BottomNav.tsx -- onKeyDown 확장**:
```tsx
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onTabChange(tab.key);
  }
  // WAI-ARIA tablist pattern: arrow key navigation
  const currentIndex = tabs.findIndex((t) => t.key === tab.key);
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % tabs.length;
    onTabChange(tabs[nextIndex].key);
    // 다음 탭 버튼으로 포커스 이동 필요
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    onTabChange(tabs[prevIndex].key);
  }
}}
```


---

## prefers-reduced-motion 검증

| 항목 | 결과 | 상세 |
|------|------|------|
| 토큰 정의 | 미구현 | `tokens.css`에 `@media (prefers-reduced-motion: reduce)` 미디어 쿼리 없음 |
| Modal 애니메이션 | 미대응 | fadeIn, scaleIn 애니메이션이 motion-reduce 시에도 재생됨 |
| BottomSheet 애니메이션 | 미대응 | slideUp 애니메이션이 motion-reduce 시에도 재생됨 |
| Toast 애니메이션 | 미대응 | toastIn 애니메이션이 motion-reduce 시에도 재생됨 |

**global.css 또는 tokens.css 추가 권장**:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```


---

## 종합 의견

전반적으로 ARIA 시맨틱 구현 수준이 양호하다. Input의 label 연결, Modal/BottomSheet의 dialog 패턴, Toast의 live region, BottomNav의 tablist 패턴 등이 올바르게 적용되어 있다. 주요 문제는 다음 세 가지 영역에 집중된다:

1. **색상 대비** (P0): Buy/Sell 버튼의 텍스트/배경 대비가 WCAG AA 기준을 크게 미달한다. 특히 Buy 버튼(1.83:1)은 시력이 양호한 사용자도 읽기 어려울 수 있다. 토큰 수준에서 `--c-button-text-buy` / `--c-button-text-sell` 값을 변경하면 모든 Buy/Sell 버튼에 일괄 적용된다.

2. **포커스 관리** (P1): 포커스 표시자 부재와 포커스 트랩 미구현이 키보드 전용 사용자의 경험을 크게 저해한다. `global.css`에 `:focus-visible` 규칙을 추가하고, Modal/BottomSheet에 포커스 트랩 훅을 도입해야 한다.

3. **prefers-reduced-motion** (P2): 모션 감소 설정을 존중하지 않으면 전정(vestibular) 장애 사용자에게 불편을 줄 수 있다. 전역 미디어 쿼리 한 줄로 해결 가능하다.
