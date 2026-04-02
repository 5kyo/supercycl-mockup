import type { CSSProperties, ReactNode, HTMLAttributes } from 'react';

// =============================================================================
// Types
// =============================================================================

type CardVariant = 'default' | 'outlined' | 'elevated';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  readonly children: ReactNode;
  readonly variant?: CardVariant;
  readonly indicator?: string;
  readonly header?: ReactNode;
  readonly footer?: ReactNode;
  readonly style?: CSSProperties;
}

// =============================================================================
// Style Constants — token-based
// =============================================================================

const cardBase: CSSProperties = {
  background: 'var(--c-card-bg)',
  borderRadius: 'var(--c-card-radius)',
  position: 'relative',
  overflow: 'hidden',
};

const variantStyles: Readonly<Record<CardVariant, CSSProperties>> = {
  default: {},
  outlined: {
    border: 'var(--c-card-divider)',
  },
  elevated: {
    boxShadow: 'var(--s-elevation-card)',
  },
};

const indicatorStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  width: 'var(--c-card-indicator-width)',
  borderRadius: 'var(--c-card-radius) 0 0 var(--c-card-radius)',
};

const bodyStyle: CSSProperties = {
  padding: 'var(--c-card-padding)',
};

const headerStyle: CSSProperties = {
  padding: 'var(--p-space-2.5) var(--p-space-3)',
  borderBottom: 'var(--c-card-divider)',
  fontSize: 'var(--p-font-size-base)',
  fontWeight: 'var(--p-font-weight-semibold)' as CSSProperties['fontWeight'],
  color: 'var(--s-text-primary)',
};

const footerStyle: CSSProperties = {
  padding: 'var(--p-space-2) var(--p-space-3)',
  borderTop: 'var(--c-card-divider)',
};

// =============================================================================
// Component
// =============================================================================

export default function Card({
  children,
  variant = 'default',
  indicator,
  header,
  footer,
  style,
  ...rest
}: Props) {
  const rootStyle: CSSProperties = {
    ...cardBase,
    ...variantStyles[variant],
    ...(indicator ? { paddingLeft: 'var(--c-card-indicator-width)' } : undefined),
    ...style,
  };

  return (
    <div style={rootStyle} {...rest}>
      {indicator && (
        <div
          style={{ ...indicatorStyle, background: indicator }}
          aria-hidden="true"
        />
      )}
      {header && <div style={headerStyle}>{header}</div>}
      <div style={bodyStyle}>{children}</div>
      {footer && <div style={footerStyle}>{footer}</div>}
    </div>
  );
}
