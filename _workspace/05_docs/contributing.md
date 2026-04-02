# 기여 가이드

Supercycl 디자인 시스템에 기여하는 절차를 안내한다.

---

## 새 컴포넌트 추가 절차

### 1. 제안

새 컴포넌트가 필요한 경우 다음 정보를 포함하여 제안한다.

- 컴포넌트 이름 및 1줄 설명
- 사용 시나리오 (어디서, 왜 필요한가)
- 기존 컴포넌트로 해결 불가능한 이유
- 예상 Props 목록
- 접근성 요구사항

### 2. 설계

| 단계 | 담당 | 산출물 |
|------|------|--------|
| 토큰 설계 | token-designer | `tokens.css`에 `--c-{component}-*` 추가 |
| API 설계 | component-developer | Props interface 정의 |
| 접근성 패턴 | a11y-auditor | ARIA 패턴, 키보드 동작 정의 |

### 3. 구현

```
_workspace/02_components/{category}/{ComponentName}.tsx
```

구현 시 준수 사항:

- [ ] 인라인 `CSSProperties`로 스타일링 (Tailwind/CSS Modules 금지)
- [ ] Props에 `readonly` modifier 적용
- [ ] 스타일 상수는 파일 상단에 정의
- [ ] 시맨틱 또는 컴포넌트 토큰 사용 (프리미티브 직접 참조 금지)
- [ ] 상태 업데이트는 불변 패턴
- [ ] `export default function ComponentName` 형태
- [ ] 파일 200~400줄 (최대 800줄)

### 4. 스토리 작성

```
_workspace/03_storybook/stories/components/{ComponentName}.stories.tsx
```

스토리 작성 규칙:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import ComponentName from '../../02_components/common/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

// 모든 변형(variant)에 대한 스토리 포함
export const Default: Story = {
  args: { children: 'Default' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--p-space-3)' }}>
      <ComponentName variant="default">Default</ComponentName>
      <ComponentName variant="outlined">Outlined</ComponentName>
    </div>
  ),
};
```

### 5. 접근성 검증

- [ ] Storybook a11y 패널에서 위반 사항 0건
- [ ] 키보드 테스트 (Tab, Enter, Space, Escape)
- [ ] 대비비 4.5:1 이상
- [ ] ARIA 속성 올바르게 설정
- [ ] 포커스 표시자 확인

### 6. 문서 작성

```
_workspace/05_docs/components/{component-name}.md
```

문서 필수 섹션:

- 1줄 설명
- 사용 시점
- 기본 사용법 (코드 예시)
- Props 테이블
- 변형 (Variants) + 코드 예시
- 합성 패턴
- 접근성 (ARIA, 키보드)
- Do / Don't

### 7. 배럴 export 추가

```tsx
// _workspace/02_components/index.ts
export { default as NewComponent } from './common/NewComponent';
```

---

## 토큰 추가/수정 절차

### 새 토큰 추가

1. **계층 결정**: Primitive -> Semantic -> Component 중 적절한 계층 선택
2. **네이밍**: 기존 네이밍 규칙 준수

| 계층 | 형식 | 예시 |
|------|------|------|
| Primitive | `--p-{category}-{scale}` | `--p-green-575` |
| Semantic | `--s-{category}-{purpose}[-modifier]` | `--s-surface-selected` |
| Component | `--c-{component}-{property}[-variant][-state]` | `--c-chip-bg-active` |

3. **CSS 추가**: `_workspace/01_design_tokens/tokens.css`의 해당 계층 섹션에 추가
4. **TS 추가**: `_workspace/01_design_tokens/tokens.ts`의 해당 객체에 추가
5. **문서 추가**: `_workspace/01_design_tokens/token-map.md` 업데이트

### 토큰 수정

1. 영향 범위 확인: 해당 토큰을 참조하는 모든 시맨틱/컴포넌트 토큰 확인
2. 대비비 검증: 변경된 값이 WCAG AA 대비비를 충족하는지 확인
3. 하위호환 alias 확인: `tokens.css` 하단 alias 섹션 업데이트 필요 여부 확인

### 금지 사항

- 프리미티브 토큰을 컴포넌트에서 직접 참조하지 않는다
- 하드코딩된 색상값을 추가하지 않는다
- 기존 alias 변수(`--bg-*`, `--text-*`)를 새 코드에서 사용하지 않는다

---

## 스토리북 스토리 작성 규칙

### 필수 스토리

| 스토리 | 설명 |
|--------|------|
| Default | 기본 Props |
| AllVariants | 모든 변형을 한 눈에 |
| AllSizes | 모든 크기 (size prop이 있는 경우) |
| WithIcon | 아이콘 포함 (아이콘 prop이 있는 경우) |
| Disabled | 비활성 상태 |
| Interactive | play function으로 인터랙션 테스트 |

### 설정

- 뷰포트: Supercycl 360px (preview.ts에서 기본 설정)
- 배경: Dark (#050505)
- 글로벌 데코레이터: 360px 래퍼 적용

### 접근성 테스트

```tsx
import { expect } from '@storybook/test';

