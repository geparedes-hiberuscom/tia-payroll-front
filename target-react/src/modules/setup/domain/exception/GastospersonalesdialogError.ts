import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: GastosPersonalesDialog.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class GastospersonalesdialogNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Gastospersonalesdialog no encontrado con id: ${id}`,
      'SETUP_NOT_FOUND',
      404
    );
    this.name = 'GastospersonalesdialogNotFoundError';
  }
}

export class GastospersonalesdialogValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'SETUP_VALIDATION',
      422
    );
    this.name = 'GastospersonalesdialogValidationError';
  }
}

export class GastospersonalesdialogDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Gastospersonalesdialog con ${field}: ${value}`,
      'SETUP_DUPLICATE',
      409
    );
    this.name = 'GastospersonalesdialogDuplicateError';
  }
}

export class GastospersonalesdialogBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'SETUP_BUSINESS_RULE',
      422
    );
    this.name = 'GastospersonalesdialogBusinessRuleError';
  }
}
