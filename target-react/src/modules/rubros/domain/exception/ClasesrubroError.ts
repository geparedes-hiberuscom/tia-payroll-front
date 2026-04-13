import { AppError } from '@shared/domain/exception/AppError';

export class ClasesrubroNotFoundError extends AppError {
  constructor(id: string) {
    super(`Clase de rubro no encontrada con id: ${id}`, 'CLASE_RUBRO_NOT_FOUND', 404);
    this.name = 'ClasesrubroNotFoundError';
  }
}

export class ClasesrubroValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(field ? `Error de validacion en ${field}: ${message}` : message, 'CLASE_RUBRO_VALIDATION', 422);
    this.name = 'ClasesrubroValidationError';
  }
}
