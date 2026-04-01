# Design System

360px fixed-width, dark-theme, mobile-only trading app.

## Colors

### Backgrounds
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#050505` | Page background |
| `--bg-secondary` | `#050505` | Secondary background |
| `--bg-card` | `#242424` | Cards, panels |
| `--bg-input` | `#1d1d1d` | Input fields |
| `--bg-hover` | `#2c2c2c` | Hover states |
| `--bg-green-tint` | `#092900` | Success tint |

### Text
| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#ffffff` | Primary text |
| `--text-secondary` | `#9f9f9f` | Labels, hints |
| `--text-tertiary` | `#666666` | Disabled, minimal |

### Accents
| Token | Value | Usage |
|-------|-------|-------|
| `--accent-green` | `#00de0b` | Buy/Long, success, profit |
| `--accent-red` | `#ff5938` | Sell/Short, danger, loss |
| `--accent-yellow` | `#f0b90b` | Warning |
| `--accent-blue` | `#4285f4` | Info |

### Primary Variants
| Token | Value |
|-------|-------|
| `--color-pri-1` | `#00ff6a` |
| `--color-pri-2` | `#37ff00` |
| `--color-pri-3` | `#00de0b` |
| `--color-error` | `#ff5938` |

### Gray Scale
| Token | Value |
|-------|-------|
| `--gray-100` | `#151515` |
| `--gray-250` | `#1d1d1d` |
| `--gray-300` | `#242424` |
| `--gray-400` | `#2c2c2c` |
| `--gray-450` | `#363636` |
| `--gray-500` | `#505050` |
| `--gray-600` | `#666666` |
| `--gray-800` | `#e0e0e0` |

### Borders
| Token | Value |
|-------|-------|
| `--border-color` | `#2c2c2c` |
| `--border-light` | `#242424` |

## Typography

**Font family**: IBM Plex Sans (primary), Noto Sans KR (Korean)

| Token | Value |
|-------|-------|
| `--font-display` | `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif` |
| `--font-body` | `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif` |
| `--font-mono` | `'IBM Plex Sans', 'SF Mono', 'Menlo', monospace` |
| `--font-kr` | `'Noto Sans KR', 'IBM Plex Sans', sans-serif` |

### Size & Weight Usage

| Context | Size | Weight |
|---------|------|--------|
| Modal/sheet title | 16px | 600 |
| Button label | 16px | 500 |
| Toast message | 13px | 500 |
| Card header / primary value | 12px | 600-700 |
| Tab label | 11px | 400-500 |
| Secondary text | 10-11px | 500 |
| Status badge | 9px | 600 |
| Input label / tertiary | 8px | 400-500 |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Small elements |
| `--radius-md` | `10px` | Modals, toast |
| `--radius-lg` | `16px` | Large containers, modal panels |
| `--radius-xl` | `20px` | Bottom sheets (top corners) |
| `--radius-full` | `9999px` | Pill buttons |
| (inline) | `2-4px` | Inputs, cards, trade buttons |

## Spacing

Base unit: **4px**. Common values: 6, 8, 10, 12, 14, 16, 20, 24px.

| Element | Padding |
|---------|---------|
| Header | `18px 20px` (height: 56px) |
| BottomNav | height: 50px |
| Modal panel | `24px` |
| Bottom sheet | `20px` |
| Position card | `10px 12px 10px 14px` |
| Toast | `12px 20px` |
| Button (primary) | `18px 24px` |
| Button (trade) | `9-10px 16px` |
| Input | `0 10px` (height: 30px) |

## Z-index Layers

| Layer | Z-index |
|-------|---------|
| Base content | 0 |
| BottomNav | 50 |
| Modal backdrop/panel | 100 |
| Bottom sheet | 101 |
| Toast | 200 |

## Component Patterns

### Button Variants

| Variant | Background | Border | Radius |
|---------|-----------|--------|--------|
| `primary` | `rgba(5,5,5,0.6)` + blur | `1px #666` | `32px` |
| `secondary` | `var(--bg-card)` | `1px var(--border-color)` | `32px` |
| `google` | `rgba(5,5,5,0.6)` + blur | `1px #666` | `32px` |
| `buy` | `#00de0b` | none | `3px` |
| `sell` | `#ff5938` | none | `3px` |
| `danger` | `#ff5938` | none | `3px` |
| `ghost` | transparent | none | `32px` |

Disabled: `opacity: 0.4`, `cursor: not-allowed`.

### Card

- Background: `var(--bg-card)`
- Border radius: `4px`
- Left color indicator: `3px` absolute-positioned bar (green/red)
- Internal divider: `1px solid #2c2c2c`

### Input

- Background: `#1d1d1d`
- Border radius: `2px`
- Height: `30px`
- Label: 8px/500/#9f9f9f, Value: 12px/#fff

### Modal

- Backdrop: `rgba(0,0,0,0.7)`, fixed inset 0, z-index 100
- Panel: `var(--bg-card)`, radius `var(--radius-lg)`, padding `24px`, max-width `360px`
- Animation: `scaleIn 0.2s ease-out`

### Bottom Sheet

- Position: fixed bottom 0, z-index 101
- Border radius: `20px 20px 0 0`
- Padding: `20px`, max-height: `70vh`
- Handle bar: 40px wide, 4px height, centered
- Animation: `slideUp 0.3s ease-out`

### Toast

- Position: fixed, bottom 80px (above BottomNav)
- Background: `var(--bg-card)`, border `1px`, radius `var(--radius-md)`
- Padding: `12px 20px`, max-width `360px`
- Animation: `toastIn 0.3s ease-out`
- Auto-dismiss: 3000ms

### Header

- Height: `56px`, background: `#050505`, padding: `18px 20px`
- Contains logo + testnet badge

### BottomNav

- Height: `50px`, fixed bottom, z-index 50
- Border-top: `1px solid #242424`
- 4 tabs: Trade, Signal, Portfolio, Settings
- Active: `#fff`, Inactive: `#666`

## Animations

Defined in `src/styles/animations.css`.

| Name | Duration | Easing | Usage |
|------|----------|--------|-------|
| `fadeIn` | 0.3s | ease-out | General fade |
| `slideUp` | 0.3s | ease-out | Bottom sheet entry |
| `slideDown` | 0.3s | ease-out | Dropdown |
| `scaleIn` | 0.2s | ease-out | Modal entry |
| `spin` | 1s | linear infinite | Loading |
| `checkmark` | 0.4s | ease-out | Success |
| `toastIn/Out` | 0.3s | ease-out | Toast |
| `pulse` | 1.5s | ease-in-out infinite | Loading state |
| `glowPulse` | 1.5s | ease-in-out infinite | Accent glow |
| `fadeInUp` | 0.4s | ease-out | Content reveal |
| `particleDrift` | continuous | - | Background effect |
| `orbPulse` | 0.5s | loop | Orb animation |
| `slideInBanner` | - | - | Banner entry |

CSS classes available: `.animate-fadeIn`, `.animate-slideUp`, `.animate-slideDown`, `.animate-scaleIn`, `.animate-spin`, `.animate-checkmark`, `.animate-pulse`, `.animate-glowPulse`, `.animate-fadeInUp`.

## Icons

- Inline SVG in components (BottomNav tabs, close buttons, arrows)
- Image assets in `/public/images/`: logo-icon.svg, logo-text.svg, icon-close.svg, testnet-badge.svg
- Default stroke width: `1.2px`
- Colors: active `#fff`, inactive `#666`
