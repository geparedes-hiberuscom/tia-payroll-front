import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: rubroplantillaContableDialog.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class RubroplantillacontabledialogNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Rubroplantillacontabledialog no encontrado con id: ${id}`,
      'SETUP_NOT_FOUND',
      404
    );
    this.name = 'RubroplantillacontabledialogNotFoundError';
  }
}

export class RubroplantillacontabledialogValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'SETUP_VALIDATION',
      422
    );
    this.name = 'RubroplantillacontabledialogValidationError';
  }
}

export class RubroplantillacontabledialogDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Rubroplantillacontabledialog con ${field}: ${value}`,
      'SETUP_DUPLICATE',
      409
    );
    this.name = 'RubroplantillacontabledialogDuplicateError';
  }
}

export class RubroplantillacontabledialogBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'SETUP_BUSINESS_RULE',
      422
    );
    this.name = 'RubroplantillacontabledialogBusinessRuleError';
  }
}
