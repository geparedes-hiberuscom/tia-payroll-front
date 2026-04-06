import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: parametros.zul / parametrosDialog.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class ParametrosParametrosdialogNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `ParametrosParametrosdialog no encontrado con id: ${id}`,
      'SETUP_NOT_FOUND',
      404
    );
    this.name = 'ParametrosParametrosdialogNotFoundError';
  }
}

export class ParametrosParametrosdialogValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'SETUP_VALIDATION',
      422
    );
    this.name = 'ParametrosParametrosdialogValidationError';
  }
}

export class ParametrosParametrosdialogDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un ParametrosParametrosdialog con ${field}: ${value}`,
      'SETUP_DUPLICATE',
      409
    );
    this.name = 'ParametrosParametrosdialogDuplicateError';
  }
}

export class ParametrosParametrosdialogBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'SETUP_BUSINESS_RULE',
      422
    );
    this.name = 'ParametrosParametrosdialogBusinessRuleError';
  }
}
