import React from 'react';
import { uiKitColors } from '../../styles/uiKitColors';
import { uiKitSizes } from '../../styles/uiKitSizes';

interface UIButtonProps {
  /**
   * Variante del botón
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';

  /**
   * Tamaño del botón
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Texto o contenido del botón
   */
  children: React.ReactNode;

  /**
   * Deshabilitado
   * @default false
   */
  disabled?: boolean;

  /**
   * Tipo de botón HTML
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Callback al hacer click
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Clase CSS adicional
   */
  className?: string;

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
   * Estilos adicionales
   */
  style?: React.CSSProperties;
}

/**
 * Componente UIButton reutilizable
 * Soporta 4 variantes: primary, secondary, outline, ghost
 * Soporta 3 tamaños: small, medium, large
 * Completamente accesible y responsive
 */
export const UIButton: React.FC<UIButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  disabled = false,
  type = 'button',
  onClick,
  className,
  iconLeft,
  iconRight,
  fullWidth = false,
  style,
}) => {
  const sizeConfig = uiKitSizes.button[size];

  // Obtener colores según variante
  const getPrimaryColors = () => ({
    bg: disabled ? uiKitColors.primary.disabled : uiKitColors.primary.normal,
    bgHover: uiKitColors.primary.hover,
    bgActive: uiKitColors.primary.active,
    color: '#FFFFFF',
  });

  const getSecondaryColors = () => ({
    bg: disabled ? uiKitColors.secondary.disabled : uiKitColors.secondary.normal,
    bgHover: uiKitColors.secondary.hover,
    bgActive: uiKitColors.secondary.active,
    color: '#1F2937',
  });

  const getOutlineColors = () => ({
    bg: 'transparent',
    bgHover: uiKitColors.ghost.hover,
    bgActive: uiKitColors.ghost.active,
    color: uiKitColors.outline.border,
  });

  const getGhostColors = () => ({
    bg: 'transparent',
    bgHover: uiKitColors.ghost.hover,
    bgActive: uiKitColors.ghost.active,
    color: disabled ? uiKitColors.secondary.disabled : '#1F2937',
  });

  // Obtener configuración de colores según variante
  const getColorConfig = () => {
    switch (variant) {
      case 'primary':
        return getPrimaryColors();
      case 'secondary':
        return getSecondaryColors();
      case 'outline':
        return getOutlineColors();
      default:
        return getGhostColors();
    }
  };

  const colorConfig = getColorConfig();

  // Construir estilos base
  const getBaseStyle = (): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    font: `${uiKitSizes.typography.fontWeight.medium} ${sizeConfig.fontSize} system-ui`,
    border: 'none',
    borderRadius: `${sizeConfig.borderRadius}px`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: uiKitSizes.transition.normal,
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    padding: sizeConfig.padding,
    ...style,
  });

  const getPrimaryStyle = (): React.CSSProperties => {
    const colors = getPrimaryColors();
    return {
      ...getBaseStyle(),
      backgroundColor: colors.bg,
      color: colors.color,
    };
  };

  const getSecondaryStyle = (): React.CSSProperties => {
    const colors = getSecondaryColors();
    return {
      ...getBaseStyle(),
      backgroundColor: colors.bg,
      color: colors.color,
    };
  };

  const getOutlineStyle = (): React.CSSProperties => {
    const colors = getOutlineColors();
    return {
      ...getBaseStyle(),
      backgroundColor: colors.bg,
      color: colors.color,
      border: `2px solid ${disabled ? uiKitColors.outline.disabled : uiKitColors.outline.border}`,
      borderTop: `2px solid ${disabled ? uiKitColors.outline.disabled : uiKitColors.outline.border}`,
    };
  };

  const getGhostStyle = (): React.CSSProperties => {
    const colors = getGhostColors();
    return {
      ...getBaseStyle(),
      backgroundColor: colors.bg,
      color: colors.color,
    };
  };

  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return getPrimaryStyle();
      case 'secondary':
        return getSecondaryStyle();
      case 'outline':
        return getOutlineStyle();
      case 'ghost':
        return getGhostStyle();
      default:
        return getBaseStyle();
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.currentTarget.style.backgroundColor = colorConfig.bgHover;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'outline' || variant === 'ghost') {
      e.currentTarget.style.backgroundColor = 'transparent';
    } else {
      e.currentTarget.style.backgroundColor = colorConfig.bg;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.currentTarget.style.backgroundColor = colorConfig.bgActive;
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      style={getVariantStyle()}
    >
      {iconLeft && <span>{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span>{iconRight}</span>}
    </button>
  );
};
