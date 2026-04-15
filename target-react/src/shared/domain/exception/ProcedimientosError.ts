/**
 * Excepciones: Procedimientos
 */

export class ProcedimientosError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProcedimientosError';
  }
}

export class ProcedimientosNotFoundError extends ProcedimientosError {
  constructor(id: string | number) {
    super(`Procedimiento con id ${id} no encontrado`);
    this.name = 'ProcedimientosNotFoundError';
  }
}

export class ProcedimientosValidationError extends ProcedimientosError {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ProcedimientosValidationError';
  }
}
