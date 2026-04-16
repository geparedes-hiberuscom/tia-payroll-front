import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: genIngProyectados.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class GeningproyectadosNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Geningproyectados no encontrado con id: ${id}`,
      'SETUP_NOT_FOUND',
      404
    );
    this.name = 'GeningproyectadosNotFoundError';
  }
}

export class GeningproyectadosValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'SETUP_VALIDATION',
      422
    );
    this.name = 'GeningproyectadosValidationError';
  }
}

export class GeningproyectadosDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Geningproyectados con ${field}: ${value}`,
      'SETUP_DUPLICATE',
      409
    );
    this.name = 'GeningproyectadosDuplicateError';
  }
}

export class GeningproyectadosBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'SETUP_BUSINESS_RULE',
      422
    );
    this.name = 'GeningproyectadosBusinessRuleError';
  }
}
