# Token Map — Supercycl Design Tokens

3-Tier 토큰 체계: **Primitive** (원시값) -> **Semantic** (의미) -> **Component** (컴포넌트)

---

## 1. 기존 변수 -> 새 토큰 매핑

### 배경색 (Background)

| 기존 변수 | 새 시맨틱 토큰 | 새 프리미티브 원본 | 실제 값 |
|-----------|---------------|-------------------|--------|
| `--bg-primary` | `--s-surface-page` | `--p-gray-50` | `#050505` |
| `--bg-secondary` | `--s-surface-secondary` | `--p-gray-50` | `#050505` |
| `--bg-card` | `--s-surface-card` | `--p-gray-300` | `#242424` |
| `--bg-input` | `--s-surface-input` | `--p-gray-250` | `#1d1d1d` |
| `--bg-hover` | `--s-surface-hover` | `--p-gray-350` | `#2c2c2c` |
| `--bg-green-tint` | `--s-surface-tint-success` | `--p-green-200` | `#092900` |

### 텍스트 (Text)

| 기존 변수 | 새 시맨틱 토큰 | 새 프리미티브 원본 | 실제 값 |
|-----------|---------------|-------------------|--------|
| `--text-primary` | `--s-text-primary` | `--p-gray-950` | `#ffffff` |
| `--text-secondary` | `--s-text-secondary` | `--p-gray-750` | `#9f9f9f` |
| `--text-tertiary` | `--s-text-tertiary` | `--p-gray-600` | `#666666` |

### 액센트 / 트레이딩 (Accent / Trading)

| 기존 변수 | 새 시맨틱 토큰 | 새 프리미티브 원본 | 실제 값 |
|-----------|---------------|-------------------|--------|
| `--accent-green` | `--s-trading-buy` | `--p-green-500` | `#00de0b` |
| `--accent-red` | `--s-trading-sell` | `--p-red-500` | `#ff5938` |
| `--accent-yellow` | `--s-feedback-warning` | `--p-yellow-500` | `#f0b90b` |
| `--accent-blue` | `--s-feedback-info` | `--p-blue-500` | `#4285f4` |

### 브랜드 프라이머리 (Primary Variants)

| 기존 변수 | 새 시맨틱 토큰 | 새 프리미티브 원본 | 실제 값 |
|-----------|---------------|-------------------|--------|
| `--color-pri-1` | `--s-interactive-primary` | `--p-green-600` | `#00ff6a` |
| `--color-pri-2` | `--s-interactive-primary-alt` | `--p-green-650` | `#37ff00` |
| `--color-pri-3` | `--s-interactive-primary-muted` | `--p-green-500` | `#00de0b` |
| `--color-error` | `--s-feedback-error` | `--p-red-500` | `#ff5938` |

### 그레이 스케일 (Gray Scale)

| 기존 변수 | 새 프리미티브 토큰 | 실제 값 |
|-----------|-------------------|--------|
| `--gray-100` | `--p-gray-200` | `#151515` |
| `--gray-250` | `--p-gray-250` | `#1d1d1d` |
| `--gray-300` | `--p-gray-300` | `#242424` |
| `--gray-400` | `--p-gray-350` | `#2c2c2c` |
| `--gray-450` | `--p-gray-400` | `#363636` |
| `--gray-500` | `--p-gray-500` | `#505050` |
| `--gray-600` | `--p-gray-600` | `#666666` |
| `--gray-800` | `--p-gray-900` | `#e0e0e0` |

> 기존 그레이 스케일의 번호가 비표준(100, 250, 300, 400, 450...)이었음.
> 새 프리미티브는 50 단위로 정규화. 기존 번호는 alias로 유지.

### 보더 (Border)

| 기존 변수 | 새 시맨틱 토큰 | 새 프리미티브 원본 | 실제 값 |
|-----------|---------------|-------------------|--------|
| `--border-color` | `--s-border-default` | `--p-gray-350` | `#2c2c2c` |
| `--border-light` | `--s-border-subtle` | `--p-gray-300` | `#242424` |

### 보더 라디우스 (Radius)

| 기존 변수 | 새 프리미티브 토큰 | 실제 값 |
|-----------|-------------------|--------|
| `--radius-sm` (6px) | `--p-radius-md` | `6px` |
| `--radius-md` (10px) | `--p-radius-lg` | `10px` |
| `--radius-lg` (16px) | `--p-radius-xl` | `16px` |
| `--radius-xl` (20px) | `--p-radius-2xl` | `20px` |
| `--radius-full` | `--p-radius-full` | `9999px` |

### 폰트 패밀리 (Font Family)

