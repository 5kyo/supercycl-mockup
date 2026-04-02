# Input

텍스트, 숫자 등 사용자 입력을 받는 필드. 라벨, 에러 메시지, 아이콘을 지원한다.

---

## 사용 시점

- 주문 가격/수량 입력
- 검색 필드
- 설정값 입력
- 폼 내 텍스트/숫자 입력이 필요한 모든 곳

---

## 기본 사용법

```tsx
import { Input } from '@components';

<Input
  label="가격"
  placeholder="0.00"
  type="number"
/>
```

---

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `label` | `string` | `undefined` | 입력 필드 위 라벨 텍스트 |
| `error` | `string` | `undefined` | 에러 메시지 (표시 시 보더 빨간색) |
| `helperText` | `string` | `undefined` | 도움말 텍스트 (error가 없을 때만 표시) |
| `leftIcon` | `ReactNode` | `undefined` | 좌측 아이콘 |
| `rightIcon` | `ReactNode` | `undefined` | 우측 아이콘 (단위 표시 등) |
| `fullWidth` | `boolean` | `false` | 너비 100% |
| `disabled` | `boolean` | `false` | 비활성 상태 (opacity 0.5) |
| `id` | `string` | 자동 생성 (`useId`) | label 연결용 ID |
| `style` | `CSSProperties` | `undefined` | 래퍼 스타일 오버라이드 |

> 이 외에 `InputHTMLAttributes<HTMLInputElement>`의 모든 속성을 지원한다 (`style`, `size` 제외).

---

## 변형 예시

### 라벨 + 도움말

```tsx
<Input
  label="레버리지"
  helperText="1x ~ 125x"
  type="number"
  placeholder="20"
/>
```

### 에러 상태

```tsx
<Input
  label="가격"
  error="최소 주문 금액은 5 USDT입니다"
  value="0.5"
  type="number"
/>
```

### 아이콘 포함

```tsx
<Input
  label="수량"
  placeholder="0.00"
  type="number"
  rightIcon={<span style={{ color: 'var(--s-text-tertiary)', fontSize: 'var(--p-font-size-sm)' }}>USDT</span>}
  fullWidth
/>
```

### 좌측 아이콘 (검색)

```tsx
<Input
  leftIcon={<SearchIcon />}
  placeholder="코인 검색..."
  fullWidth
/>
```

### disabled 상태

```tsx
<Input
  label="레버리지"
  value="20x"
  disabled
/>
```

---

## 스타일 사양

| 속성 | 토큰 | 실제 값 |
|------|------|---------|
| 배경 | `--c-input-bg` | #1d1d1d |
| 텍스트 색상 | `--c-input-text` | #ffffff |
| 라벨 색상 | `--c-input-label-color` | #9f9f9f |
| 라벨 폰트 크기 | `--c-input-label-size` | 8px |
| 값 폰트 크기 | `--c-input-value-size` | 12px |
| 보더 | `--c-input-border` | 1px solid #2c2c2c |
| 포커스 보더 | `--c-input-border-focus` | 1px solid #00de0b |
| 라디우스 | `--c-input-radius` | 2px |
| 높이 | `--c-input-height` | 30px |
| 패딩 | `--c-input-padding` | 0 10px |

---

## 합성 패턴

### 주문 입력 폼

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--p-space-2)' }}>
  <Input label="가격" placeholder="Market" type="number" fullWidth />
  <Input label="수량" placeholder="0.00" type="number" rightIcon={<span>BTC</span>} fullWidth />
  <Input label="총액" placeholder="0.00" type="number" rightIcon={<span>USDT</span>} fullWidth disabled />
</div>
```

### Card 내부 입력

```tsx
import { Card, Input } from '@components';

<Card variant="outlined">
  <Input label="TP (Take Profit)" placeholder="가격 입력" type="number" fullWidth />
  <Input label="SL (Stop Loss)" placeholder="가격 입력" type="number" fullWidth />
</Card>
```

---

## 접근성

| 항목 | 구현 상태 | 설명 |
|------|----------|------|
| label-input 연결 | PASS | `htmlFor` + `id` (useId 자동 생성) |
| aria-invalid | PASS | error 존재 시 `aria-invalid="true"` |
| aria-describedby | PASS | error/helper 메시지에 연결 |
| 에러 알림 | PASS | `role="alert"`로 에러 즉시 안내 |
| 아이콘 숨김 | PASS | leftIcon/rightIcon에 `aria-hidden="true"` |
| 포커스 보더 | PARTIAL | border 색상 변경은 되지만 outline 없음 (**P1**) |
| label 크기 | **P2** | 8px는 가독성 문제, 10px 이상 권장 |
| required 표시 | **P2** | 필수 필드 시각적/프로그래밍적 표시 없음 |

### 키보드 동작

| 키 | 동작 |
|-----|------|
| `Tab` | 입력 필드로 포커스 이동 |
| 입력 | 네이티브 텍스트 입력 동작 |

---

## Do / Don't

### DO

- 모든 Input에 `label` prop을 제공한다
- 에러 상태에서 구체적인 에러 메시지를 표시한다
- 숫자 입력에 `type="number"` 사용한다
- 단위가 있는 값에 `rightIcon`으로 단위를 표시한다

```tsx
// DO: 라벨 + 에러 메시지 + 단위
<Input
  label="수량"
  error="최소 0.001 BTC"
  type="number"
  rightIcon={<span>BTC</span>}
/>
```

### DON'T

- label 없이 Input을 사용하지 않는다 (최소 `aria-label` 제공)
- placeholder를 라벨 대신 사용하지 않는다
- 에러 메시지에 기술적 용어를 사용하지 않는다

```tsx
// DON'T: 라벨 없는 입력
<Input placeholder="가격" />

// DON'T: 기술적 에러 메시지
<Input error="NaN: parseFloat failed" />

// DO: 사용자 친화적 에러
<Input label="가격" error="유효한 숫자를 입력하세요" />
```
