import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: rubrosxprocesoDialog.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class RubrosxprocesodialogNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Rubrosxprocesodialog no encontrado con id: ${id}`,
      'RUBROS_NOT_FOUND',
      404
    );
    this.name = 'RubrosxprocesodialogNotFoundError';
  }
}

export class RubrosxprocesodialogValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'RUBROS_VALIDATION',
      422
    );
    this.name = 'RubrosxprocesodialogValidationError';
  }
}

export class RubrosxprocesodialogDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Rubrosxprocesodialog con ${field}: ${value}`,
      'RUBROS_DUPLICATE',
      409
    );
    this.name = 'RubrosxprocesodialogDuplicateError';
  }
}

export class RubrosxprocesodialogBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'RUBROS_BUSINESS_RULE',
      422
    );
    this.name = 'RubrosxprocesodialogBusinessRuleError';
  }
}
