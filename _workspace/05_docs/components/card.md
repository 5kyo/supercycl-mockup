# Card

콘텐츠를 시각적으로 그룹화하는 컨테이너. 포지션 카드, 시그널 카드 등 다양한 정보를 담는다.

---

## 사용 시점

- 관련 정보를 하나의 단위로 묶어 표시할 때
- 포지션, 시그널, 설정 항목 등을 카드 형태로 나열할 때
- 시각적 구분이 필요한 섹션을 만들 때

---

## 기본 사용법

```tsx
import { Card } from '@components';

<Card>
  <p style={{ color: 'var(--s-text-primary)' }}>카드 콘텐츠</p>
</Card>
```

---

## 변형 (Variants)

### default

배경색만 적용, 보더 없음.

```tsx
<Card variant="default">기본 카드</Card>
```

### outlined

보더가 있는 카드. 구분이 명확해야 할 때 사용한다.

```tsx
<Card variant="outlined">보더 카드</Card>
```

### elevated

그림자가 있는 카드. 부유감을 줄 때 사용한다.

```tsx
<Card variant="elevated">엘리베이션 카드</Card>
```

---

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | (필수) | 카드 내용 |
| `variant` | `'default' \| 'outlined' \| 'elevated'` | `'default'` | 시각적 변형 |
| `indicator` | `string` | `undefined` | 좌측 색상 인디케이터 (CSS 색상값) |
| `header` | `ReactNode` | `undefined` | 카드 상단 헤더 영역 |
| `footer` | `ReactNode` | `undefined` | 카드 하단 푸터 영역 |
| `style` | `CSSProperties` | `undefined` | 루트 스타일 오버라이드 |

> 이 외에 `HTMLAttributes<HTMLDivElement>`의 모든 속성을 지원한다 (`style` 제외).

---

## 인디케이터 패턴

좌측 색상 바로 포지션 방향(롱/숏) 등을 시각적으로 표시한다.

```tsx
// 롱 포지션 (녹색)
<Card indicator="var(--s-trading-buy)">
  <span>BTC/USDT Long 20x</span>
</Card>

// 숏 포지션 (빨간색)
<Card indicator="var(--s-trading-sell)">
  <span>ETH/USDT Short 10x</span>
</Card>
```

---

## 헤더/푸터 패턴

```tsx
<Card
  variant="outlined"
  header={<span>BTC/USDT</span>}
  footer={
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="ghost" size="sm">상세보기</Button>
    </div>
  }
>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span style={{ color: 'var(--s-text-secondary)' }}>수익률</span>
    <span style={{ color: 'var(--s-trading-profit)' }}>+12.34%</span>
  </div>
</Card>
```

---

## 스타일 사양

| 속성 | 토큰 | 실제 값 |
|------|------|---------|
| 배경 | `--c-card-bg` | #242424 |
| 라디우스 | `--c-card-radius` | 4px |
| 구분선 | `--c-card-divider` | 1px solid #2c2c2c |
| 인디케이터 너비 | `--c-card-indicator-width` | 3px |
| 패딩 | `--c-card-padding` | 10px 12px 10px 14px |

---

## 합성 패턴

### 포지션 카드 리스트

```tsx
const positions = [
  { symbol: 'BTC/USDT', side: 'long', pnl: '+12.34%' },
  { symbol: 'ETH/USDT', side: 'short', pnl: '-5.67%' },
];

<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--p-space-2)' }}>
  {positions.map((pos) => (
    <Card
      key={pos.symbol}
      indicator={pos.side === 'long' ? 'var(--s-trading-buy)' : 'var(--s-trading-sell)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--s-text-primary)' }}>{pos.symbol}</span>
        <span style={{
          color: pos.pnl.startsWith('+')
            ? 'var(--s-trading-profit)'
            : 'var(--s-trading-loss)',
        }}>
          {pos.pnl}
        </span>
      </div>
    </Card>
  ))}
</div>
```

---

## 접근성

| 항목 | 구현 상태 | 설명 |
|------|----------|------|
| 인디케이터 숨김 | PASS | `aria-hidden="true"`로 장식 요소 처리 |
| 시맨틱 마크업 | **P2** | `<div>` 사용 중, `<article>`/`<section>` 권장 |
| tertiary 텍스트 대비 | **P2** | #666666 on #242424 = 2.70:1 (3:1 미달) |

> 카드 내에서 `--s-text-tertiary` 사용 시 대비비가 부족하다. 카드 배경 위에서는 `--s-text-secondary`(#9f9f9f, 5.86:1)를 사용하는 것을 권장한다.

---

## Do / Don't

### DO

- 관련 정보를 하나의 카드로 그룹화한다
- indicator 색상에 시맨틱 토큰을 사용한다 (`var(--s-trading-buy)`)
- 카드 간 간격에 `--p-space-2` (8px)를 사용한다
- 카드 내 텍스트에 `--s-text-secondary` 이상의 대비를 확보한다

```tsx
// DO: 시맨틱 토큰으로 인디케이터
<Card indicator="var(--s-trading-buy)">...</Card>
```

### DON'T

- 카드를 중첩하지 않는다 (Card 안에 Card)
- 인디케이터 색상에 하드코딩값을 사용하지 않는다
- 카드 배경 위에서 `--s-text-tertiary`를 사용하지 않는다 (대비 부족)

```tsx
// DON'T: 하드코딩 색상
<Card indicator="#00ff00">...</Card>

// DON'T: 카드 위 tertiary 텍스트
<Card>
  <span style={{ color: 'var(--s-text-tertiary)' }}>읽기 어려움</span>
</Card>

// DO: secondary 텍스트 사용
<Card>
  <span style={{ color: 'var(--s-text-secondary)' }}>읽기 쉬움</span>
</Card>
```
