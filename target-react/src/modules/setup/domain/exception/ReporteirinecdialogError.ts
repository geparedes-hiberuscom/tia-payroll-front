import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: ReporteIRINECDialog.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class ReporteirinecdialogNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `Reporteirinecdialog no encontrado con id: ${id}`,
      'SETUP_NOT_FOUND',
      404
    );
    this.name = 'ReporteirinecdialogNotFoundError';
  }
}

export class ReporteirinecdialogValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'SETUP_VALIDATION',
      422
    );
    this.name = 'ReporteirinecdialogValidationError';
  }
}

export class ReporteirinecdialogDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un Reporteirinecdialog con ${field}: ${value}`,
      'SETUP_DUPLICATE',
      409
    );
    this.name = 'ReporteirinecdialogDuplicateError';
  }
}

export class ReporteirinecdialogBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'SETUP_BUSINESS_RULE',
      422
    );
    this.name = 'ReporteirinecdialogBusinessRuleError';
  }
}
