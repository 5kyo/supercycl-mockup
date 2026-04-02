import { type CSSProperties, type ReactNode, type ButtonHTMLAttributes, useState, useCallback } from 'react';

// =============================================================================
// Types
// =============================================================================

type ButtonVariant = 'primary' | 'secondary' | 'google' | 'buy' | 'sell' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly isLoading?: boolean;
  readonly fullWidth?: boolean;
  readonly leftIcon?: ReactNode;
  readonly rightIcon?: ReactNode;
  readonly as?: 'button' | 'a';
  readonly href?: string;
  readonly style?: CSSProperties;
}

// =============================================================================
// Style Constants — token-based
// =============================================================================

const baseStyle: CSSProperties = {
  fontFamily: 'var(--s-font-family-default)',
  fontWeight: 'var(--c-button-font-weight)' as CSSProperties['fontWeight'],
  transition: 'opacity var(--p-duration-fast) var(--p-ease-out), transform 0.1s var(--p-ease-out)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--p-space-2)',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  position: 'relative',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
};

const variantStyles: Readonly<Record<ButtonVariant, CSSProperties>> = {
  primary: {
    background: 'var(--c-button-bg-primary)',
    color: 'var(--c-button-text-primary)',
    border: 'var(--c-button-border)',
    borderRadius: 'var(--c-button-radius-pill)',
    backdropFilter: 'blur(2px)',
  },
  secondary: {
    background: 'var(--c-button-bg-secondary)',
    color: 'var(--s-text-secondary)',
    border: 'var(--c-button-border-secondary)',
    borderRadius: 'var(--c-button-radius-pill)',
  },
  google: {
    background: 'var(--c-button-bg-primary)',
    color: 'var(--c-button-text-primary)',
    border: 'var(--c-button-border)',
    borderRadius: 'var(--c-button-radius-pill)',
    backdropFilter: 'blur(2px)',
  },
  buy: {
    background: 'var(--c-button-bg-buy)',
    color: 'var(--c-button-text-buy)',
    borderRadius: 'var(--c-button-radius-trade)',
    fontWeight: 'var(--p-font-weight-semibold)' as CSSProperties['fontWeight'],
  },
  sell: {
    background: 'var(--c-button-bg-sell)',
    color: 'var(--c-button-text-sell)',
    borderRadius: 'var(--c-button-radius-trade)',
  },
  danger: {
    background: 'var(--c-button-bg-danger)',
    color: 'var(--c-button-text-sell)',
    borderRadius: 'var(--c-button-radius-trade)',
  },
  ghost: {
    background: 'var(--c-button-bg-ghost)',
    color: 'var(--s-text-secondary)',
    borderRadius: 'var(--c-button-radius-pill)',
  },
};

const sizeStyles: Readonly<Record<ButtonSize, CSSProperties>> = {
  sm: {
    padding: 'var(--p-space-1.5) var(--p-space-3)',
    fontSize: 'var(--p-font-size-base)',
  },
  md: {
    padding: 'var(--c-button-padding)',
    fontSize: 'var(--c-button-font-size)',
  },
  lg: {
    padding: 'var(--p-space-5) var(--p-space-8)',
    fontSize: 'var(--p-font-size-2xl)',
  },
};

const tradeSizeOverride: Readonly<Record<ButtonSize, CSSProperties>> = {
  sm: {
    padding: 'var(--p-space-1.5) var(--p-space-3)',
    fontSize: 'var(--p-font-size-sm)',
  },
  md: {
    padding: 'var(--c-button-padding-trade)',
    fontSize: 'var(--p-font-size-xl)',
  },
  lg: {
    padding: 'var(--p-space-3) var(--p-space-5)',
    fontSize: 'var(--p-font-size-2xl)',
  },
};

const TRADE_VARIANTS: ReadonlySet<ButtonVariant> = new Set<ButtonVariant>(['buy', 'sell', 'danger']);

const spinnerStyle: CSSProperties = {
  width: '14px',
  height: '14px',
  border: '2px solid currentColor',
  borderTopColor: 'transparent',
  borderRadius: 'var(--p-radius-full)',
  animation: 'spin var(--p-duration-loading) var(--p-ease-linear) infinite',
};

const disabledStyle: CSSProperties = {
  opacity: 'var(--c-button-disabled-opacity)' as unknown as number,
  cursor: 'not-allowed',
  pointerEvents: 'none',
};

const hoverActiveStyle: CSSProperties = {
  opacity: 0.85,
};

// =============================================================================
// Component
// =============================================================================

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  as: Element = 'button',
  href,
  style,
  onKeyDown,
  ...rest
}: Props) {
  const [isPressed, setIsPressed] = useState(false);

  const isDisabled = disabled || isLoading;
  const isTrade = TRADE_VARIANTS.has(variant);
  const sizeMap = isTrade ? tradeSizeOverride : sizeStyles;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        (e.currentTarget as HTMLButtonElement).click();
      }
      onKeyDown?.(e);
    },
    [onKeyDown],
  );

  const computedStyle: CSSProperties = {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeMap[size],
    ...(fullWidth ? { width: '100%' } : undefined),
    ...(isDisabled ? disabledStyle : undefined),
    ...(isPressed && !isDisabled ? hoverActiveStyle : undefined),
    ...style,
  };

  const content = (
    <>
      {isLoading && <span style={spinnerStyle} aria-hidden="true" />}
      {!isLoading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </>
  );

  const sharedProps = {
    style: computedStyle,
    'aria-disabled': isDisabled || undefined,
    'aria-busy': isLoading || undefined,
    role: Element === 'a' ? 'link' : 'button',
    tabIndex: isDisabled ? -1 : 0,
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onMouseLeave: () => setIsPressed(false),
  };

  if (Element === 'a') {
    return (
      <a href={href} {...sharedProps}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      onKeyDown={handleKeyDown}
      {...sharedProps}
      {...rest}
    >
      {content}
    </button>
  );
}
