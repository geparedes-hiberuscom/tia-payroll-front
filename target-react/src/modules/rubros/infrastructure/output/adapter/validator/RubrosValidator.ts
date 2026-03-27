import { Rubros } from '../../../../domain/model/Rubros';
import { RubrosValidationError } from '../../../../domain/exception/RubrosError';

export class RubrosValidator {
  static validate(model: Partial<Rubros>): void {
    if (!model.nombre || model.nombre.trim().length === 0) {
      throw new RubrosValidationError('El nombre es obligatorio');
    }
  }
}
