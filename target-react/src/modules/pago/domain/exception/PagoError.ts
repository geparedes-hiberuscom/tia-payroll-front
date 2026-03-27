import { AppError } from '@shared/domain/exception/AppError';

export class PagoNotFoundError extends AppError {
  constructor(id: string) {
    super(`Pago no encontrado con id: ${id}`, 'PAGO_NOT_FOUND', 404);
  }
}

export class PagoValidationError extends AppError {
  constructor(message: string) {
    super(message, 'PAGO_VALIDATION', 422);
  }
}
