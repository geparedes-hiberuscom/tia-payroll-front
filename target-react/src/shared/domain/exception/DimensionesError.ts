/**
 * Excepciones: Dimensiones
 */

export class DimensionesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DimensionesError';
  }
}

export class DimensionesNotFoundError extends DimensionesError {
  constructor(id: string | number) {
    super(`Dimensión con id ${id} no encontrada`);
    this.name = 'DimensionesNotFoundError';
  }
}

export class DimensionesValidationError extends DimensionesError {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'DimensionesValidationError';
  }
}
