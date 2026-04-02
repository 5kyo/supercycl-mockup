/**
 * Supercycl Design Tokens — TypeScript Object
 * 3-Tier: Primitive → Semantic → Component
 *
 * All values reference CSS custom properties for runtime theming.
 * Use `tokens.semantic.*` in component code; avoid referencing `primitive` directly.
 */

// ---------------------------------------------------------------------------
// Tier 1: Primitive Tokens
// ---------------------------------------------------------------------------

const primitive = {
  color: {
    gray: {
      50:  'var(--p-gray-50)',
      100: 'var(--p-gray-100)',
      150: 'var(--p-gray-150)',
      200: 'var(--p-gray-200)',
      250: 'var(--p-gray-250)',
      300: 'var(--p-gray-300)',
      350: 'var(--p-gray-350)',
      400: 'var(--p-gray-400)',
      450: 'var(--p-gray-450)',
      500: 'var(--p-gray-500)',
      550: 'var(--p-gray-550)',
      600: 'var(--p-gray-600)',
      650: 'var(--p-gray-650)',
      700: 'var(--p-gray-700)',
      750: 'var(--p-gray-750)',
      800: 'var(--p-gray-800)',
      850: 'var(--p-gray-850)',
      900: 'var(--p-gray-900)',
      950: 'var(--p-gray-950)',
    },
    green: {
      50:  'var(--p-green-50)',
      100: 'var(--p-green-100)',
      150: 'var(--p-green-150)',
      200: 'var(--p-green-200)',
      250: 'var(--p-green-250)',
      300: 'var(--p-green-300)',
      400: 'var(--p-green-400)',
      500: 'var(--p-green-500)',
      550: 'var(--p-green-550)',
      600: 'var(--p-green-600)',
      650: 'var(--p-green-650)',
      700: 'var(--p-green-700)',
      800: 'var(--p-green-800)',
      900: 'var(--p-green-900)',
      950: 'var(--p-green-950)',
    },
    red: {
      50:  'var(--p-red-50)',
      100: 'var(--p-red-100)',
      150: 'var(--p-red-150)',
      200: 'var(--p-red-200)',
      300: 'var(--p-red-300)',
      400: 'var(--p-red-400)',
      500: 'var(--p-red-500)',
      600: 'var(--p-red-600)',
      700: 'var(--p-red-700)',
      800: 'var(--p-red-800)',
      900: 'var(--p-red-900)',
      950: 'var(--p-red-950)',
    },
    yellow: {
      50:  'var(--p-yellow-50)',
      100: 'var(--p-yellow-100)',
      200: 'var(--p-yellow-200)',
      300: 'var(--p-yellow-300)',
      400: 'var(--p-yellow-400)',
      500: 'var(--p-yellow-500)',
      600: 'var(--p-yellow-600)',
      700: 'var(--p-yellow-700)',
      800: 'var(--p-yellow-800)',
      900: 'var(--p-yellow-900)',
      950: 'var(--p-yellow-950)',
    },
    blue: {
      50:  'var(--p-blue-50)',
      100: 'var(--p-blue-100)',
      200: 'var(--p-blue-200)',
      300: 'var(--p-blue-300)',
      400: 'var(--p-blue-400)',
      500: 'var(--p-blue-500)',
      600: 'var(--p-blue-600)',
      700: 'var(--p-blue-700)',
      800: 'var(--p-blue-800)',
      900: 'var(--p-blue-900)',
      950: 'var(--p-blue-950)',
    },
    alpha: {
      black60:  'var(--p-alpha-black-60)',
      black70:  'var(--p-alpha-black-70)',
      black80:  'var(--p-alpha-black-80)',
      white5:   'var(--p-alpha-white-5)',
      white10:  'var(--p-alpha-white-10)',
      white20:  'var(--p-alpha-white-20)',
      green30:  'var(--p-alpha-green-30)',
      green60:  'var(--p-alpha-green-60)',
    },
  },

  typography: {
    fontFamily: {
      sans: 'var(--p-font-sans)',
      mono: 'var(--p-font-mono)',
      kr:   'var(--p-font-kr)',
    },
    fontSize: {
      '2xs':  'var(--p-font-size-2xs)',
      xs:     'var(--p-font-size-xs)',
      sm:     'var(--p-font-size-sm)',
      md:     'var(--p-font-size-md)',
      base:   'var(--p-font-size-base)',
      lg:     'var(--p-font-size-lg)',
      xl:     'var(--p-font-size-xl)',
      '2xl':  'var(--p-font-size-2xl)',
      '3xl':  'var(--p-font-size-3xl)',
      '4xl':  'var(--p-font-size-4xl)',
    },
    lineHeight: {
      tight:   'var(--p-line-height-tight)',
      snug:    'var(--p-line-height-snug)',
      normal:  'var(--p-line-height-normal)',
      relaxed: 'var(--p-line-height-relaxed)',
      loose:   'var(--p-line-height-loose)',
    },
    letterSpacing: {
      tight:  'var(--p-letter-spacing-tight)',
      normal: 'var(--p-letter-spacing-normal)',
      wide:   'var(--p-letter-spacing-wide)',
      wider:  'var(--p-letter-spacing-wider)',
    },
    fontWeight: {
      regular:  'var(--p-font-weight-regular)',
      medium:   'var(--p-font-weight-medium)',
      semibold: 'var(--p-font-weight-semibold)',
      bold:     'var(--p-font-weight-bold)',
    },
  },

  spacing: {
    0:     'var(--p-space-0)',
    0.5:   'var(--p-space-0\\.5)',
    1:     'var(--p-space-1)',
    1.5:   'var(--p-space-1\\.5)',
    2:     'var(--p-space-2)',
    2.5:   'var(--p-space-2\\.5)',
    3:     'var(--p-space-3)',
    3.5:   'var(--p-space-3\\.5)',
    4:     'var(--p-space-4)',
    4.5:   'var(--p-space-4\\.5)',
    5:     'var(--p-space-5)',
    6:     'var(--p-space-6)',
    7:     'var(--p-space-7)',
    8:     'var(--p-space-8)',
    10:    'var(--p-space-10)',
    12:    'var(--p-space-12)',
    16:    'var(--p-space-16)',
  },

  radius: {
    xs:   'var(--p-radius-xs)',
    sm:   'var(--p-radius-sm)',
    md:   'var(--p-radius-md)',
    lg:   'var(--p-radius-lg)',
    xl:   'var(--p-radius-xl)',
    '2xl': 'var(--p-radius-2xl)',
    '3xl': 'var(--p-radius-3xl)',
    full: 'var(--p-radius-full)',
  },

  shadow: {
    sm:   'var(--p-shadow-sm)',
    md:   'var(--p-shadow-md)',
    lg:   'var(--p-shadow-lg)',
    xl:   'var(--p-shadow-xl)',
    glowGreen:       'var(--p-shadow-glow-green)',
    glowGreenStrong: 'var(--p-shadow-glow-green-strong)',
  },

  motion: {
    duration: {
      instant:  'var(--p-duration-instant)',
      fast:     'var(--p-duration-fast)',
      normal:   'var(--p-duration-normal)',
      moderate: 'var(--p-duration-moderate)',
      slow:     'var(--p-duration-slow)',
      slower:   'var(--p-duration-slower)',
      loading:  'var(--p-duration-loading)',
      pulse:    'var(--p-duration-pulse)',
    },
    easing: {
      out:    'var(--p-ease-out)',
      inOut:  'var(--p-ease-in-out)',
      linear: 'var(--p-ease-linear)',
      spring: 'var(--p-ease-spring)',
    },
  },

  zIndex: {
    base:    'var(--p-z-base)',
    raised:  'var(--p-z-raised)',
    nav:     'var(--p-z-nav)',
    overlay: 'var(--p-z-overlay)',
    sheet:   'var(--p-z-sheet)',
    toast:   'var(--p-z-toast)',
    max:     'var(--p-z-max)',
  },
} as const;


