import { type CSSProperties, type ReactNode, useCallback, useEffect, useRef } from 'react';

// =============================================================================
// Types
// =============================================================================

type ModalSize = 'sm' | 'md' | 'lg';

interface Props {
  readonly children: ReactNode;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: string;
  readonly showClose?: boolean;
  readonly size?: ModalSize;
  readonly style?: CSSProperties;
}

// =============================================================================
// Style Constants — token-based
// =============================================================================

const backdropStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'var(--c-modal-backdrop)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 'var(--c-modal-z)' as unknown as number,
  padding: 'var(--p-space-5)',
  animation: 'fadeIn var(--p-duration-normal) var(--p-ease-out)',
};

const panelBase: CSSProperties = {
  background: 'var(--c-modal-bg)',
  borderRadius: 'var(--c-modal-radius)',
  padding: 'var(--c-modal-padding)',
  width: '100%',
  boxShadow: 'var(--c-modal-shadow)',
  animation: 'scaleIn var(--p-duration-normal) var(--p-ease-out)',
  outline: 'none',
};

const sizeStyles: Readonly<Record<ModalSize, CSSProperties>> = {
  sm: { maxWidth: '280px' },
  md: { maxWidth: 'var(--c-modal-max-width)' },
  lg: { maxWidth: '360px' },
};

const headerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 'var(--p-space-4)',
};

const titleStyle: CSSProperties = {
  fontSize: 'var(--c-modal-title-size)',
  fontWeight: 'var(--c-modal-title-weight)' as CSSProperties['fontWeight'],
  color: 'var(--s-text-primary)',
  lineHeight: 'var(--p-line-height-tight)',
};

const closeButtonStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--s-text-secondary)',
  fontSize: '20px',
  padding: 'var(--p-space-1)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
};

// =============================================================================
// Component
// =============================================================================

export default function Modal({
  children,
  isOpen,
  onClose,
  title,
  showClose = true,
  size = 'md',
  style,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeyDown);
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Focus the panel for keyboard accessibility
    panelRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const panelStyle: CSSProperties = {
    ...panelBase,
    ...sizeStyles[size],
    ...style,
  };

  const hasHeader = title || showClose;

  return (
    <div
      style={backdropStyle}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        {hasHeader && (
          <div style={headerStyle}>
            {title ? (
              <span style={titleStyle}>{title}</span>
            ) : (
              <span />
            )}
            {showClose && (
              <button
                onClick={onClose}
                style={closeButtonStyle}
                aria-label="Close modal"
                type="button"
              >
                &#x2715;
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
