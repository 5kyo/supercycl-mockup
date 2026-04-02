# Storybook 8 Configuration Guide

Supercycl 디자인 시스템을 위한 Storybook 설정 가이드.

## 설치

```bash
npx storybook@latest init --type react --builder vite
```

또는 수동 설치:

```bash
npm install -D @storybook/react-vite @storybook/react @storybook/addon-essentials @storybook/addon-a11y @storybook/addon-interactions @storybook/test
```

## 파일 구조

```
.storybook/
  main.ts        -- Storybook 메인 설정
  preview.ts     -- 글로벌 데코레이터 및 파라미터
  theme.ts       -- 커스텀 테마
```

## main.ts

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../_workspace/03_storybook/stories/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    // tokens.css를 전역 스타일로 포함
    return config;
  },
};

export default config;
```

## preview.ts

```typescript
import type { Preview } from '@storybook/react';
// tokens.css 전역 로드
import '../_workspace/01_design_tokens/tokens.css';

const preview: Preview = {
  parameters: {
    // 360px 모바일 뷰포트 설정
    viewport: {
      viewports: {
        supercycl: {
          name: 'Supercycl (360px)',
          styles: {
            width: '360px',
            height: '780px',
          },
        },
      },
      defaultViewport: 'supercycl',
    },
    // 다크 배경 기본 설정
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#050505' },
        { name: 'card', value: '#242424' },
      ],
    },
    // Controls 패널 정렬
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 레이아웃
    layout: 'centered',
  },
  // 글로벌 데코레이터: 360px 모바일 컨테이너
  decorators: [
    (Story) => (
      <div
        style={{
          width: '360px',
          minHeight: '100px',
          background: '#050505',
          fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          color: '#ffffff',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
```

## theme.ts (Storybook UI 테마)

```typescript
import { create } from '@storybook/theming';

export default create({
  base: 'dark',
  brandTitle: 'Supercycl Design System',
  brandUrl: 'https://github.com/okyokwon/supercycl-mockup',

  // Colors
  colorPrimary: '#00ff6a',
  colorSecondary: '#00de0b',

  // UI
  appBg: '#0a0a0a',
  appContentBg: '#050505',
  appBorderColor: '#2c2c2c',
  appBorderRadius: 4,

  // Text
  textColor: '#e0e0e0',
  textInverseColor: '#050505',

  // Toolbar
  barTextColor: '#9f9f9f',
  barSelectedColor: '#00ff6a',
  barBg: '#0a0a0a',

  // Form
  inputBg: '#1d1d1d',
  inputBorder: '#2c2c2c',
  inputTextColor: '#ffffff',
  inputBorderRadius: 2,
});
```

## tokens.css 전역 스타일 적용

`preview.ts`에서 직접 import하면 모든 스토리에 토큰 CSS 변수가 적용됩니다:

```typescript
import '../_workspace/01_design_tokens/tokens.css';
```

컴포넌트들이 `var(--s-surface-page)`, `var(--c-button-bg-primary)` 등의
CSS 변수를 참조하므로 이 import가 필수입니다.

## 360px 모바일 뷰포트

`preview.ts`의 `viewport` 파라미터에서 `supercycl` 뷰포트를 기본으로 설정합니다.
모든 스토리가 360px 너비로 렌더링됩니다.

글로벌 데코레이터에서도 360px 래퍼를 적용하여 스토리 컨텐츠가
실제 앱과 동일한 환경에서 렌더링되도록 합니다.

## 다크 테마 설정

이 앱은 dark-only이므로:

1. `preview.ts` backgrounds의 default를 `'dark'` (#050505)로 설정
2. `theme.ts`에서 Storybook UI 자체도 다크 테마로 설정
3. 글로벌 데코레이터에서 배경색 #050505, 텍스트 #ffffff 적용

## 실행

```bash
npx storybook dev -p 6006
```

## 빌드

```bash
npx storybook build -o storybook-static
```

## 애드온

| 애드온 | 용도 |
|--------|------|
| `@storybook/addon-essentials` | Controls, Actions, Docs 등 기본 애드온 |
| `@storybook/addon-a11y` | 접근성 자동 검사 (axe-core) |
| `@storybook/addon-interactions` | play function 기반 인터랙션 테스트 |

## 스토리 임포트 경로

스토리 파일에서 컴포넌트를 참조할 때 상대 경로를 사용합니다:

```typescript
// stories/components/Button.stories.tsx
import Button from '../../02_components/common/Button';
```

tsconfig에 paths 매핑을 추가하면 절대 경로도 가능합니다:

```json
{
  "compilerOptions": {
    "paths": {
      "@components/*": ["./_workspace/02_components/*"],
      "@tokens/*": ["./_workspace/01_design_tokens/*"]
    }
  }
}
```