// ---------------------------------------------------------------------------
// Tier 2: Semantic Tokens
// ---------------------------------------------------------------------------

const semantic = {
  color: {
    surface: {
      page:         'var(--s-surface-page)',
      secondary:    'var(--s-surface-secondary)',
      card:         'var(--s-surface-card)',
      input:        'var(--s-surface-input)',
      hover:        'var(--s-surface-hover)',
      elevated:     'var(--s-surface-elevated)',
      overlay:      'var(--s-surface-overlay)',
      glassmorphic: 'var(--s-surface-glassmorphic)',
      tintSuccess:  'var(--s-surface-tint-success)',
    },
    text: {
      primary:   'var(--s-text-primary)',
      secondary: 'var(--s-text-secondary)',
      tertiary:  'var(--s-text-tertiary)',
      disabled:  'var(--s-text-disabled)',
      inverse:   'var(--s-text-inverse)',
      onAccent:  'var(--s-text-on-accent)',
    },
    border: {
      default: 'var(--s-border-default)',
      subtle:  'var(--s-border-subtle)',
      strong:  'var(--s-border-strong)',
      focus:   'var(--s-border-focus)',
    },
    interactive: {
      primary:      'var(--s-interactive-primary)',
      primaryAlt:   'var(--s-interactive-primary-alt)',
      primaryMuted: 'var(--s-interactive-primary-muted)',
      secondary:    'var(--s-interactive-secondary)',
      hover:        'var(--s-interactive-hover)',
      disabled:     'var(--s-interactive-disabled)',
    },
    feedback: {
      success:   'var(--s-feedback-success)',
      successBg: 'var(--s-feedback-success-bg)',
      error:     'var(--s-feedback-error)',
      errorBg:   'var(--s-feedback-error-bg)',
      warning:   'var(--s-feedback-warning)',
      warningBg: 'var(--s-feedback-warning-bg)',
      info:      'var(--s-feedback-info)',
      infoBg:    'var(--s-feedback-info-bg)',
    },
    trading: {
      buy:     'var(--s-trading-buy)',
      sell:    'var(--s-trading-sell)',
      profit:  'var(--s-trading-profit)',
      loss:    'var(--s-trading-loss)',
      neutral: 'var(--s-trading-neutral)',
    },
  },

  typography: {
    family: {
      default: 'var(--s-font-family-default)',
      display: 'var(--s-font-family-display)',
      mono:    'var(--s-font-family-mono)',
      kr:      'var(--s-font-family-kr)',
    },
  },

  motion: {
    fade:    'var(--s-motion-fade)',
    slide:   'var(--s-motion-slide)',
    scale:   'var(--s-motion-scale)',
    content: 'var(--s-motion-content)',
    loading: 'var(--s-motion-loading)',
    pulse:   'var(--s-motion-pulse)',
    success: 'var(--s-motion-success)',
  },

  elevation: {
    card:  'var(--s-elevation-card)',
    modal: 'var(--s-elevation-modal)',
    sheet: 'var(--s-elevation-sheet)',
    toast: 'var(--s-elevation-toast)',
    glow:  'var(--s-elevation-glow)',
  },

  zIndex: {
    base:    'var(--s-z-base)',
    nav:     'var(--s-z-nav)',
    overlay: 'var(--s-z-overlay)',
    sheet:   'var(--s-z-sheet)',
    toast:   'var(--s-z-toast)',
  },
} as const;


