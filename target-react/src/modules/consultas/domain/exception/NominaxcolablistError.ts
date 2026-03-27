import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: nominaxColabList.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class NominaxcolablistNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Nominaxcolablist no encontrado con id: ${id}`,
      'CONSULTAS_NOT_FOUND',
      404
    );
    this.name = 'NominaxcolablistNotFoundError';
  }
}

export class NominaxcolablistValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'CONSULTAS_VALIDATION',
      422
    );
    this.name = 'NominaxcolablistValidationError';
  }
}

export class NominaxcolablistDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Nominaxcolablist con ${field}: ${value}`,
      'CONSULTAS_DUPLICATE',
      409
    );
    this.name = 'NominaxcolablistDuplicateError';
  }
}

export class NominaxcolablistBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'CONSULTAS_BUSINESS_RULE',
      422
    );
    this.name = 'NominaxcolablistBusinessRuleError';
  }
}
