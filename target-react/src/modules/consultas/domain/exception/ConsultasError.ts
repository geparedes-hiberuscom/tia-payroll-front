import { AppError } from '@shared/domain/exception/AppError';

export class ConsultasNotFoundError extends AppError {
  constructor(id: string) {
    super(`Consultas no encontrado con id: ${id}`, 'CONSULTAS_NOT_FOUND', 404);
  }
}

export class ConsultasValidationError extends AppError {
  constructor(message: string) {
    super(message, 'CONSULTAS_VALIDATION', 422);
  }
}