// ---------------------------------------------------------------------------
// Tier 3: Component Tokens
// ---------------------------------------------------------------------------

const component = {
  button: {
    bg: {
      primary:   'var(--c-button-bg-primary)',
      secondary: 'var(--c-button-bg-secondary)',
      buy:       'var(--c-button-bg-buy)',
      sell:      'var(--c-button-bg-sell)',
      danger:    'var(--c-button-bg-danger)',
      ghost:     'var(--c-button-bg-ghost)',
    },
    text: {
      primary: 'var(--c-button-text-primary)',
      buy:     'var(--c-button-text-buy)',   // #0a0a0a — 10.80:1 on green
      sell:    'var(--c-button-text-sell)',  // #0a0a0a — 6.62:1 on red
    },
    border: {
      primary:   'var(--c-button-border)',
      secondary: 'var(--c-button-border-secondary)',
    },
    radius: {
      pill:  'var(--c-button-radius-pill)',
      trade: 'var(--c-button-radius-trade)',
    },
    padding: {
      default: 'var(--c-button-padding)',
      trade:   'var(--c-button-padding-trade)',
    },
    fontSize:        'var(--c-button-font-size)',
    fontWeight:      'var(--c-button-font-weight)',
    disabledOpacity: 'var(--c-button-disabled-opacity)',
  },

  input: {
    bg:         'var(--c-input-bg)',
    text:       'var(--c-input-text)',
    labelColor: 'var(--c-input-label-color)',
    labelSize:  'var(--c-input-label-size)',
    valueSize:  'var(--c-input-value-size)',
    border:     'var(--c-input-border)',
    borderFocus:'var(--c-input-border-focus)',
    radius:     'var(--c-input-radius)',
    height:     'var(--c-input-height)',
    padding:    'var(--c-input-padding)',
  },

  card: {
    bg:             'var(--c-card-bg)',
    radius:         'var(--c-card-radius)',
    divider:        'var(--c-card-divider)',
    indicatorWidth: 'var(--c-card-indicator-width)',
    padding:        'var(--c-card-padding)',
  },

  modal: {
    backdrop:    'var(--c-modal-backdrop)',
    bg:          'var(--c-modal-bg)',
    radius:      'var(--c-modal-radius)',
    padding:     'var(--c-modal-padding)',
    z:           'var(--c-modal-z)',
    shadow:      'var(--c-modal-shadow)',
    maxWidth:    'var(--c-modal-max-width)',
    titleSize:   'var(--c-modal-title-size)',
    titleWeight: 'var(--c-modal-title-weight)',
  },

  sheet: {
    bg:           'var(--c-sheet-bg)',
    radius:       'var(--c-sheet-radius)',
    padding:      'var(--c-sheet-padding)',
    maxHeight:    'var(--c-sheet-max-height)',
    z:            'var(--c-sheet-z)',
    shadow:       'var(--c-sheet-shadow)',
    handleWidth:  'var(--c-sheet-handle-width)',
    handleHeight: 'var(--c-sheet-handle-height)',
  },

  toast: {
    bg:         'var(--c-toast-bg)',
    border:     'var(--c-toast-border)',
    radius:     'var(--c-toast-radius)',
    padding:    'var(--c-toast-padding)',
    maxWidth:   'var(--c-toast-max-width)',
    z:          'var(--c-toast-z)',
    fontSize:   'var(--c-toast-font-size)',
    fontWeight: 'var(--c-toast-font-weight)',
    bottom:     'var(--c-toast-bottom)',
    dismiss:    'var(--c-toast-dismiss)',
  },

  header: {
    bg:      'var(--c-header-bg)',
    height:  'var(--c-header-height)',
    padding: 'var(--c-header-padding)',
  },

  nav: {
    bg:           'var(--c-nav-bg)',
    height:       'var(--c-nav-height)',
    borderTop:    'var(--c-nav-border-top)',
    z:            'var(--c-nav-z)',
    iconActive:   'var(--c-nav-icon-active)',
    iconInactive: 'var(--c-nav-icon-inactive)',
    labelSize:    'var(--c-nav-label-size)',
  },

  orderbook: {
    fontFamily: 'var(--c-orderbook-font-family)',
    bidColor:   'var(--c-orderbook-bid-color)',
    askColor:   'var(--c-orderbook-ask-color)',
    text:       'var(--c-orderbook-text)',
  },

  position: {
    bg:      'var(--c-position-bg)',
    padding: 'var(--c-position-padding)',
    long:    'var(--c-position-long)',
    short:   'var(--c-position-short)',
  },

  signal: {
    bg:          'var(--c-signal-bg)',
    border:      'var(--c-signal-border)',
    badgeSize:   'var(--c-signal-badge-size)',
    badgeWeight: 'var(--c-signal-badge-weight)',
  },
} as const;


