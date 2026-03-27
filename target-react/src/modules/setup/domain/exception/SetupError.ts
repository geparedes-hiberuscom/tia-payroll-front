import { AppError } from '@shared/domain/exception/AppError';

export class SetupNotFoundError extends AppError {
  constructor(id: string) {
    super(`Setup no encontrado con id: ${id}`, 'SETUP_NOT_FOUND', 404);
  }
}

export class SetupValidationError extends AppError {
  constructor(message: string) {
    super(message, 'SETUP_VALIDATION', 422);
  }
}