| 기존 변수 | 새 시맨틱 토큰 | 새 프리미티브 원본 |
|-----------|---------------|-------------------|
| `--font-display` | `--s-font-family-display` | `--p-font-sans` |
| `--font-body` | `--s-font-family-default` | `--p-font-sans` |
| `--font-mono` | `--s-font-family-mono` | `--p-font-mono` |
| `--font-family` | `--s-font-family-default` | `--p-font-sans` |
| `--font-kr` | `--s-font-family-kr` | `--p-font-kr` |

---

## 2. Tier별 토큰 전체 목록

### Tier 1: Primitive (`--p-*`)

원시값. 컴포넌트에서 직접 참조하지 않는다.

#### 색상 팔레트

| 카테고리 | 스케일 범위 | 토큰 수 | 용도 |
|---------|-----------|--------|------|
| `--p-gray-*` | 50 ~ 950 (19단계) | 19 | 중립 배경, 텍스트, 보더 |
| `--p-green-*` | 50 ~ 950 (15단계) | 15 | 브랜드, 매수, 수익, 성공 |
| `--p-red-*` | 50 ~ 950 (12단계) | 12 | 매도, 손실, 에러 |
| `--p-yellow-*` | 50 ~ 950 (11단계) | 11 | 경고, 주의 |
| `--p-blue-*` | 50 ~ 950 (11단계) | 11 | 정보, 링크 |
| `--p-alpha-*` | 8종 | 8 | 투명도 오버레이 |

#### 타이포그래피

| 카테고리 | 토큰 | 값 |
|---------|------|-----|
| Font Family | `--p-font-sans` | IBM Plex Sans, system fallbacks |
| | `--p-font-mono` | IBM Plex Sans, SF Mono, Menlo |
| | `--p-font-kr` | Noto Sans KR, IBM Plex Sans |
| Font Size | `--p-font-size-2xs` | 8px |
| | `--p-font-size-xs` | 9px |
| | `--p-font-size-sm` | 10px |
| | `--p-font-size-md` | 11px |
| | `--p-font-size-base` | 12px |
| | `--p-font-size-lg` | 13px |
| | `--p-font-size-xl` | 14px |
| | `--p-font-size-2xl` | 16px |
| | `--p-font-size-3xl` | 20px |
| | `--p-font-size-4xl` | 24px |
| Line Height | `--p-line-height-tight` | 1.2 |
| | `--p-line-height-snug` | 1.3 |
| | `--p-line-height-normal` | 1.4 |
| | `--p-line-height-relaxed` | 1.5 |
| | `--p-line-height-loose` | 1.6 |
| Letter Spacing | `--p-letter-spacing-tight` | -0.02em |
| | `--p-letter-spacing-normal` | 0em |
| | `--p-letter-spacing-wide` | 0.02em |
| | `--p-letter-spacing-wider` | 0.04em |
| Font Weight | `--p-font-weight-regular` | 400 |
| | `--p-font-weight-medium` | 500 |
| | `--p-font-weight-semibold` | 600 |
| | `--p-font-weight-bold` | 700 |

#### 간격 (Spacing, 4px 그리드)

| 토큰 | 값 | 용도 예시 |
|------|-----|---------|
| `--p-space-0` | 0px | 리셋 |
| `--p-space-0.5` | 2px | 미세 조정 |
| `--p-space-1` | 4px | 최소 간격 |
| `--p-space-1.5` | 6px | 아이콘-텍스트 갭 |
| `--p-space-2` | 8px | 인라인 요소 간격 |
| `--p-space-2.5` | 10px | 인풋 패딩, 카드 내부 |
| `--p-space-3` | 12px | 카드 패딩, 토스트 패딩 |
| `--p-space-3.5` | 14px | 카드 좌측 패딩 |
| `--p-space-4` | 16px | 섹션 간격, 버튼 패딩 |
| `--p-space-4.5` | 18px | 헤더 패딩 |
| `--p-space-5` | 20px | 시트 패딩, 모달 측면 |
| `--p-space-6` | 24px | 모달 패딩, 버튼 수평 |
| `--p-space-7` | 28px | 대형 간격 |
| `--p-space-8` | 32px | 섹션 분리 |
| `--p-space-10` | 40px | 대형 섹션 |
| `--p-space-12` | 48px | 페이지 여백 |
| `--p-space-16` | 64px | 최대 여백 |

