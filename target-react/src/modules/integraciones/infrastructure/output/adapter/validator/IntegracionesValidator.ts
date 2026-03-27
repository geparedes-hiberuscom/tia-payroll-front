import { Integraciones } from '../../../../domain/model/Integraciones';
import { IntegracionesValidationError } from '../../../../domain/exception/IntegracionesError';

export class IntegracionesValidator {
  static validate(model: Partial<Integraciones>): void {
    if (!model.nombre || model.nombre.trim().length === 0) {
      throw new IntegracionesValidationError('El nombre es obligatorio');
    }
  }
}
