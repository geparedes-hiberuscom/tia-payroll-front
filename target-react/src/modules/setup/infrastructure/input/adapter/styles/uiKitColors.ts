/**
 * UI Kit - Colores
 * Paleta de colores extraída del Figma UIKIT
 * Todos los colores están definidos aquí para consistencia
 */

export const uiKitColors = {
  // ─── PRIMARY (Azul Brillante) ───
  primary: {
    normal: '#155DFC',
    hover: '#1447E6',
    active: '#193CB8',
    disabled: '#155DFC80', // Con 50% de opacidad para disabled
    withIcon: '#155DFC',
  },

  // ─── SECONDARY (Gris) ───
  secondary: {
    normal: '#E5E7EB',
    hover: '#D1D5DC',
    active: '#99A1AF',
    disabled: '#E5E7EB80',
  },

  // ─── OUTLINE ───
  outline: {
    border: '#155DFC',
    normal: '#155DFC',
    hover: '#155DFC',
    active: '#155DFC',
    disabled: '#155DFC80',
  },

  // ─── GHOST ───
  ghost: {
    hover: '#F3F4F6',
    active: '#E5E7EB',
  },

  // ─── GRISES/NEUTRALS ───
  neutral: {
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DC',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },

  // ─── ESTADOS (Success, Warning, Error, Info) ───
  states: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // ─── BORDES Y FONDOS ───
  borders: {
    light: '#E5E7EB',
    normal: '#D1D5DC',
    dark: '#9CA3AF',
  },

  backgrounds: {
    light: '#F9FAFB',
    normal: '#F3F4F6',
    dark: '#E5E7EB',
  },
};

export type UIKitColors = typeof uiKitColors;
