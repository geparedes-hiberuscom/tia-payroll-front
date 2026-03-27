import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: conSueldo.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class ConsueldoNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Consueldo no encontrado con id: ${id}`,
      'CONSULTAS_NOT_FOUND',
      404
    );
    this.name = 'ConsueldoNotFoundError';
  }
}

export class ConsueldoValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'CONSULTAS_VALIDATION',
      422
    );
    this.name = 'ConsueldoValidationError';
  }
}

export class ConsueldoDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Consueldo con ${field}: ${value}`,
      'CONSULTAS_DUPLICATE',
      409
    );
    this.name = 'ConsueldoDuplicateError';
  }
}

export class ConsueldoBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'CONSULTAS_BUSINESS_RULE',
      422
    );
    this.name = 'ConsueldoBusinessRuleError';
  }
}
