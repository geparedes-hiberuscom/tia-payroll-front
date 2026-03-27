import { AppError } from '@shared/domain/exception/AppError';

export class RubrosNotFoundError extends AppError {
  constructor(id: string) {
    super(`Rubros no encontrado con id: ${id}`, 'RUBROS_NOT_FOUND', 404);
  }
}

export class RubrosValidationError extends AppError {
  constructor(message: string) {
    super(message, 'RUBROS_VALIDATION', 422);
  }
}
