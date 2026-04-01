import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: rubrosIDOMain.zul / rubrosIDOList.zul / rubrosIDODetail.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class RubrosidomainRubrosidolistRubrosidodetailNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `RubrosidomainRubrosidolistRubrosidodetail no encontrado con id: ${id}`,
      'RUBROS_NOT_FOUND',
      404
    );
    this.name = 'RubrosidomainRubrosidolistRubrosidodetailNotFoundError';
  }
}

export class RubrosidomainRubrosidolistRubrosidodetailValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'RUBROS_VALIDATION',
      422
    );
    this.name = 'RubrosidomainRubrosidolistRubrosidodetailValidationError';
  }
}

export class RubrosidomainRubrosidolistRubrosidodetailDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un RubrosidomainRubrosidolistRubrosidodetail con ${field}: ${value}`,
      'RUBROS_DUPLICATE',
      409
    );
    this.name = 'RubrosidomainRubrosidolistRubrosidodetailDuplicateError';
  }
}

export class RubrosidomainRubrosidolistRubrosidodetailBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'RUBROS_BUSINESS_RULE',
      422
    );
    this.name = 'RubrosidomainRubrosidolistRubrosidodetailBusinessRuleError';
  }
}
