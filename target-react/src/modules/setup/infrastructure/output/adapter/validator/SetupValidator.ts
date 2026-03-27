import { Setup } from '../../../../domain/model/Setup';
import { SetupValidationError } from '../../../../domain/exception/SetupError';

export class SetupValidator {
  static validate(model: Partial<Setup>): void {
    if (!model.nombre || model.nombre.trim().length === 0) {
      throw new SetupValidationError('El nombre es obligatorio');
    }
  }
}
