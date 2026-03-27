import { AppError } from '@shared/domain/exception/AppError';

export class BeneficiosNotFoundError extends AppError {
  constructor(id: string) {
    super(`Beneficios no encontrado con id: ${id}`, 'BENEFICIOS_NOT_FOUND', 404);
  }
}

export class BeneficiosValidationError extends AppError {
  constructor(message: string) {
    super(message, 'BENEFICIOS_VALIDATION', 422);
  }
}
