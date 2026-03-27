import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: comparativoNominas.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class ComparativonominasNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Comparativonominas no encontrado con id: ${id}`,
      'CONSULTAS_NOT_FOUND',
      404
    );
    this.name = 'ComparativonominasNotFoundError';
  }
}

export class ComparativonominasValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'CONSULTAS_VALIDATION',
      422
    );
    this.name = 'ComparativonominasValidationError';
  }
}

export class ComparativonominasDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Comparativonominas con ${field}: ${value}`,
      'CONSULTAS_DUPLICATE',
      409
    );
    this.name = 'ComparativonominasDuplicateError';
  }
}

export class ComparativonominasBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'CONSULTAS_BUSINESS_RULE',
      422
    );
    this.name = 'ComparativonominasBusinessRuleError';
  }
}
