import { useState, useCallback } from 'react';
import { validateForm, FieldValidation, ValidationResult, getFieldError, hasFieldError } from '../validation/formValidation';

/**
 * Hook para validación de formularios.
 * Mantiene el estado de errores y provee funciones de validación.
 *
 * Uso:
 * ```tsx
 * const { errors, validate, getError, hasError, clearErrors } = useFormValidation();
 *
 * const handleSubmit = () => {
 *   const result = validate(formData, {
 *     nombre: [required(), minLength(3)],
 *     email: [required(), email()],
 *   });
 *   if (result.isValid) { ... }
 * };
 *
 * <input className={hasError('nombre') ? 'error' : ''} />
 * {getError('nombre') && <span className="field-error">{getError('nombre')}</span>}
 * ```
 */
export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const validate = useCallback(<T extends Record<string, unknown>>(
    data: T,
    rules: FieldValidation
  ): ValidationResult => {
    const result = validateForm(data, rules);
    setErrors(result.errors);
    return result;
  }, []);

  const validateField = useCallback(<T extends Record<string, unknown>>(
    fieldName: string,
    data: T,
    rules: FieldValidation
  ): boolean => {
    const fieldRules = rules[fieldName];
    if (!fieldRules) { return true; }

    const result = validateForm({ [fieldName]: data[fieldName] } as T, { [fieldName]: fieldRules });
    setErrors(prev => {
      const next = { ...prev };
      if (result.errors[fieldName]) {
        next[fieldName] = result.errors[fieldName];
      } else {
        delete next[fieldName];
      }
      return next;
    });

    return result.isValid;
  }, []);

  const getError = useCallback((field: string): string | undefined => {
    return getFieldError(errors, field);
  }, [errors]);

  const hasError = useCallback((field: string): boolean => {
    return hasFieldError(errors, field);
  }, [errors]);

  const clearErrors = useCallback(() => setErrors({}), []);

  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  return {
    errors,
    validate,
    validateField,
    getError,
    hasError,
    clearErrors,
    clearFieldError,
    isValid: Object.keys(errors).length === 0,
  };
}
