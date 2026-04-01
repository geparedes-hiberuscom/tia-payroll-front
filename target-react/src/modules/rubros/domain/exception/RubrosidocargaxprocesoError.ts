import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: rubrosIDOcargaxProceso.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class RubrosidocargaxprocesoNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Rubrosidocargaxproceso no encontrado con id: ${id}`,
      'RUBROS_NOT_FOUND',
      404
    );
    this.name = 'RubrosidocargaxprocesoNotFoundError';
  }
}

export class RubrosidocargaxprocesoValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'RUBROS_VALIDATION',
      422
    );
    this.name = 'RubrosidocargaxprocesoValidationError';
  }
}

export class RubrosidocargaxprocesoDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Rubrosidocargaxproceso con ${field}: ${value}`,
      'RUBROS_DUPLICATE',
      409
    );
    this.name = 'RubrosidocargaxprocesoDuplicateError';
  }
}

export class RubrosidocargaxprocesoBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'RUBROS_BUSINESS_RULE',
      422
    );
    this.name = 'RubrosidocargaxprocesoBusinessRuleError';
  }
}
