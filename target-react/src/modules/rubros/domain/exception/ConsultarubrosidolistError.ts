import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: consultaRubrosIdoList.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class ConsultarubrosidolistNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Consultarubrosidolist no encontrado con id: ${id}`,
      'RUBROS_NOT_FOUND',
      404
    );
    this.name = 'ConsultarubrosidolistNotFoundError';
  }
}

export class ConsultarubrosidolistValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'RUBROS_VALIDATION',
      422
    );
    this.name = 'ConsultarubrosidolistValidationError';
  }
}

export class ConsultarubrosidolistDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Consultarubrosidolist con ${field}: ${value}`,
      'RUBROS_DUPLICATE',
      409
    );
    this.name = 'ConsultarubrosidolistDuplicateError';
  }
}

export class ConsultarubrosidolistBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'RUBROS_BUSINESS_RULE',
      422
    );
    this.name = 'ConsultarubrosidolistBusinessRuleError';
  }
}
