# 접근성 가이드

Supercycl 디자인 시스템은 WCAG 2.1 Level AA 기준을 준수한다. 이 문서는 접근성 요구사항과 컴포넌트별 가이드라인을 정리한다.

---

## WCAG 2.1 AA 준수 항목 요약

### 인식의 용이성 (Perceivable)

| 기준 | 번호 | 상태 | 설명 |
|------|------|------|------|
| 텍스트 대비 | 1.4.3 | 부분 통과 | 주요 텍스트 PASS, Buy/Sell/Nav 일부 P0 |
| 텍스트 크기 조정 | 1.4.4 | 부분 통과 | label 8px 가독성 문제 (P2) |
| 비텍스트 콘텐츠 | 1.1.1 | PASS | 장식 요소에 aria-hidden 적용 |
| 정보와 관계 | 1.3.1 | 부분 통과 | ARIA 올바르나 Card 시맨틱 태그 부재 (P2) |

### 운용의 용이성 (Operable)

| 기준 | 번호 | 상태 | 설명 |
|------|------|------|------|
| 키보드 접근 | 2.1.1 | PASS | 모든 인터랙티브 요소 키보드 사용 가능 |
| 포커스 표시 | 2.4.7 | FAIL (P1) | outline: none, 대체 스타일 없음 |
| 포커스 순서 | 2.4.3 | 부분 통과 | Modal/Sheet 포커스 이동은 됨, 트랩 미구현 (P1) |

### 이해의 용이성 (Understandable)

| 기준 | 번호 | 상태 | 설명 |
|------|------|------|------|
| 에러 식별 | 3.3.1 | PASS | Input error에 role="alert" |
| 입력 도움 | 3.3.2 | 부분 통과 | required 필드 표시 없음 (P2) |

### 견고성 (Robust)

| 기준 | 번호 | 상태 | 설명 |
|------|------|------|------|
| 이름/역할/값 | 4.1.2 | PASS | dialog, tablist, tab, alert, status 올바르게 사용 |
| 상태 메시지 | 4.1.3 | 부분 통과 | Toast error에 assertive 필요 (P1) |

---

## 대비비 기준 및 매트릭스 요약

### 기준

| 유형 | 최소 대비비 | 적용 대상 |
|------|-----------|----------|
| 일반 텍스트 (AA) | 4.5:1 | 18px 미만 텍스트 |
| 대형 텍스트 (AA) | 3:1 | 18px 이상 또는 14px bold |
| UI 컴포넌트 | 3:1 | 보더, 아이콘 등 비텍스트 |

### 주요 조합 대비비

