import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: nominaresumenGralxRubro.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class NominaresumengralxrubroNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Nominaresumengralxrubro no encontrado con id: ${id}`,
      'CONSULTAS_NOT_FOUND',
      404
    );
    this.name = 'NominaresumengralxrubroNotFoundError';
  }
}

export class NominaresumengralxrubroValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'CONSULTAS_VALIDATION',
      422
    );
    this.name = 'NominaresumengralxrubroValidationError';
  }
}

export class NominaresumengralxrubroDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Nominaresumengralxrubro con ${field}: ${value}`,
      'CONSULTAS_DUPLICATE',
      409
    );
    this.name = 'NominaresumengralxrubroDuplicateError';
  }
}

export class NominaresumengralxrubroBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'CONSULTAS_BUSINESS_RULE',
      422
    );
    this.name = 'NominaresumengralxrubroBusinessRuleError';
  }
}
