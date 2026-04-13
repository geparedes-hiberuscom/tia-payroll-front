import React from 'react';
import { uiKitColors } from '../../styles/uiKitColors';
import { uiKitSizes } from '../../styles/uiKitSizes';

interface UICardProps {
  /**
   * Contenido de la tarjeta
   */
  children: React.ReactNode;

  /**
   * Título de la tarjeta (opcional)
   */
  title?: string;

  /**
   * Descripción de la tarjeta (opcional)
   */
  description?: string;

  /**
   * Footer (opcional)
   */
  footer?: React.ReactNode;

  /**
   * Mostrar borde
   * @default true
   */
  bordered?: boolean;

  /**
   * Mostrar sombra
   * @default true
   */
  shadowed?: boolean;

  /**
   * Nivel de sombra
   * @default 'md'
   */
  shadowLevel?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Padding
   * @default 'md'
   */
  padding?: 'sm' | 'md' | 'lg';

  /**
   * Hover effect
   * @default false
   */
  hoverable?: boolean;

  /**
   * Clase CSS adicional
   */
  className?: string;

  /**
   * Estilos adicionales
   */
  style?: React.CSSProperties;

  /**
   * Callback al hacer click (si hoverable)
   */
  onClick?: () => void;
}

/**
 * Componente UICard reutilizable
 * Tarjeta profesional con opciones de borde, sombra y hover
 */
export const UICard: React.FC<UICardProps> = ({
  children,
  title,
  description,
  footer,
  bordered = true,
  shadowed = true,
  shadowLevel = 'md',
  padding = 'md',
  hoverable = false,
  className,
  style,
  onClick,
}) => {
  const paddingValues = {
    sm: '12px',
    md: '16px',
    lg: '24px',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: uiKitColors.neutral.white,
    borderRadius: '12px',
    border: bordered ? `1px solid ${uiKitColors.borders.light}` : 'none',
    boxShadow: shadowed ? uiKitSizes.shadow[shadowLevel] : 'none',
    overflow: 'hidden',
    transition: uiKitSizes.transition.normal,
    cursor: hoverable ? 'pointer' : 'default',
    ...style,
  };

  const headerStyle: React.CSSProperties = {
    padding: paddingValues[padding],
    borderBottom: `1px solid ${uiKitColors.borders.light}`,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: uiKitSizes.typography.fontSize.lg,
    fontWeight: uiKitSizes.typography.fontWeight.semibold,
    color: uiKitColors.neutral.gray900,
    margin: 0,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: uiKitSizes.typography.fontSize.sm,
    color: uiKitColors.neutral.gray600,
    marginTop: '4px',
    margin: 0,
  };

  const contentStyle: React.CSSProperties = {
    padding: paddingValues[padding],
  };

  const footerStyle: React.CSSProperties = {
    padding: paddingValues[padding],
    borderTop: `1px solid ${uiKitColors.borders.light}`,
    backgroundColor: uiKitColors.backgrounds.light,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (hoverable) {
      const target = e.currentTarget as HTMLDivElement | HTMLButtonElement;
      target.style.boxShadow = uiKitSizes.shadow.lg;
      target.style.transform = 'translateY(-2px)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (hoverable) {
      const target = e.currentTarget as HTMLDivElement | HTMLButtonElement;
      target.style.boxShadow = shadowed ? uiKitSizes.shadow[shadowLevel] : 'none';
      target.style.transform = 'translateY(0)';
    }
  };

  const cardContent = (
    <>
      {(title || description) && (
        <div style={headerStyle}>
          {title && <h3 style={titleStyle}>{title}</h3>}
          {description && <p style={descriptionStyle}>{description}</p>}
        </div>
      )}

      <div style={contentStyle}>{children}</div>

      {footer && <div style={footerStyle}>{footer}</div>}
    </>
  );

  // Interactive card with hover effect (uses button element)
  if (hoverable && onClick) {
    return (
      <button
        type="button"
        style={cardStyle}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
        onClick={onClick}
      >
        {cardContent}
      </button>
    );
  }

  // Static card without interaction
  return (
    <div
      style={cardStyle}
      className={className}
    >
      {cardContent}
    </div>
  );
};
