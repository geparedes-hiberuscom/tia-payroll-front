import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: nominaresumenGeneral.zul / ResumenGralNominaDialog.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class NominaresumengeneralResumengralnominadialogNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `NominaresumengeneralResumengralnominadialog no encontrado con id: ${id}`,
      'CONSULTAS_NOT_FOUND',
      404
    );
    this.name = 'NominaresumengeneralResumengralnominadialogNotFoundError';
  }
}

export class NominaresumengeneralResumengralnominadialogValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'CONSULTAS_VALIDATION',
      422
    );
    this.name = 'NominaresumengeneralResumengralnominadialogValidationError';
  }
}

export class NominaresumengeneralResumengralnominadialogDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un NominaresumengeneralResumengralnominadialog con ${field}: ${value}`,
      'CONSULTAS_DUPLICATE',
      409
    );
    this.name = 'NominaresumengeneralResumengralnominadialogDuplicateError';
  }
}

export class NominaresumengeneralResumengralnominadialogBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'CONSULTAS_BUSINESS_RULE',
      422
    );
    this.name = 'NominaresumengeneralResumengralnominadialogBusinessRuleError';
  }
}
