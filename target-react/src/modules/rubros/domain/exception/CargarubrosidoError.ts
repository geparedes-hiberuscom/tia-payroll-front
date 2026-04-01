import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: cargaRubrosIDO.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class CargarubrosidoNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Cargarubrosido no encontrado con id: ${id}`,
      'RUBROS_NOT_FOUND',
      404
    );
    this.name = 'CargarubrosidoNotFoundError';
  }
}

export class CargarubrosidoValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'RUBROS_VALIDATION',
      422
    );
    this.name = 'CargarubrosidoValidationError';
  }
}

export class CargarubrosidoDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Cargarubrosido con ${field}: ${value}`,
      'RUBROS_DUPLICATE',
      409
    );
    this.name = 'CargarubrosidoDuplicateError';
  }
}

export class CargarubrosidoBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'RUBROS_BUSINESS_RULE',
      422
    );
    this.name = 'CargarubrosidoBusinessRuleError';
  }
}
