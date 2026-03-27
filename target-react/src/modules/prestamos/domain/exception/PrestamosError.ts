import { AppError } from '@shared/domain/exception/AppError';

export class PrestamosNotFoundError extends AppError {
  constructor(id: string) {
    super(`Prestamos no encontrado con id: ${id}`, 'PRESTAMOS_NOT_FOUND', 404);
  }
}

export class PrestamosValidationError extends AppError {
  constructor(message: string) {
    super(message, 'PRESTAMOS_VALIDATION', 422);
  }
}
