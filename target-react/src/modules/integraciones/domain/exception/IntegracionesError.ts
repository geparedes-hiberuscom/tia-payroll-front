import { AppError } from '@shared/domain/exception/AppError';

export class IntegracionesNotFoundError extends AppError {
  constructor(id: string) {
    super(`Integraciones no encontrado con id: ${id}`, 'INTEGRACIONES_NOT_FOUND', 404);
  }
}

export class IntegracionesValidationError extends AppError {
  constructor(message: string) {
    super(message, 'INTEGRACIONES_VALIDATION', 422);
  }
}