export const AccessibilityTest: Story = {
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    expect(button).toHaveAttribute('role', 'button');
    expect(button).not.toHaveAttribute('aria-disabled');
  },
};
```

---

## 접근성 체크리스트

새 컴포넌트 또는 수정 시 반드시 확인한다.

### 필수 (Must)

- [ ] 모든 인터랙티브 요소에 키보드 접근 가능 (Tab, Enter/Space)
- [ ] 포커스 표시자가 시각적으로 구분 가능 (`:focus-visible`)
- [ ] 텍스트/배경 대비비 4.5:1 이상 (일반), 3:1 이상 (대형)
- [ ] 적절한 ARIA role/속성 사용
- [ ] 장식 요소에 `aria-hidden="true"`
- [ ] 에러 메시지에 `role="alert"` 또는 `aria-live`
- [ ] 이미지/아이콘에 대체 텍스트 또는 aria-hidden

### 권장 (Should)

- [ ] Dialog에 포커스 트랩 구현
- [ ] Dialog 닫힐 때 이전 포커스 복원
- [ ] `prefers-reduced-motion` 존중
- [ ] 터치 타겟 44px 이상
- [ ] 시맨틱 HTML 태그 사용 (`<button>`, `<nav>`, `<article>`)

---

## PR 템플릿

```markdown
## 변경 사항

- [ ] 새 컴포넌트: `ComponentName`
- [ ] 토큰 추가/수정: `--c-component-*`
- [ ] 스토리 추가: `ComponentName.stories.tsx`
- [ ] 문서 추가: `component-name.md`

## 체크리스트

### 코드 품질
- [ ] readonly Props
- [ ] 인라인 CSSProperties 스타일
- [ ] 시맨틱/컴포넌트 토큰 사용 (하드코딩 없음)
- [ ] 불변 상태 업데이트
- [ ] 파일 800줄 이하

### 접근성
- [ ] 키보드 접근 가능
- [ ] ARIA 속성 올바름
- [ ] 대비비 4.5:1 이상
- [ ] 포커스 표시자 확인
- [ ] Storybook a11y 패널 위반 0건

### 문서
- [ ] Props 테이블 정확
- [ ] Do/Don't 예시 포함
- [ ] 코드 예시 복사-붙여넣기 실행 가능
- [ ] 접근성 노트 포함

## 스크린샷

| Before | After |
|--------|-------|
|        |       |
```

---

## 커밋 메시지 형식

```
<type>: <description>
```

| Type | 용도 |
|------|------|
| `feat` | 새 컴포넌트, 토큰, 기능 |
| `fix` | 버그 수정, 접근성 이슈 수정 |
| `refactor` | 코드 개선 (기능 변경 없음) |
| `docs` | 문서 추가/수정 |
| `test` | 테스트/스토리 추가 |
| `chore` | 설정, 빌드 |

예시:

```
feat: Card 컴포넌트에 as prop 추가 (시맨틱 태그 지원)
fix: Buy 버튼 텍스트 대비비 WCAG AA 충족하도록 수정
docs: Modal 컴포넌트 사용 가이드 작성
```
