import { type CSSProperties, type ReactNode, useCallback, useEffect, useRef } from 'react';

// =============================================================================
// Types
// =============================================================================

interface Props {
  readonly children: ReactNode;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: string;
  readonly maxHeight?: string;
  readonly showHandle?: boolean;
  readonly style?: CSSProperties;
}

// =============================================================================
// Style Constants — token-based
// =============================================================================

const backdropStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'var(--c-modal-backdrop)',
  zIndex: 'var(--c-modal-z)' as unknown as number,
  animation: 'fadeIn var(--p-duration-normal) var(--p-ease-out)',
};

const sheetBase: CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  maxWidth: '428px',
  margin: '0 auto',
  background: 'var(--c-sheet-bg)',
  borderRadius: 'var(--c-sheet-radius)',
  padding: 'var(--c-sheet-padding)',
  overflowY: 'auto',
  zIndex: 'var(--c-sheet-z)' as unknown as number,
  boxShadow: 'var(--c-sheet-shadow)',
  animation: 'slideUp var(--p-duration-moderate) var(--p-ease-out)',
  outline: 'none',
};

const handleStyle: CSSProperties = {
  width: 'var(--c-sheet-handle-width)',
  height: 'var(--c-sheet-handle-height)',
  background: 'var(--s-border-default)',
  borderRadius: 'var(--p-radius-full)',
  margin: '0 auto var(--p-space-4)',
};

const titleStyle: CSSProperties = {
  fontSize: 'var(--c-modal-title-size)',
  fontWeight: 'var(--c-modal-title-weight)' as CSSProperties['fontWeight'],
  color: 'var(--s-text-primary)',
  marginBottom: 'var(--p-space-4)',
  lineHeight: 'var(--p-line-height-tight)',
};

// =============================================================================
// Component
// =============================================================================

export default function BottomSheet({
  children,
  isOpen,
  onClose,
  title,
  maxHeight,
  showHandle = true,
  style,
}: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);

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
    sheetRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const sheetStyle: CSSProperties = {
    ...sheetBase,
    maxHeight: maxHeight ?? 'var(--c-sheet-max-height)',
    ...style,
  };

  return (
    <>
      <div
        style={backdropStyle}
        onClick={onClose}
        role="presentation"
        aria-hidden="true"
      />
      <div
        ref={sheetRef}
        style={sheetStyle}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Bottom sheet'}
        tabIndex={-1}
      >
        {showHandle && <div style={handleStyle} aria-hidden="true" />}
        {title && <div style={titleStyle}>{title}</div>}
        {children}
      </div>
    </>
  );
}
