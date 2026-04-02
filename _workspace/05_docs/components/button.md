# Button

사용자 액션을 트리거하는 인터랙티브 요소. 7가지 변형(variant)과 3가지 크기(size)를 지원한다.

---

## 사용 시점

- 폼 제출, 네비게이션, 트레이딩 주문 등 사용자 액션을 유발할 때
- 링크가 아닌 동작(action)을 표현할 때
- Buy/Sell 등 트레이딩 전용 액션에 도메인 특화 변형을 사용할 때

---

## 기본 사용법

```tsx
import { Button } from '@components';

<Button onClick={handleClick}>시작하기</Button>
```

---

## 변형 (Variants)

### primary (기본)

글래스모픽 배경 + 보더. CTA, 주요 액션에 사용한다.

```tsx
<Button variant="primary">Continue</Button>
```

### secondary

카드 배경색 + 약한 보더. 보조 액션에 사용한다.

```tsx
<Button variant="secondary">Cancel</Button>
```

### google

Google OAuth 버튼. primary와 동일한 스타일이며, 아이콘과 함께 사용한다.

```tsx
<Button variant="google" leftIcon={<GoogleIcon />} fullWidth>
  Sign in with Google
</Button>
```

### buy

매수/롱 액션 전용. 녹색 배경 + 어두운 텍스트 + 작은 radius.

```tsx
<Button variant="buy" fullWidth>Buy / Long</Button>
```

### sell

매도/숏 액션 전용. 빨간 배경 + 어두운 텍스트 + 작은 radius.

```tsx
<Button variant="sell" fullWidth>Sell / Short</Button>
```

### danger

위험 액션 (포지션 청산 등). 빨간 배경.

```tsx
<Button variant="danger">Close Position</Button>
```

### ghost

배경 없음. 텍스트 버튼, 부가적 액션에 사용한다.

```tsx
<Button variant="ghost">더보기</Button>
```

---

## 크기 (Sizes)

| Size | 패딩 | 폰트 크기 | 용도 |
|------|------|----------|------|
| `sm` | 6px 12px | 12px | 인라인 액션, 테이블 내부 |
| `md` (기본) | 18px 24px | 16px | 일반 CTA |
| `lg` | 20px 32px | 16px | 대형 CTA, 풀스크린 액션 |

> Buy/Sell/Danger 변형은 트레이딩에 최적화된 별도 사이즈 맵을 사용한다 (더 컴팩트한 패딩).

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

---

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | (필수) | 버튼 내용 |
| `variant` | `'primary' \| 'secondary' \| 'google' \| 'buy' \| 'sell' \| 'danger' \| 'ghost'` | `'primary'` | 시각적 변형 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 버튼 크기 |
| `isLoading` | `boolean` | `false` | 로딩 스피너 표시 |
| `fullWidth` | `boolean` | `false` | 너비 100% |
| `leftIcon` | `ReactNode` | `undefined` | 좌측 아이콘 |
| `rightIcon` | `ReactNode` | `undefined` | 우측 아이콘 |
| `disabled` | `boolean` | `false` | 비활성 상태 |
| `as` | `'button' \| 'a'` | `'button'` | 렌더링 요소 |
| `href` | `string` | `undefined` | `as="a"` 시 링크 URL |
| `style` | `CSSProperties` | `undefined` | 스타일 오버라이드 |
| `onClick` | `() => void` | `undefined` | 클릭 핸들러 |

> 이 외에 `ButtonHTMLAttributes<HTMLButtonElement>`의 모든 속성을 지원한다 (`style` 제외).

---

## 합성 패턴

### 아이콘 + 텍스트

```tsx
<Button variant="primary" leftIcon={<ArrowIcon />}>
  다음 단계
</Button>
```

### 풀너비 CTA

```tsx
<div style={{ padding: 'var(--p-space-5)' }}>
  <Button variant="buy" size="lg" fullWidth>
    Buy / Long
  </Button>
</div>
```

### 버튼 그룹 (Buy/Sell 쌍)

```tsx
<div style={{ display: 'flex', gap: 'var(--p-space-2)' }}>
  <Button variant="buy" style={{ flex: 1 }}>Buy / Long</Button>
  <Button variant="sell" style={{ flex: 1 }}>Sell / Short</Button>
</div>
```

### 링크 버튼

```tsx
<Button as="a" href="/terms" variant="ghost">
  이용약관
</Button>
```

---

## 접근성

| 항목 | 구현 상태 | 설명 |
|------|----------|------|
| 키보드 활성화 | PASS | Enter, Space 키로 활성화 가능 (`onKeyDown` 핸들러) |
| aria-disabled | PASS | `disabled` 또는 `isLoading` 시 `aria-disabled="true"` |
| aria-busy | PASS | `isLoading` 시 `aria-busy="true"` |
| tabIndex 관리 | PASS | disabled 시 `tabIndex={-1}` |
| 스피너 숨김 | PASS | 로딩 스피너에 `aria-hidden="true"` |
| 아이콘 숨김 | PASS | leftIcon/rightIcon에 `aria-hidden="true"` |
| 포커스 표시자 | **P1 미해결** | `outline: 'none'` 제거 후 `:focus-visible` 스타일 필요 |

### 키보드 단축키

| 키 | 동작 |
|-----|------|
| `Tab` | 버튼으로 포커스 이동 |
| `Enter` | 버튼 클릭 |
| `Space` | 버튼 클릭 |

---

## Do / Don't

### DO

- variant를 의미에 맞게 사용한다 (매수 -> `buy`, 위험 -> `danger`)
- 트레이딩 액션에는 반드시 `buy`/`sell`/`danger` 변형을 사용한다
- 로딩 중인 버튼에 `isLoading` prop을 전달한다
- 주요 액션은 하나의 화면에 하나만 배치한다

```tsx
// DO: 의미에 맞는 variant
<Button variant="buy">Buy / Long</Button>
<Button variant="danger">Close Position</Button>
```

### DON'T

- `primary` 변형을 매수/매도 버튼으로 사용하지 않는다
- 한 화면에 같은 변형의 CTA를 여러 개 배치하지 않는다
- disabled 버튼에 onClick 핸들러를 의존하지 않는다
- 아이콘만으로 버튼을 구성할 때 `aria-label`을 생략하지 않는다

```tsx
// DON'T: primary를 매수 버튼으로 사용
<Button variant="primary">Buy / Long</Button>

// DON'T: aria-label 없는 아이콘 전용 버튼
<Button variant="ghost">{closeIcon}</Button>

// DO: aria-label 포함
<Button variant="ghost" aria-label="닫기">{closeIcon}</Button>
```
