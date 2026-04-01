import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: rubros.zul / rubrosDialog.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class RubrosRubrosdialogNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `RubrosRubrosdialog no encontrado con id: ${id}`,
      'RUBROS_NOT_FOUND',
      404
    );
    this.name = 'RubrosRubrosdialogNotFoundError';
  }
}

export class RubrosRubrosdialogValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'RUBROS_VALIDATION',
      422
    );
    this.name = 'RubrosRubrosdialogValidationError';
  }
}

export class RubrosRubrosdialogDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un RubrosRubrosdialog con ${field}: ${value}`,
      'RUBROS_DUPLICATE',
      409
    );
    this.name = 'RubrosRubrosdialogDuplicateError';
  }
}

export class RubrosRubrosdialogBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'RUBROS_BUSINESS_RULE',
      422
    );
    this.name = 'RubrosRubrosdialogBusinessRuleError';
  }
}
