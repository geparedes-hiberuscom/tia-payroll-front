import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: nominaresumenGralCxRubro.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class NominaresumengralcxrubroNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Nominaresumengralcxrubro no encontrado con id: ${id}`,
      'CONSULTAS_NOT_FOUND',
      404
    );
    this.name = 'NominaresumengralcxrubroNotFoundError';
  }
}

export class NominaresumengralcxrubroValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'CONSULTAS_VALIDATION',
      422
    );
    this.name = 'NominaresumengralcxrubroValidationError';
  }
}

export class NominaresumengralcxrubroDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Nominaresumengralcxrubro con ${field}: ${value}`,
      'CONSULTAS_DUPLICATE',
      409
    );
    this.name = 'NominaresumengralcxrubroDuplicateError';
  }
}

export class NominaresumengralcxrubroBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'CONSULTAS_BUSINESS_RULE',
      422
    );
    this.name = 'NominaresumengralcxrubroBusinessRuleError';
  }
}
