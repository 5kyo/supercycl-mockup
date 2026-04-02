# 시작하기

Supercycl 디자인 시스템을 프로젝트에 적용하는 방법을 안내한다.

---

## 기술 스택

| 항목 | 버전 |
|------|------|
| React | 19 |
| TypeScript | 5.9 |
| Vite | 8 |
| 스타일링 | 인라인 CSS (`CSSProperties`) |
| 레이아웃 | 360px 고정 너비, 모바일 전용 |
| 테마 | Dark-only |

---

## 설치 및 설정

### 1. 디자인 토큰 적용

`tokens.css`를 프로젝트의 엔트리 파일에서 import한다.

```tsx
// src/main.tsx
import './_workspace/01_design_tokens/tokens.css';
import './styles/global.css';
import App from './App';
```

> `tokens.css`는 하위호환 alias를 포함하므로, 기존 `global.css`의 CSS 변수와 충돌 없이 동작한다.

### 2. TypeScript 토큰 객체 사용

타입 안전한 토큰 접근이 필요하면 `tokens.ts`를 import한다.

```tsx
import { tokens } from './_workspace/01_design_tokens/tokens';

const style: CSSProperties = {
  background: tokens.semantic.color.surface.card,
  color: tokens.semantic.color.text.primary,
  padding: tokens.primitive.spacing[3],
};
```

### 3. 컴포넌트 라이브러리 사용

배럴 export를 통해 모든 컴포넌트를 import할 수 있다.

```tsx
import { Button, Input, Card, Modal, BottomSheet, Toast, BottomNav } from './_workspace/02_components';
```

---

## 토큰 사용법

### CSS 변수 (권장)

인라인 스타일에서 `var()` 함수로 토큰을 참조한다.

```tsx
const cardStyle: CSSProperties = {
  // 시맨틱 토큰 (주로 사용)
  background: 'var(--s-surface-card)',
  color: 'var(--s-text-primary)',
  border: '1px solid var(--s-border-default)',

  // 프리미티브 토큰 (간격, 크기 등)
  padding: 'var(--p-space-3)',
  borderRadius: 'var(--p-radius-sm)',
  fontSize: 'var(--p-font-size-base)',

  // 컴포넌트 토큰 (해당 컴포넌트 전용)
  // background: 'var(--c-card-bg)',
};
```

### 토큰 선택 의사결정 트리

```
Q: 어떤 토큰을 사용해야 하는가?
|
+-- 특정 컴포넌트의 스타일인가?
|   +-- YES: 컴포넌트 토큰 (--c-button-bg-primary)
|   +-- NO: 아래로
|
+-- 의미가 있는 속성인가? (배경, 텍스트, 보더 등)
|   +-- YES: 시맨틱 토큰 (--s-surface-card)
|   +-- NO: 아래로
|
+-- 원시 수치값인가? (간격, 폰트 크기, 라디우스 등)
    +-- YES: 프리미티브 토큰 (--p-space-3)
    +-- NO: 하드코딩 금지, 토큰 추가 요청
```

### 토큰 네이밍 규칙

| 계층 | 형식 | 예시 |
|------|------|------|
| Primitive | `--p-{category}-{scale}` | `--p-gray-300`, `--p-space-4` |
| Semantic | `--s-{category}-{purpose}[-modifier]` | `--s-surface-card`, `--s-text-primary` |
| Component | `--c-{component}-{property}[-variant][-state]` | `--c-button-bg-primary` |

---

## 첫 번째 컴포넌트 사용 예제

### Button 사용하기

```tsx
import { Button } from './_workspace/02_components';

function MyPage() {
  return (
    <div style={{ padding: 'var(--p-space-5)' }}>
      {/* 기본 버튼 */}
      <Button onClick={() => console.log('clicked')}>
        시작하기
      </Button>

      {/* 매수 버튼 */}
      <Button variant="buy" fullWidth>
        Buy / Long
      </Button>

      {/* 로딩 상태 */}
      <Button variant="primary" isLoading>
        처리 중
      </Button>
    </div>
  );
}
```

### Input + Card 조합

```tsx
import { Card, Input, Button } from './_workspace/02_components';

function OrderForm() {
  return (
    <Card variant="outlined">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--p-space-3)' }}>
        <Input
          label="가격"
          placeholder="0.00"
          type="number"
          rightIcon={<span>USDT</span>}
          fullWidth
        />
        <Input
          label="수량"
          placeholder="0.00"
          type="number"
          fullWidth
        />
        <Button variant="buy" fullWidth>
          Buy / Long
        </Button>
      </div>
    </Card>
  );
}
```

### Modal 사용하기

```tsx
import { useState } from 'react';
import { Modal, Button } from './_workspace/02_components';

function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>설정 열기</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="레버리지 조정"
      >
        <p style={{ color: 'var(--s-text-secondary)' }}>
          레버리지를 변경하시겠습니까?
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

## 디렉토리 구조

```
_workspace/
├── 00_input.md                    -- 프로젝트 입력 정보
├── 01_design_tokens/
│   ├── tokens.css                 -- CSS 변수 (3-Tier)
│   ├── tokens.ts                  -- TypeScript 토큰 객체
│   └── token-map.md               -- 토큰 매핑 문서
├── 02_components/
│   ├── common/
│   │   ├── Button.tsx             -- 버튼 (7 variants)
│   │   ├── Input.tsx              -- 입력 필드
│   │   ├── Card.tsx               -- 카드 컨테이너
│   │   ├── Modal.tsx              -- 모달 다이얼로그
│   │   ├── BottomSheet.tsx        -- 바텀 시트
│   │   └── Toast.tsx              -- 토스트 알림
│   ├── layout/
│   │   └── BottomNav.tsx          -- 하단 네비게이션
│   └── index.ts                   -- 배럴 export
├── 03_storybook/
│   └── storybook-config.md        -- 스토리북 설정 가이드
├── 04_a11y_report.md              -- 접근성 검증 보고서
└── 05_docs/                       -- 이 문서들
    ├── design-principles.md       -- 설계 원칙
    ├── getting-started.md         -- 시작하기 (이 파일)
    ├── components/                -- 컴포넌트별 사용 가이드
    │   ├── button.md
    │   ├── input.md
    │   ├── card.md
    │   ├── modal.md
    │   ├── bottom-sheet.md
    │   ├── toast.md
    │   └── bottom-nav.md
    ├── accessibility.md           -- 접근성 가이드
    └── contributing.md            -- 기여 가이드
```

---

## 다음 단계

1. **컴포넌트 가이드**: 각 컴포넌트의 Props, 변형, Do/Don't를 확인한다 -> `components/` 디렉토리
2. **접근성 가이드**: WCAG 2.1 AA 준수 항목과 컴포넌트별 주의사항 -> `accessibility.md`
3. **기여 가이드**: 새 컴포넌트/토큰 추가 절차 -> `contributing.md`
4. **스토리북**: 컴포넌트 시각적 확인 -> `npx storybook dev -p 6006`
