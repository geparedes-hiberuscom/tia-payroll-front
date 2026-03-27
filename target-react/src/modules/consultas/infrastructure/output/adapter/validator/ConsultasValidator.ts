import { Consultas } from '../../../../domain/model/Consultas';
import { ConsultasValidationError } from '../../../../domain/exception/ConsultasError';

export class ConsultasValidator {
  static validate(model: Partial<Consultas>): void {
    if (!model.nombre || model.nombre.trim().length === 0) {
      throw new ConsultasValidationError('El nombre es obligatorio');
    }
  }
}