#### 보더 라디우스

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--p-radius-xs` | 2px | 인풋 |
| `--p-radius-sm` | 4px | 카드, 트레이드 버튼 |
| `--p-radius-md` | 6px | 소형 요소 |
| `--p-radius-lg` | 10px | 모달, 토스트 |
| `--p-radius-xl` | 16px | 대형 컨테이너 |
| `--p-radius-2xl` | 20px | 바텀시트 상단 |
| `--p-radius-3xl` | 32px | 필 버튼 |
| `--p-radius-full` | 9999px | 원형 |

#### 그림자

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--p-shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | 미세 엘리베이션 |
| `--p-shadow-md` | `0 2px 8px rgba(0,0,0,0.4)` | 토스트 |
| `--p-shadow-lg` | `0 4px 16px rgba(0,0,0,0.5)` | 모달 |
| `--p-shadow-xl` | `0 8px 32px rgba(0,0,0,0.6)` | 바텀시트 |
| `--p-shadow-glow-green` | `0 0 8px rgba(0,255,106,0.3)` | 그린 글로우 |
| `--p-shadow-glow-green-strong` | `0 0 20px rgba(0,255,106,0.6)` | 강한 그린 글로우 |

#### 모션

| 카테고리 | 토큰 | 값 | 용도 |
|---------|------|-----|------|
| Duration | `--p-duration-instant` | 0s | 즉시 |
| | `--p-duration-fast` | 0.15s | 호버, 포커스 |
| | `--p-duration-normal` | 0.2s | scaleIn |
| | `--p-duration-moderate` | 0.3s | fadeIn, slideUp, toastIn |
| | `--p-duration-slow` | 0.4s | checkmark, fadeInUp |
| | `--p-duration-slower` | 0.5s | orbPulse |
| | `--p-duration-loading` | 1s | spin |
| | `--p-duration-pulse` | 1.5s | pulse, glowPulse |
| Easing | `--p-ease-out` | ease-out | 대부분의 진입 애니메이션 |
| | `--p-ease-in-out` | ease-in-out | 반복 애니메이션 (pulse) |
| | `--p-ease-linear` | linear | spin (로딩) |
| | `--p-ease-spring` | cubic-bezier(0.34,1.56,0.64,1) | 바운스 효과 |

#### Z-Index

| 토큰 | 값 | 레이어 |
|------|-----|-------|
| `--p-z-base` | 0 | 기본 콘텐츠 |
| `--p-z-raised` | 10 | 부유 요소 |
| `--p-z-nav` | 50 | BottomNav |
| `--p-z-overlay` | 100 | 모달 백드롭/패널 |
| `--p-z-sheet` | 101 | 바텀시트 |
| `--p-z-toast` | 200 | 토스트 알림 |
| `--p-z-max` | 999 | 최상위 |

---

### Tier 2: Semantic (`--s-*`)

의미 기반 토큰. 컴포넌트 코드에서 주로 참조하는 레이어.

| 카테고리 | 토큰 | 참조 프리미티브 | 용도 |
|---------|------|---------------|------|
| **Surface** | `--s-surface-page` | `--p-gray-50` | 페이지 배경 |
| | `--s-surface-secondary` | `--p-gray-50` | 보조 배경 |
| | `--s-surface-card` | `--p-gray-300` | 카드, 패널 |
| | `--s-surface-input` | `--p-gray-250` | 인풋 필드 |
| | `--s-surface-hover` | `--p-gray-350` | 호버 상태 |
| | `--s-surface-elevated` | `--p-gray-300` | 엘리베이션 |
| | `--s-surface-overlay` | `--p-alpha-black-70` | 모달 백드롭 |
| | `--s-surface-glassmorphic` | `--p-alpha-black-60` | 글래스 효과 버튼 |
| | `--s-surface-tint-success` | `--p-green-200` | 성공 틴트 배경 |
| **Text** | `--s-text-primary` | `--p-gray-950` | 주요 텍스트 |
| | `--s-text-secondary` | `--p-gray-750` | 라벨, 힌트 |
| | `--s-text-tertiary` | `--p-gray-600` | 비활성, 최소 |
| | `--s-text-disabled` | `--p-gray-500` | 비활성 상태 |
| | `--s-text-inverse` | `--p-gray-50` | 밝은 배경 위 텍스트 |
| | `--s-text-on-accent` | `--p-gray-100` | 액센트 색상 위 텍스트 |
| **Border** | `--s-border-default` | `--p-gray-350` | 기본 보더 |
| | `--s-border-subtle` | `--p-gray-300` | 약한 보더 |
| | `--s-border-strong` | `--p-gray-600` | 강한 보더 |
| | `--s-border-focus` | `--p-green-500` | 포커스 보더 |
| **Interactive** | `--s-interactive-primary` | `--p-green-600` | CTA, 주요 액션 |
| | `--s-interactive-primary-alt` | `--p-green-650` | CTA 대안 |
| | `--s-interactive-primary-muted` | `--p-green-500` | 약한 CTA |
| | `--s-interactive-secondary` | `--p-gray-300` | 보조 액션 |
| | `--s-interactive-hover` | `--p-gray-350` | 호버 상태 |
| | `--s-interactive-disabled` | `--p-gray-500` | 비활성 상태 |
| **Feedback** | `--s-feedback-success` | `--p-green-500` | 성공 |
| | `--s-feedback-error` | `--p-red-500` | 에러 |
| | `--s-feedback-warning` | `--p-yellow-500` | 경고 |
| | `--s-feedback-info` | `--p-blue-500` | 정보 |
| **Trading** | `--s-trading-buy` | `--p-green-500` | 매수/롱 |
| | `--s-trading-sell` | `--p-red-500` | 매도/숏 |
| | `--s-trading-profit` | `--p-green-500` | 수익 |
| | `--s-trading-loss` | `--p-red-500` | 손실 |
| | `--s-trading-neutral` | `--p-gray-750` | 변동 없음 |

---

### Tier 3: Component (`--c-*`)

컴포넌트별 토큰. 특정 컴포넌트의 스타일을 세밀하게 제어.

#### Button

| 토큰 | 참조 | 용도 |
|------|------|------|
| `--c-button-bg-primary` | `--s-surface-glassmorphic` | 기본 버튼 배경 |
| `--c-button-bg-secondary` | `--s-surface-card` | 보조 버튼 배경 |
| `--c-button-bg-buy` | `--s-trading-buy` | 매수 버튼 |
| `--c-button-bg-sell` | `--s-trading-sell` | 매도 버튼 |
| `--c-button-bg-danger` | `--s-feedback-error` | 위험 액션 버튼 |
| `--c-button-bg-ghost` | `transparent` | 고스트 버튼 |
| `--c-button-radius-pill` | `--p-radius-3xl` (32px) | 필 버튼 |
| `--c-button-radius-trade` | `--p-radius-sm` (4px) | 트레이드 버튼 |
| `--c-button-disabled-opacity` | `0.4` | 비활성 상태 |

#### Input

| 토큰 | 참조 | 용도 |
|------|------|------|
| `--c-input-bg` | `--s-surface-input` | 인풋 배경 |
| `--c-input-radius` | `--p-radius-xs` (2px) | 인풋 라디우스 |
| `--c-input-height` | `30px` | 인풋 높이 |
| `--c-input-border-focus` | `1px solid --s-border-focus` | 포커스 보더 |

#### Modal / Sheet / Toast

| 컴포넌트 | 주요 토큰 | 참조 |
|---------|---------|------|
| Modal | `--c-modal-radius` | `--p-radius-xl` (16px) |
| | `--c-modal-padding` | `--p-space-6` (24px) |
| | `--c-modal-z` | `--s-z-overlay` (100) |
| Sheet | `--c-sheet-radius` | `--p-radius-2xl` (20px) top only |
| | `--c-sheet-padding` | `--p-space-5` (20px) |
| | `--c-sheet-z` | `--s-z-sheet` (101) |
| Toast | `--c-toast-radius` | `--p-radius-lg` (10px) |
| | `--c-toast-padding` | `--p-space-3 --p-space-5` (12px 20px) |
| | `--c-toast-z` | `--s-z-toast` (200) |
| | `--c-toast-dismiss` | `3000ms` |

#### Navigation

| 토큰 | 참조 | 용도 |
|------|------|------|
| `--c-header-height` | `56px` | 헤더 높이 |
| `--c-nav-height` | `50px` | 하단 내비 높이 |
| `--c-nav-icon-active` | `--s-text-primary` | 활성 탭 아이콘 |
| `--c-nav-icon-inactive` | `--s-text-tertiary` | 비활성 탭 아이콘 |

---

## 3. 마이그레이션 가이드

### 즉시 적용 (하위호환)

`tokens.css`의 하단 "BACKWARDS COMPATIBILITY ALIASES" 섹션이 기존 모든 `--bg-*`, `--text-*`, `--accent-*`, `--color-*`, `--gray-*`, `--border-*`, `--radius-*`, `--font-*` 변수를 새 토큰으로 리다이렉트한다. 기존 컴포넌트 코드는 변경 없이 동작한다.

### 점진적 마이그레이션

1. **신규 코드**: 시맨틱 토큰(`--s-*`) 또는 컴포넌트 토큰(`--c-*`)을 사용
2. **기존 코드**: 리팩터링 시점에 `var(--bg-card)` -> `var(--s-surface-card)` 등으로 전환
3. **TypeScript**: `tokens.semantic.color.surface.card` 형태로 타입 안전하게 접근

### 금지 사항

- 프리미티브 토큰(`--p-*`)을 컴포넌트에서 직접 사용하지 않는다
- 하드코딩된 색상값(`#242424`)을 새로 추가하지 않는다
- 기존 alias 변수를 새 코드에서 사용하지 않는다 (레거시 전용)
