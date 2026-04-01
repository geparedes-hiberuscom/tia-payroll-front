/**
 * Utilidades de validación de formularios.
 * Patrones comunes reutilizables para todos los componentes Form.
 */

// ─── Types ───

export interface ValidationRule {
  validate: (value: unknown) => boolean;
  message: string;
}

export interface FieldValidation {
  [fieldName: string]: ValidationRule[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

// ─── Core Validation Functions ───

/**
 * Ejecuta todas las reglas de validación para un conjunto de campos.
 */
export function validateForm<T extends Record<string, unknown>>(
  data: T,
  rules: FieldValidation
): ValidationResult {
  const errors: Record<string, string[]> = {};
  let isValid = true;

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field];
    const fieldErrors: string[] = [];

    for (const rule of fieldRules) {
      if (!rule.validate(value)) {
        fieldErrors.push(rule.message);
        isValid = false;
      }
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  }

  return { isValid, errors };
}

/**
 * Hook helper: retorna el primer error de un campo (o undefined).
 */
export function getFieldError(errors: Record<string, string[]>, field: string): string | undefined {
  return errors[field]?.[0];
}

/**
 * Retorna true si el campo tiene errores.
 */
export function hasFieldError(errors: Record<string, string[]>, field: string): boolean {
  return (errors[field]?.length ?? 0) > 0;
}

// ─── Validation Rules ───

export const required = (message = 'Este campo es obligatorio'): ValidationRule => ({
  validate: (value) => {
    if (value === null || value === undefined) { return false; }
    if (typeof value === 'string') { return value.trim().length > 0; }
    if (Array.isArray(value)) { return value.length > 0; }
    return true;
  },
  message,
});

export const minLength = (min: number, message?: string): ValidationRule => ({
  validate: (value) => typeof value === 'string' && value.trim().length >= min,
  message: message || `Mínimo ${min} caracteres`,
});

export const maxLength = (max: number, message?: string): ValidationRule => ({
  validate: (value) => typeof value === 'string' && value.trim().length <= max,
  message: message || `Máximo ${max} caracteres`,
});

export const minValue = (min: number, message?: string): ValidationRule => ({
  validate: (value) => typeof value === 'number' && value >= min,
  message: message || `El valor mínimo es ${min}`,
});

export const maxValue = (max: number, message?: string): ValidationRule => ({
  validate: (value) => typeof value === 'number' && value <= max,
  message: message || `El valor máximo es ${max}`,
});

export const pattern = (regex: RegExp, message = 'Formato inválido'): ValidationRule => ({
  validate: (value) => typeof value === 'string' && regex.test(value),
  message,
});

export const email = (message = 'Email inválido'): ValidationRule => ({
  validate: (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message,
});

export const numeric = (message = 'Solo se permiten números'): ValidationRule => ({
  validate: (value) => {
    if (typeof value === 'number') { return !isNaN(value); }
    if (typeof value === 'string') { return /^\d+$/.test(value.trim()); }
    return false;
  },
  message,
});

export const decimal = (message = 'Número decimal inválido'): ValidationRule => ({
  validate: (value) => {
    if (typeof value === 'number') { return !isNaN(value); }
    if (typeof value === 'string') { return /^\d+(\.\d+)?$/.test(value.trim()); }
    return false;
  },
  message,
});

export const dateFormat = (message = 'Fecha inválida (YYYY-MM-DD)'): ValidationRule => ({
  validate: (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value),
  message,
});

export const matchField = (fieldName: string, getValue: () => unknown, message?: string): ValidationRule => ({
  validate: (value) => value === getValue(),
  message: message || `Debe coincidir con ${fieldName}`,
});

export const oneOf = (options: unknown[], message?: string): ValidationRule => ({
  validate: (value) => options.includes(value),
  message: message || `Debe ser uno de: ${options.join(', ')}`,
});
