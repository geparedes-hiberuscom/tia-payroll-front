import { AppError } from '@shared/domain/exception/AppError';

export class ProcesosNotFoundError extends AppError {
  constructor(id: string) {
    super(`Procesos no encontrado con id: ${id}`, 'PROCESOS_NOT_FOUND', 404);
  }
}

export class ProcesosValidationError extends AppError {
  constructor(message: string) {
    super(message, 'PROCESOS_VALIDATION', 422);
  }
}
