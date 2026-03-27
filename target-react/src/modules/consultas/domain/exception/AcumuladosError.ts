import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: acumulados.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class AcumuladosNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Acumulados no encontrado con id: ${id}`,
      'CONSULTAS_NOT_FOUND',
      404
    );
    this.name = 'AcumuladosNotFoundError';
  }
}

export class AcumuladosValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'CONSULTAS_VALIDATION',
      422
    );
    this.name = 'AcumuladosValidationError';
  }
}

export class AcumuladosDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Acumulados con ${field}: ${value}`,
      'CONSULTAS_DUPLICATE',
      409
    );
    this.name = 'AcumuladosDuplicateError';
  }
}

export class AcumuladosBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'CONSULTAS_BUSINESS_RULE',
      422
    );
    this.name = 'AcumuladosBusinessRuleError';
  }
}
