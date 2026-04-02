import { type CSSProperties, type ReactNode, useEffect, useCallback, useState } from 'react';

// =============================================================================
// Types
// =============================================================================

type ToastVariant = 'default' | 'success' | 'error' | 'warning';

interface Props {
  readonly message: string;
  readonly variant?: ToastVariant;
  readonly icon?: ReactNode;
  readonly duration?: number;
  readonly isVisible: boolean;
  readonly onDismiss: () => void;
  readonly style?: CSSProperties;
}

// =============================================================================
// Style Constants — token-based
// =============================================================================

const containerBase: CSSProperties = {
  position: 'fixed',
  bottom: 'var(--c-toast-bottom)',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'var(--c-toast-bg)',
  border: 'var(--c-toast-border)',
  borderRadius: 'var(--c-toast-radius)',
  padding: 'var(--c-toast-padding)',
  maxWidth: 'var(--c-toast-max-width)',
  zIndex: 'var(--c-toast-z)' as unknown as number,
  fontSize: 'var(--c-toast-font-size)',
  fontWeight: 'var(--c-toast-font-weight)' as CSSProperties['fontWeight'],
  color: 'var(--s-text-primary)',
  textAlign: 'center',
  boxShadow: 'var(--s-elevation-toast)',
  animation: 'toastIn var(--p-duration-moderate) var(--p-ease-out)',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--p-space-2)',
};

const variantAccent: Readonly<Record<ToastVariant, CSSProperties>> = {
  default: {},
  success: {
    borderColor: 'var(--s-feedback-success)',
  },
  error: {
    borderColor: 'var(--s-feedback-error)',
  },
  warning: {
    borderColor: 'var(--s-feedback-warning)',
  },
};

const variantIconColor: Readonly<Record<ToastVariant, string>> = {
  default: 'var(--s-text-primary)',
  success: 'var(--s-feedback-success)',
  error: 'var(--s-feedback-error)',
  warning: 'var(--s-feedback-warning)',
};

const DEFAULT_ICONS: Readonly<Record<ToastVariant, string>> = {
  default: '',
  success: '\u2713',
  error: '\u2717',
  warning: '\u26A0',
};

const iconWrapStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  fontSize: 'var(--p-font-size-xl)',
};

// =============================================================================
// Constants
// =============================================================================

const DEFAULT_DURATION = 3000;

// =============================================================================
// Component
// =============================================================================

export default function Toast({
  message,
  variant = 'default',
  icon,
  duration,
  isVisible,
  onDismiss,
  style,
}: Props) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  const dismissDuration = duration ?? DEFAULT_DURATION;

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    }
  }, [isVisible]);

  const handleDismiss = useCallback(() => {
    setShouldRender(false);
    onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(handleDismiss, dismissDuration);
    return () => clearTimeout(timer);
  }, [isVisible, dismissDuration, handleDismiss]);

  if (!shouldRender || !isVisible) return null;

  const toastStyle: CSSProperties = {
    ...containerBase,
    ...variantAccent[variant],
    ...style,
  };

  const resolvedIcon = icon ?? (DEFAULT_ICONS[variant] || null);

  return (
    <div
      style={toastStyle}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {resolvedIcon && (
        <span style={{ ...iconWrapStyle, color: variantIconColor[variant] }} aria-hidden="true">
          {resolvedIcon}
        </span>
      )}
      <span>{message}</span>
    </div>
  );
}
