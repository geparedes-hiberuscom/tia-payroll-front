import { AppError } from '@shared/domain/exception/AppError';

export class CostosNotFoundError extends AppError {
  constructor(id: string) {
    super(`Costos no encontrado con id: ${id}`, 'COSTOS_NOT_FOUND', 404);
  }
}

export class CostosValidationError extends AppError {
  constructor(message: string) {
    super(message, 'COSTOS_VALIDATION', 422);
  }
}
