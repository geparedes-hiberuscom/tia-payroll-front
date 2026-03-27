import { Prestamos } from '../../../../domain/model/Prestamos';
import { PrestamosValidationError } from '../../../../domain/exception/PrestamosError';

export class PrestamosValidator {
  static validate(model: Partial<Prestamos>): void {
    if (!model.nombre || model.nombre.trim().length === 0) {
      throw new PrestamosValidationError('El nombre es obligatorio');
    }
  }
}
