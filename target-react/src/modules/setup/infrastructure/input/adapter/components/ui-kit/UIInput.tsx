import React, { useState } from 'react';
import { uiKitColors } from '../../styles/uiKitColors';
import { uiKitSizes } from '../../styles/uiKitSizes';

interface UIInputProps {
  /**
   * ID del input
   */
  id?: string;

  /**
   * Tamaño del input
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Placeholder del input
   */
  placeholder?: string;

  /**
   * Valor del input
   */
  value?: string;

  /**
   * Callback al cambiar valor
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

  /**
   * Deshabilitado
   * @default false
   */
  disabled?: boolean;

  /**
   * Estado de error
   * @default false
   */
  error?: boolean;

  /**
   * Mensaje de error
   */
  errorMessage?: string;

  /**
   * Label del input
   */
  label?: string;

  /**
   * Tipo de input
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'search';

  /**
   * Requerido
   * @default false
   */
  required?: boolean;

  /**
   * Ícono izquierdo (opcional)
   */
  iconLeft?: React.ReactNode;

  /**
   * Ícono derecho (opcional)
   */
  iconRight?: React.ReactNode;

  /**
   * Ancho completo
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Clase CSS adicional
   */
  className?: string;

  /**
   * Elemento a renderizar ('input' o 'select')
   * @default 'input'
   */
  as?: 'input' | 'select';

  /**
   * Children (para select options)
   */
  children?: React.ReactNode;

  /**
   * Estilos adicionales
   */
  style?: React.CSSProperties;

  /**
   * Callback al hacer focus
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback al perder focus
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * Componente UIInput reutilizable
 * Soporta 3 tamaños: small, medium, large
 * Estados: normal, focus, error, disabled
 * Completamente accesible
 */
export const UIInput: React.FC<UIInputProps> = ({
  id,
  size = 'medium',
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  errorMessage,
  label,
  type = 'text',
  required = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  className,
  style,
  onFocus,
  onBlur,
  as = 'input',
  children,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isSelect = as === 'select';
  const sizeConfig = uiKitSizes.input[size];

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setIsFocused(true);
    if (e.currentTarget instanceof HTMLInputElement) {
      onFocus?.(e as React.FocusEvent<HTMLInputElement>);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setIsFocused(false);
    if (e.currentTarget instanceof HTMLInputElement) {
      onBlur?.(e as React.FocusEvent<HTMLInputElement>);
    }
  };

  // Determinar color del borde
  const getBorderColor = (): string => {
    if (error) {
      return uiKitColors.states.error;
    }
    if (isFocused) {
      return uiKitColors.primary.normal;
    }
    return uiKitColors.borders.light;
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: uiKitSizes.typography.fontSize.sm,
    fontWeight: uiKitSizes.typography.fontWeight.medium,
    color: disabled ? uiKitColors.neutral.gray400 : uiKitColors.neutral.gray700,
  };

  const inputWrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: fullWidth ? '100%' : 'auto',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: sizeConfig.height,
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    borderRadius: `${sizeConfig.borderRadius}px`,
    border: `1px solid ${getBorderColor()}`,
    backgroundColor: disabled ? uiKitColors.backgrounds.dark : uiKitColors.neutral.white,
    color: disabled ? uiKitColors.neutral.gray400 : uiKitColors.neutral.gray900,
    cursor: disabled ? 'not-allowed' : 'text',
    transition: uiKitSizes.transition.fast,
    paddingLeft: iconLeft ? '36px' : sizeConfig.padding,
    paddingRight: isSelect || iconRight ? '36px' : sizeConfig.padding,
    outline: 'none',
    opacity: disabled ? 0.6 : 1,
    appearance: isSelect ? 'none' : undefined,
    WebkitAppearance: isSelect ? 'none' : undefined,
    MozAppearance: isSelect ? 'none' : undefined,
    ...style,
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: disabled ? uiKitColors.neutral.gray400 : uiKitColors.neutral.gray500,
    pointerEvents: 'none',
  };

  const leftIconStyle: React.CSSProperties = {
    ...iconStyle,
    left: '12px',
  };

  const rightIconStyle: React.CSSProperties = {
    ...iconStyle,
    right: '12px',
  };

  const errorMessageStyle: React.CSSProperties = {
    fontSize: uiKitSizes.typography.fontSize.xs,
    color: uiKitColors.states.error,
    fontWeight: uiKitSizes.typography.fontWeight.normal,
  };

  return (
    <div style={containerStyle} className={className}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: uiKitColors.states.error }}> *</span>}
        </label>
      )}
      <div style={inputWrapperStyle}>
        {iconLeft && <div style={leftIconStyle}>{iconLeft}</div>}
        {as === 'select' ? (
          <select
            id={id}
            value={value}
            onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
            disabled={disabled}
            onFocus={handleFocus as (e: React.FocusEvent<HTMLSelectElement>) => void}
            onBlur={handleBlur as (e: React.FocusEvent<HTMLSelectElement>) => void}
            style={inputStyle}
            aria-invalid={error}
          >
            {children}
          </select>
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
            disabled={disabled}
            onFocus={handleFocus as (e: React.FocusEvent<HTMLInputElement>) => void}
            onBlur={handleBlur as (e: React.FocusEvent<HTMLInputElement>) => void}
            style={inputStyle}
            aria-invalid={error}
          />
        )}
        {isSelect && (
          <div
            style={{
              ...rightIconStyle,
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 1,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M6 8L10 12L14 8"
                stroke={disabled ? uiKitColors.neutral.gray400 : uiKitColors.neutral.gray600}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
        {iconRight && <div style={rightIconStyle}>{iconRight}</div>}
      </div>
      {error && errorMessage && <div style={errorMessageStyle}>{errorMessage}</div>}
    </div>
  );
};
