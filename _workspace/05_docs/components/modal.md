# Modal

화면 위에 오버레이되는 다이얼로그. 사용자의 확인/입력이 필요한 작업에 사용한다.

---

## 사용 시점

- 레버리지 조정, TP/SL 설정 등 확인이 필요한 액션
- 사용자의 주의를 집중시켜야 하는 중요한 메시지
- 현재 화면을 벗어나지 않고 추가 정보를 입력받을 때

> 목록 선택, 스크롤 가능한 콘텐츠에는 `BottomSheet`를 사용한다.

---

## 기본 사용법

```tsx
import { useState } from 'react';
import { Modal, Button } from '@components';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>열기</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="확인"
      >
        <p style={{ color: 'var(--s-text-secondary)', marginBottom: 'var(--p-space-4)' }}>
          정말 진행하시겠습니까?
        </p>
        <Button variant="primary" fullWidth onClick={() => setIsOpen(false)}>
          확인
        </Button>
      </Modal>
    </>
  );
}
```

---

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | (필수) | 모달 내용 |
| `isOpen` | `boolean` | (필수) | 모달 표시 여부 |
| `onClose` | `() => void` | (필수) | 닫기 핸들러 (Escape, 백드롭 클릭) |
| `title` | `string` | `undefined` | 모달 제목 |
| `showClose` | `boolean` | `true` | 닫기 버튼(X) 표시 여부 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 모달 너비 |
| `style` | `CSSProperties` | `undefined` | 패널 스타일 오버라이드 |

---

## 크기 (Sizes)

| Size | 최대 너비 | 용도 |
|------|----------|------|
| `sm` | 280px | 간단한 확인 다이얼로그 |
| `md` | 360px (기본) | 일반 모달 |
| `lg` | 360px | 넓은 콘텐츠 (360px 앱에서 차이 없음) |

```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="알림" size="sm">
  <p>작은 모달</p>
</Modal>
```

---

## 스타일 사양

| 속성 | 토큰 | 실제 값 |
|------|------|---------|
| 백드롭 | `--c-modal-backdrop` | rgba(0, 0, 0, 0.7) |
| 배경 | `--c-modal-bg` | #242424 |
| 라디우스 | `--c-modal-radius` | 16px |
| 패딩 | `--c-modal-padding` | 24px |
| z-index | `--c-modal-z` | 100 |
| 그림자 | `--c-modal-shadow` | 0 4px 16px rgba(0,0,0,0.5) |
| 제목 폰트 | `--c-modal-title-size` | 16px |
| 제목 굵기 | `--c-modal-title-weight` | 600 |

---

## 합성 패턴

### 확인/취소 다이얼로그

```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="포지션 청산">
  <p style={{ color: 'var(--s-text-secondary)', marginBottom: 'var(--p-space-4)' }}>
    BTC/USDT Long 포지션을 청산하시겠습니까?
  </p>
  <div style={{ display: 'flex', gap: 'var(--p-space-2)' }}>
    <Button variant="secondary" style={{ flex: 1 }} onClick={handleClose}>
      취소
    </Button>
    <Button variant="danger" style={{ flex: 1 }} onClick={handleConfirm}>
      청산
    </Button>
  </div>
</Modal>
```

### 폼 모달

```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="레버리지 조정">
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--p-space-3)' }}>
    <Input label="레버리지" type="number" placeholder="20" fullWidth />
    <Button variant="primary" fullWidth onClick={handleSave}>
      적용
    </Button>
  </div>
</Modal>
```

---

## 접근성

| 항목 | 구현 상태 | 설명 |
|------|----------|------|
| role="dialog" | PASS | 올바르게 설정됨 |
| aria-modal="true" | PASS | 모달 시맨틱 정확 |
| aria-label | PASS | title이 aria-label로 전달됨 |
| Escape 닫기 | PASS | document keydown으로 Escape 처리 |
| 포커스 이동 | PASS | 열릴 때 패널로 포커스 이동, 닫힐 때 이전 요소 복원 |
| 닫기 버튼 | PASS | `aria-label="Close modal"` |
| 포커스 트랩 | **P1 미해결** | Tab으로 모달 바깥 이탈 가능 |
| title 없을 때 | **P2** | aria-label이 undefined가 됨, 대안 필요 |

### 키보드 동작

| 키 | 동작 |
|-----|------|
| `Escape` | 모달 닫기 |
| `Tab` | 모달 내 포커스 이동 (포커스 트랩 구현 필요) |
| `Shift+Tab` | 모달 내 역방향 포커스 이동 |

### 스크린리더 동작

모달이 열리면 `role="dialog"` + `aria-modal="true"`로 인해 스크린리더가 모달 콘텐츠에 집중한다. 닫히면 이전에 포커스된 요소로 복원된다.

---

## Do / Don't

### DO

- 반드시 `title` prop을 제공한다 (접근성 라벨)
- 모달 내에 명확한 닫기 방법을 제공한다 (X 버튼 또는 취소 버튼)
- 확인/취소가 있는 경우 버튼 그룹을 사용한다
- 위험한 액션은 `danger` 변형 버튼으로 강조한다

```tsx
// DO: title + 명확한 액션
<Modal isOpen={isOpen} onClose={handleClose} title="레버리지 조정">
  <Button variant="primary" fullWidth>적용</Button>
</Modal>
```

### DON'T

- title 없이 모달을 열지 않는다 (최소 aria-label 대안 필요)
- 모달 안에 다른 모달을 중첩하지 않는다
- 스크롤이 긴 콘텐츠에 Modal을 사용하지 않는다 (BottomSheet 사용)
- `showClose={false}` 시 다른 닫기 방법을 반드시 제공한다

```tsx
// DON'T: title 없는 모달
<Modal isOpen={isOpen} onClose={handleClose}>
  <p>제목이 없습니다</p>
</Modal>

// DON'T: 닫을 방법 없는 모달
<Modal isOpen={isOpen} onClose={handleClose} showClose={false}>
  <p>X 버튼도 없고 취소 버튼도 없음</p>
</Modal>
```
