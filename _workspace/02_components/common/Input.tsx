import { type CSSProperties, type InputHTMLAttributes, type ReactNode, useState, useCallback, useId } from 'react';

// =============================================================================
// Types
// =============================================================================

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style' | 'size'> {
  readonly label?: string;
  readonly error?: string;
  readonly helperText?: string;
  readonly leftIcon?: ReactNode;
  readonly rightIcon?: ReactNode;
  readonly fullWidth?: boolean;
  readonly style?: CSSProperties;
}

// =============================================================================
// Style Constants — token-based
// =============================================================================

const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--p-space-1)',
};

const labelStyle: CSSProperties = {
  fontSize: 'var(--c-input-label-size)',
  fontWeight: 'var(--p-font-weight-medium)' as CSSProperties['fontWeight'],
  color: 'var(--c-input-label-color)',
  letterSpacing: 'var(--p-letter-spacing-wide)',
  lineHeight: 'var(--p-line-height-normal)',
};

const inputContainerBase: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  background: 'var(--c-input-bg)',
  border: 'var(--c-input-border)',
  borderRadius: 'var(--c-input-radius)',
  height: 'var(--c-input-height)',
  padding: 'var(--c-input-padding)',
  transition: 'border-color var(--p-duration-fast) var(--p-ease-out)',
};

const inputContainerFocused: CSSProperties = {
  ...inputContainerBase,
  border: 'var(--c-input-border-focus)',
};

const inputContainerError: CSSProperties = {
  ...inputContainerBase,
  border: '1px solid var(--s-feedback-error)',
};

const inputStyle: CSSProperties = {
  flex: 1,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: 'var(--c-input-text)',
  fontSize: 'var(--c-input-value-size)',
  fontFamily: 'var(--s-font-family-default)',
  padding: 0,
  width: '100%',
  minWidth: 0,
};

const iconStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  color: 'var(--s-text-tertiary)',
  flexShrink: 0,
};

const leftIconStyle: CSSProperties = {
  ...iconStyle,
  marginRight: 'var(--p-space-1.5)',
};

const rightIconStyle: CSSProperties = {
  ...iconStyle,
  marginLeft: 'var(--p-space-1.5)',
};

const helperStyle: CSSProperties = {
  fontSize: 'var(--p-font-size-2xs)',
  color: 'var(--s-text-tertiary)',
  lineHeight: 'var(--p-line-height-normal)',
};

const errorStyle: CSSProperties = {
  fontSize: 'var(--p-font-size-2xs)',
  color: 'var(--s-feedback-error)',
  lineHeight: 'var(--p-line-height-normal)',
};

const disabledStyle: CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed',
};

// =============================================================================
// Component
// =============================================================================

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  id: externalId,
  style,
  onFocus,
  onBlur,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const autoId = useId();
  const inputId = externalId ?? autoId;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText && !error ? `${inputId}-helper` : undefined;

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const containerStyle = error
    ? inputContainerError
    : isFocused
      ? inputContainerFocused
      : inputContainerBase;

  const rootStyle: CSSProperties = {
    ...wrapperStyle,
    ...(fullWidth ? { width: '100%' } : undefined),
    ...(disabled ? disabledStyle : undefined),
    ...style,
  };

  return (
    <div style={rootStyle}>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      )}
      <div style={containerStyle}>
        {leftIcon && <span style={leftIconStyle} aria-hidden="true">{leftIcon}</span>}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId ?? helperId}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {rightIcon && <span style={rightIconStyle} aria-hidden="true">{rightIcon}</span>}
      </div>
      {error && (
        <span id={errorId} role="alert" style={errorStyle}>
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={helperId} style={helperStyle}>
          {helperText}
        </span>
      )}
    </div>
  );
}
