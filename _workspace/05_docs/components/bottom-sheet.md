# BottomSheet

화면 하단에서 슬라이드업되는 패널. 목록 선택, 상세 정보 표시에 사용한다.

---

## 사용 시점

- 코인 선택, 레버리지 조정 등 선택 목록 표시
- 시그널 주문 시트 등 하단에서 올라오는 폼
- 스크롤 가능한 콘텐츠가 필요할 때
- 모바일 네이티브 느낌의 패널이 필요할 때

> 간단한 확인/취소에는 `Modal`을 사용한다.

---

## 기본 사용법

```tsx
import { useState } from 'react';
import { BottomSheet, Button } from '@components';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>코인 선택</Button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="코인 선택"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--p-space-2)' }}>
          <Button variant="ghost" fullWidth>BTC/USDT</Button>
          <Button variant="ghost" fullWidth>ETH/USDT</Button>
          <Button variant="ghost" fullWidth>SOL/USDT</Button>
        </div>
      </BottomSheet>
    </>
  );
}
```

---

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | (필수) | 시트 내용 |
| `isOpen` | `boolean` | (필수) | 시트 표시 여부 |
| `onClose` | `() => void` | (필수) | 닫기 핸들러 (Escape, 백드롭 클릭) |
| `title` | `string` | `undefined` | 시트 제목 |
| `maxHeight` | `string` | `'70vh'` | 최대 높이 (CSS 값) |
| `showHandle` | `boolean` | `true` | 상단 드래그 핸들 표시 |
| `style` | `CSSProperties` | `undefined` | 시트 스타일 오버라이드 |

---

## 스타일 사양

| 속성 | 토큰 | 실제 값 |
|------|------|---------|
| 배경 | `--c-sheet-bg` | #242424 |
| 라디우스 | `--c-sheet-radius` | 20px 20px 0 0 (상단만) |
| 패딩 | `--c-sheet-padding` | 20px |
| 최대 높이 | `--c-sheet-max-height` | 70vh |
| z-index | `--c-sheet-z` | 101 |
| 그림자 | `--c-sheet-shadow` | 0 8px 32px rgba(0,0,0,0.6) |
| 핸들 너비 | `--c-sheet-handle-width` | 40px |
| 핸들 높이 | `--c-sheet-handle-height` | 4px |
| 최대 너비 | 하드코딩 | 428px |

---

## 합성 패턴

### 코인 셀렉터

```tsx
<BottomSheet isOpen={isOpen} onClose={handleClose} title="코인 선택">
  <Input leftIcon={<SearchIcon />} placeholder="검색..." fullWidth />
  <div style={{ marginTop: 'var(--p-space-3)', overflowY: 'auto' }}>
    {coins.map((coin) => (
      <button
        key={coin.symbol}
        onClick={() => handleSelect(coin)}
        style={{
          width: '100%',
          padding: 'var(--p-space-3)',
          background: 'transparent',
          border: 'none',
          color: 'var(--s-text-primary)',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        {coin.symbol}
      </button>
    ))}
  </div>
</BottomSheet>
```

### 시그널 주문 시트

```tsx
<BottomSheet isOpen={isOpen} onClose={handleClose} title="시그널 주문" maxHeight="80vh">
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--p-space-3)' }}>
    <Card variant="outlined">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--s-text-secondary)' }}>방향</span>
        <span style={{ color: 'var(--s-trading-buy)' }}>Long</span>
      </div>
    </Card>
    <Input label="수량" placeholder="0.00" type="number" fullWidth />
    <Button variant="buy" fullWidth>주문 실행</Button>
  </div>
</BottomSheet>
```

### 핸들 없는 시트

```tsx
<BottomSheet isOpen={isOpen} onClose={handleClose} showHandle={false}>
  <p style={{ color: 'var(--s-text-primary)' }}>핸들이 없는 시트</p>
</BottomSheet>
```

---

## 접근성

| 항목 | 구현 상태 | 설명 |
|------|----------|------|
| role="dialog" | PASS | 올바르게 설정됨 |
| aria-modal="true" | PASS | 모달 시맨틱 정확 |
| aria-label | PASS | title 또는 'Bottom sheet' 폴백 |
| Escape 닫기 | PASS | document keydown으로 Escape 처리 |
| 포커스 이동 | PASS | 열릴 때 시트로 포커스 이동, 닫힐 때 복원 |
| 핸들 숨김 | PASS | `aria-hidden="true"` |
| 백드롭 | PASS | `aria-hidden="true"` |
| 포커스 트랩 | **P1 미해결** | Tab으로 시트 바깥 이탈 가능 |

### 키보드 동작

| 키 | 동작 |
|-----|------|
| `Escape` | 시트 닫기 |
| `Tab` | 시트 내 포커스 이동 (포커스 트랩 필요) |

---

## Do / Don't

### DO

- 스크롤 가능한 콘텐츠에 BottomSheet를 사용한다
- title을 반드시 제공한다
- `maxHeight`를 콘텐츠에 맞게 조정한다
- 목록형 콘텐츠에 적합하다

```tsx
// DO: 목록 선택에 사용
<BottomSheet isOpen={isOpen} onClose={handleClose} title="코인 선택">
  {coinList}
</BottomSheet>
```

### DON'T

- 간단한 확인 다이얼로그에 BottomSheet를 사용하지 않는다 (Modal 사용)
- BottomSheet 안에 또 다른 BottomSheet를 열지 않는다
- `showHandle={false}`일 때 닫기 방법이 없는 시트를 만들지 않는다

```tsx
// DON'T: 단순 확인에 BottomSheet 사용
<BottomSheet isOpen={isOpen} onClose={handleClose} title="확인">
  <p>정말요?</p>
  <Button onClick={handleClose}>확인</Button>
</BottomSheet>
// -> Modal을 사용할 것
```
