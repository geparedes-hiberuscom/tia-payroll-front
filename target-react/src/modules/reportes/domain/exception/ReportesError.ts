import { AppError } from '@shared/domain/exception/AppError';

export class ReportesNotFoundError extends AppError {
  constructor(id: string) {
    super(`Reportes no encontrado con id: ${id}`, 'REPORTES_NOT_FOUND', 404);
  }
}

export class ReportesValidationError extends AppError {
  constructor(message: string) {
    super(message, 'REPORTES_VALIDATION', 422);
  }
}
