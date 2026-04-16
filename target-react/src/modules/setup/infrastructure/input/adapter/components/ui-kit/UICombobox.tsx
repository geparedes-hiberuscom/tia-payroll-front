import React from 'react';
import { uiKitColors } from '../../styles/uiKitColors';
import { uiKitSizes } from '../../styles/uiKitSizes';

export interface UIComboboxOption {
  value: string;
  label: string;
}

interface UIComboboxProps {
  /** ID del input */
  id?: string;
  /** Label visible */
  label?: string;
  /** Valor actual (el ID en crudo que se enviará al backend) */
  value?: string;
  /** Callback cuando cambia el valor */
  onChange?: (value: string) => void;
  /** Opciones del dropdown */
  options?: UIComboboxOption[];
  /** Indica si las opciones están cargando */
  loadingOptions?: boolean;
  /** Deshabilitado */
  disabled?: boolean;
  /** Estado de error */
  error?: boolean;
  /** Mensaje de error */
  errorMessage?: string;
  /** Campo requerido */
  required?: boolean;
  /** Placeholder */
  placeholder?: string;
  /** Ancho completo */
  fullWidth?: boolean;
  /** Tamaño */
  size?: 'small' | 'medium' | 'large';
}

/**
 * UICombobox — Input editable con dropdown de opciones.
 * El usuario puede escribir el valor directamente o seleccionarlo del listado.
 * Estilos consistentes con UIInput del sistema de diseño.
 */
export const UICombobox: React.FC<UIComboboxProps> = ({
  id,
  label,
  value = '',
  onChange,
  options = [],
  loadingOptions = false,
  disabled = false,
  error = false,
  errorMessage,
  required = false,
  placeholder,
  fullWidth = false,
  size = 'medium',
}) => {
  const sizeConfig = uiKitSizes.input[size];

  const getBorderColor = (): string => {
    if (error) return uiKitColors.states.error;
    return uiKitColors.borders.light;
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: sizeConfig.height,
    padding: sizeConfig.padding,
    paddingRight: '36px',
    fontSize: sizeConfig.fontSize,
    borderRadius: `${sizeConfig.borderRadius}px`,
    border: `1px solid ${getBorderColor()}`,
    backgroundColor: disabled ? uiKitColors.backgrounds.dark : uiKitColors.neutral.white,
    color: disabled ? uiKitColors.neutral.gray400 : uiKitColors.neutral.gray900,
    cursor: disabled ? 'not-allowed' : 'text',
    transition: uiKitSizes.transition.fast,
    outline: 'none',
    opacity: disabled ? 0.6 : 1,
    boxSizing: 'border-box',
    // Esconder ícono nativo del navegador
    backgroundImage: 'none',
    backgroundRepeat: 'no-repeat',
    appearance: 'none',
    WebkitAppearance: 'none',
  } as React.CSSProperties;

  const datalistId = id ? `${id}-options` : undefined;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        width: fullWidth ? '100%' : 'auto',
        position: 'relative',
      }}
    >
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: uiKitSizes.typography.fontSize.sm,
            fontWeight: uiKitSizes.typography.fontWeight.medium,
            color: disabled ? uiKitColors.neutral.gray400 : uiKitColors.neutral.gray700,
          }}
        >
          {label}
          {required && <span style={{ color: uiKitColors.states.error }}> *</span>}
        </label>
      )}

      <div style={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
        <style>{`
          input[list]::-webkit-calendar-picker-indicator {
            display: none !important;
          }
          input[list]::-webkit-credentials-auto-fill-button {
            display: none !important;
          }
          input[list] {
            -webkit-appearance: none !important;
            appearance: none !important;
          }
        `}</style>
        <input
          id={id}
          type="text"
          value={value}
          list={datalistId}
          placeholder={loadingOptions ? 'Cargando...' : (placeholder ?? 'Escriba o seleccione...')}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          style={inputStyle}
          autoComplete="off"
          aria-invalid={error}
        />

        {datalistId && (
          <datalist id={datalistId}>
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                label={opt.label ? `${opt.value} - ${opt.label}` : opt.value}
              />
            ))}
          </datalist>
        )}

        {/* Ícono chevron */}
        <div
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            pointerEvents: 'none',
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
      </div>

      {error && errorMessage && (
        <div
          style={{
            fontSize: uiKitSizes.typography.fontSize.xs,
            color: uiKitColors.states.error,
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};
