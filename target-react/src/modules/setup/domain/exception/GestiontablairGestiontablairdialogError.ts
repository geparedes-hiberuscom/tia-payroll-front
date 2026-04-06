import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: gestionTablaIR.zul / gestionTablaIRDialog.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class GestiontablairGestiontablairdialogNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `GestiontablairGestiontablairdialog no encontrado con id: ${id}`,
      'SETUP_NOT_FOUND',
      404
    );
    this.name = 'GestiontablairGestiontablairdialogNotFoundError';
  }
}

export class GestiontablairGestiontablairdialogValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'SETUP_VALIDATION',
      422
    );
    this.name = 'GestiontablairGestiontablairdialogValidationError';
  }
}

export class GestiontablairGestiontablairdialogDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un GestiontablairGestiontablairdialog con ${field}: ${value}`,
      'SETUP_DUPLICATE',
      409
    );
    this.name = 'GestiontablairGestiontablairdialogDuplicateError';
  }
}

export class GestiontablairGestiontablairdialogBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'SETUP_BUSINESS_RULE',
      422
    );
    this.name = 'GestiontablairGestiontablairdialogBusinessRuleError';
  }
}
