import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: contratoPlantilla.zul / contratoPlantillaDialog.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class ContratoplantillaContratoplantilladialogNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `ContratoplantillaContratoplantilladialog no encontrado con id: ${id}`,
      'SETUP_NOT_FOUND',
      404
    );
    this.name = 'ContratoplantillaContratoplantilladialogNotFoundError';
  }
}

export class ContratoplantillaContratoplantilladialogValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'SETUP_VALIDATION',
      422
    );
    this.name = 'ContratoplantillaContratoplantilladialogValidationError';
  }
}

export class ContratoplantillaContratoplantilladialogDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un ContratoplantillaContratoplantilladialog con ${field}: ${value}`,
      'SETUP_DUPLICATE',
      409
    );
    this.name = 'ContratoplantillaContratoplantilladialogDuplicateError';
  }
}

export class ContratoplantillaContratoplantilladialogBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'SETUP_BUSINESS_RULE',
      422
    );
    this.name = 'ContratoplantillaContratoplantilladialogBusinessRuleError';
  }
}
