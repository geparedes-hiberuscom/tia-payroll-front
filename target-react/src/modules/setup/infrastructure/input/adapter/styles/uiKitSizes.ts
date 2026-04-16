/**
 * UI Kit - Tamaños y Espaciado
 * Dimensiones extraídas del Figma UIKIT
 */

export const uiKitSizes = {
  // ─── BOTONES ───
  button: {
    small: {
      width: 102.92,
      height: 32,
      padding: '6px 12px',
      fontSize: '12px',
      borderRadius: 10,
    },
    medium: {
      width: 139.57,
      height: 44,
      padding: '10px 16px',
      fontSize: '14px',
      borderRadius: 10,
    },
    large: {
      width: 147.82,
      height: 56,
      padding: '14px 24px',
      fontSize: '16px',
      borderRadius: 10,
    },
  },

  // ─── ESPACIADO (Margin/Padding) ───
  spacing: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    '3xl': '32px',
  },

  // ─── BORDES ───
  border: {
    thin: '1px',
    normal: '2px',
    thick: '3px',
    radius: {
      sm: '4px',
      md: '8px',
      lg: '10px',
      xl: '12px',
      full: '9999px',
    },
  },

  // ─── INPUTS ───
  input: {
    small: {
      height: '32px',
      padding: '6px 12px',
      fontSize: '12px',
      borderRadius: 8,
    },
    medium: {
      height: '44px',
      padding: '10px 16px',
      fontSize: '14px',
      borderRadius: 8,
    },
    large: {
      height: '56px',
      padding: '14px 24px',
      fontSize: '16px',
      borderRadius: 8,
    },
  },

  // ─── SOMBRAS ───
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  // ─── TIPOGRAFÍA ───
  typography: {
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '24px',
      '3xl': '32px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // ─── TRANSICIONES ───
  transition: {
    fast: '200ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
};

export type UIKitSizes = typeof uiKitSizes;