| 조합 | 대비비 | AA 결과 |
|------|--------|---------|
| 주요 텍스트 (#fff) / 페이지 배경 (#050505) | 20.38:1 | PASS |
| 보조 텍스트 (#9f9f9f) / 페이지 배경 (#050505) | 7.70:1 | PASS |
| 보조 텍스트 (#9f9f9f) / 카드 배경 (#242424) | 5.86:1 | PASS |
| 3차 텍스트 (#666) / 페이지 배경 (#050505) | 3.55:1 | FAIL (일반), PASS (대형) |
| 3차 텍스트 (#666) / 카드 배경 (#242424) | 2.70:1 | FAIL |
| Buy 텍스트 (#0a0a0a) / Buy 배경 (#00de0b) | 10.80:1 | PASS |
| Sell 텍스트 (#0a0a0a) / Sell 배경 (#ff5938) | 5.79:1 | PASS |
| 에러 텍스트 (#ff5938) / 카드 배경 (#242424) | 4.98:1 | PASS |
| 비활성 탭 (#7a7a7a) / Nav 배경 (#050505) | 4.89:1 | PASS |

### 주의 사항

- `--s-text-tertiary` (#666666)는 카드 배경 위에서 대비 부족. 카드 내에서는 `--s-text-secondary` (#9f9f9f)를 사용한다.
- `--s-text-disabled` (#505050)는 의도적으로 대비가 낮다 (비활성 상태 표현). 중요한 정보에는 사용하지 않는다.

---

## 컴포넌트별 ARIA 패턴 요약

### Button

```html
<button
  type="button"
  aria-disabled="true|undefined"
  aria-busy="true|undefined"
  tabIndex={disabled ? -1 : 0}
>
  <span aria-hidden="true">{spinner|icon}</span>
  <span>{children}</span>
</button>
```

- 장식 요소(스피너, 아이콘): `aria-hidden="true"`
- disabled: `aria-disabled` + `tabIndex={-1}`
- loading: `aria-busy="true"`

### Input

```html
<label htmlFor={inputId}>{label}</label>
<input
  id={inputId}
  aria-invalid={error ? true : undefined}
  aria-describedby={errorId | helperId}
/>
<span id={errorId} role="alert">{error}</span>
<span id={helperId}>{helperText}</span>
```

- label-input 연결: `htmlFor` + `id` (useId 자동 생성)
- 에러: `aria-invalid` + `role="alert"` + `aria-describedby`
- 도움말: `aria-describedby`

### Modal

```html
<div role="presentation" onClick={onClose}>  <!-- 백드롭 -->
  <div
    role="dialog"
    aria-modal="true"
    aria-label={title}
    tabIndex={-1}
  >
    <button aria-label="Close modal">X</button>
    {children}
  </div>
</div>
```

- dialog 패턴: `role="dialog"` + `aria-modal="true"`
- 포커스: 열릴 때 패널로 이동, 닫힐 때 이전 요소 복원
- Escape: document keydown으로 닫기

### BottomSheet

```html
<div aria-hidden="true" onClick={onClose} />  <!-- 백드롭 -->
<div
  role="dialog"
  aria-modal="true"
  aria-label={title ?? 'Bottom sheet'}
  tabIndex={-1}
>
  <div aria-hidden="true" />  <!-- 핸들 -->
  {children}
</div>
```

- Modal과 동일한 dialog 패턴
- 핸들: `aria-hidden="true"` (장식 요소)

### Toast

```html
<div
  role="status"          <!-- error 시 role="alert" 권장 -->
  aria-live="polite"     <!-- error 시 "assertive" 권장 -->
  aria-atomic="true"
>
  <span aria-hidden="true">{icon}</span>
  <span>{message}</span>
</div>
```

- live region: 스크린리더가 변경 사항을 자동 읽어줌
- `aria-atomic="true"`: 전체 내용 재읽기

### BottomNav

```html
<nav role="tablist" aria-label="Main navigation">
  <button
    role="tab"
    aria-selected={isActive}
    aria-label={label}
    tabIndex={isActive ? 0 : -1}
  >
    {icon}
    <span>{label}</span>
  </button>
</nav>
```

- tablist 패턴: `role="tablist"` + `role="tab"`
- 활성 탭만 `tabIndex={0}`, 나머지 `-1`
- `aria-selected`로 활성 상태 표시

---

## 키보드 내비게이션 가이드

### 전체 흐름

```
[Header] -> [콘텐츠 영역] -> [BottomNav 활성 탭]
                                    |
                            Enter/Space: 탭 전환
```

### 컴포넌트별 키보드

| 컴포넌트 | Tab | Enter | Space | Escape | Arrow |
|---------|-----|-------|-------|--------|-------|
| Button | 포커스 이동 | 클릭 | 클릭 | -- | -- |
| Input | 포커스 이동 | 네이티브 | -- | -- | -- |
| Card | -- (비인터랙티브) | -- | -- | -- | -- |
| Modal | 내부 포커스 이동 | -- | -- | 닫기 | -- |
| BottomSheet | 내부 포커스 이동 | -- | -- | 닫기 | -- |
| Toast | -- (비인터랙티브) | -- | -- | -- | -- |
| BottomNav | 활성 탭 포커스 | 탭 활성화 | 탭 활성화 | -- | 탭 이동 (미구현) |

---

## 미해결 이슈 요약

### P0 (즉시 수정 필요)

| # | 이슈 | 컴포넌트 | 수정 방향 |
|---|------|---------|----------|
| 1 | Buy 버튼 텍스트 대비 1.83:1 | Button | 텍스트를 #0a0a0a로 변경 (완료됨) |
| 2 | Sell 버튼 텍스트 대비 3.12:1 | Button | 텍스트를 #0a0a0a로 변경 (완료됨) |
| 3 | 비활성 탭 대비 3.55:1 | BottomNav | --c-nav-icon-inactive를 #7a7a7a로 변경 |

### P1 (다음 릴리스 전 수정)

| # | 이슈 | 수정 방향 |
|---|------|----------|
| 4 | Button 포커스 표시자 없음 | global.css에 :focus-visible 규칙 추가 |
| 5 | Input 포커스 링 없음 | global.css에 :focus-visible 규칙 추가 |
| 6 | Modal 포커스 트랩 미구현 | useFocusTrap 훅 구현 |
| 7 | BottomSheet 포커스 트랩 미구현 | useFocusTrap 훅 구현 |
| 8 | Toast error에 assertive 필요 | variant=error 시 role/aria-live 변경 |

### P2 (개선 권장)

| # | 이슈 | 수정 방향 |
|---|------|----------|
| 9 | Card 시맨틱 태그 | as prop으로 article/section 지원 |
| 10 | Card tertiary 텍스트 대비 | --s-text-tertiary를 #7a7a7a로 조정 |
| 11 | Button isLoading 스크린리더 안내 | sr-only 텍스트 추가 |
| 12 | Button `<a>`에 불필요한 role="link" | role 제거 |
| 13 | Input label 8px 가독성 | 최소 10px 권장 |
| 14 | BottomNav Arrow 키 미구현 | WAI-ARIA tablist 패턴 구현 |

---

## prefers-reduced-motion

현재 미구현 상태. 다음 CSS를 `global.css` 또는 `tokens.css`에 추가하여 모션 감소 설정을 존중해야 한다.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 테스트 방법

### 자동 테스트

```bash
# Storybook a11y 애드온 (axe-core 기반)
npx storybook dev -p 6006
# Accessibility 패널에서 위반 사항 확인
```

### 수동 테스트

1. **키보드 테스트**: Tab, Enter, Space, Escape로 모든 기능에 접근 가능한지 확인
2. **스크린리더 테스트**: VoiceOver(macOS) 또는 NVDA(Windows)로 콘텐츠 읽기 확인
3. **대비비 확인**: 브라우저 DevTools > Accessibility 탭에서 대비비 확인
4. **모션 감소**: macOS System Settings > Accessibility > Display > Reduce motion 활성화 후 확인

### 체크리스트

- [ ] 모든 인터랙티브 요소에 키보드로 접근 가능
- [ ] 포커스 표시자가 시각적으로 구분 가능
- [ ] Modal/Sheet 열릴 때 포커스가 올바르게 이동
- [ ] Modal/Sheet 닫힐 때 이전 포커스로 복원
- [ ] 에러 메시지가 스크린리더에 안내됨
- [ ] 장식 요소에 aria-hidden="true"
- [ ] 텍스트/배경 대비비 4.5:1 이상
- [ ] 모션 감소 설정 존중