// ---------------------------------------------------------------------------
// Composite Typography Presets
// Convenience objects combining size + weight + lineHeight + letterSpacing
// ---------------------------------------------------------------------------

const typographyPreset = {
  /** Modal/sheet titles: 16px / 600 */
  title: {
    fontSize:      'var(--p-font-size-2xl)',
    fontWeight:    'var(--p-font-weight-semibold)',
    lineHeight:    'var(--p-line-height-tight)',
    letterSpacing: 'var(--p-letter-spacing-normal)',
  },
  /** Button labels: 16px / 500 */
  button: {
    fontSize:      'var(--p-font-size-2xl)',
    fontWeight:    'var(--p-font-weight-medium)',
    lineHeight:    'var(--p-line-height-tight)',
    letterSpacing: 'var(--p-letter-spacing-normal)',
  },
  /** Toast messages: 13px / 500 */
  toast: {
    fontSize:      'var(--p-font-size-lg)',
    fontWeight:    'var(--p-font-weight-medium)',
    lineHeight:    'var(--p-line-height-normal)',
    letterSpacing: 'var(--p-letter-spacing-normal)',
  },
  /** Card header / primary value: 12px / 600-700 */
  cardHeader: {
    fontSize:      'var(--p-font-size-base)',
    fontWeight:    'var(--p-font-weight-semibold)',
    lineHeight:    'var(--p-line-height-snug)',
    letterSpacing: 'var(--p-letter-spacing-normal)',
  },
  /** Tab labels: 11px / 400-500 */
  tab: {
    fontSize:      'var(--p-font-size-md)',
    fontWeight:    'var(--p-font-weight-regular)',
    lineHeight:    'var(--p-line-height-normal)',
    letterSpacing: 'var(--p-letter-spacing-wide)',
  },
  /** Secondary text: 10-11px / 500 */
  secondary: {
    fontSize:      'var(--p-font-size-sm)',
    fontWeight:    'var(--p-font-weight-medium)',
    lineHeight:    'var(--p-line-height-relaxed)',
    letterSpacing: 'var(--p-letter-spacing-normal)',
  },
  /** Status badge: 9px / 600 */
  badge: {
    fontSize:      'var(--p-font-size-xs)',
    fontWeight:    'var(--p-font-weight-semibold)',
    lineHeight:    'var(--p-line-height-tight)',
    letterSpacing: 'var(--p-letter-spacing-wider)',
  },
  /** Input label / tertiary: 8px / 400-500 */
  label: {
    fontSize:      'var(--p-font-size-2xs)',
    fontWeight:    'var(--p-font-weight-medium)',
    lineHeight:    'var(--p-line-height-normal)',
    letterSpacing: 'var(--p-letter-spacing-wide)',
  },
} as const;


// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const tokens = {
  primitive,
  semantic,
  component,
  typographyPreset,
} as const;

export type Tokens = typeof tokens;
export type PrimitiveTokens = typeof primitive;
export type SemanticTokens = typeof semantic;
export type ComponentTokens = typeof component;
export type TypographyPreset = typeof typographyPreset;
