/**
 * Excepciones: Empresas
 */

export class EmpresasError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmpresasError';
  }
}

export class EmpresasNotFoundError extends EmpresasError {
  constructor(id: string | number) {
    super(`Empresa con id ${id} no encontrada`);
    this.name = 'EmpresasNotFoundError';
  }
}

export class EmpresasValidationError extends EmpresasError {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'EmpresasValidationError';
  }
}
