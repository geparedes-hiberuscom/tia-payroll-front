import { AppError } from '@shared/domain/exception/AppError';

/**
 * Excepciones de dominio: plantillaContable.zul / plantillaContableDialog.zul
 * Errores de negocio específicos de esta funcionalidad.
 */

export class PlantillacontablePlantillacontabledialogNotFoundError extends AppError {
  constructor(id: string) {
    super(
      `PlantillacontablePlantillacontabledialog no encontrado con id: ${id}`,
      'SETUP_NOT_FOUND',
      404
    );
    this.name = 'PlantillacontablePlantillacontabledialogNotFoundError';
  }
}

export class PlantillacontablePlantillacontabledialogValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      field ? `Error de validación en ${field}: ${message}` : message,
      'SETUP_VALIDATION',
      422
    );
    this.name = 'PlantillacontablePlantillacontabledialogValidationError';
  }
}

export class PlantillacontablePlantillacontabledialogDuplicateError extends AppError {
  constructor(field: string, value: string) {
    super(
      `Ya existe un PlantillacontablePlantillacontabledialog con ${field}: ${value}`,
      'SETUP_DUPLICATE',
      409
    );
    this.name = 'PlantillacontablePlantillacontabledialogDuplicateError';
  }
}

export class PlantillacontablePlantillacontabledialogBusinessRuleError extends AppError {
  constructor(rule: string, detail?: string) {
    super(
      `Regla de negocio violada [${rule}]${detail ? ': ' + detail : ''}`,
      'SETUP_BUSINESS_RULE',
      422
    );
    this.name = 'PlantillacontablePlantillacontabledialogBusinessRuleError';
  }
}
