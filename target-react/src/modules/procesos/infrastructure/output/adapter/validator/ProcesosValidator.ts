import { Procesos } from '../../../../domain/model/Procesos';
import { ProcesosValidationError } from '../../../../domain/exception/ProcesosError';

export class ProcesosValidator {
  static validate(model: Partial<Procesos>): void {
    if (!model.nombre || model.nombre.trim().length === 0) {
      throw new ProcesosValidationError('El nombre es obligatorio');
    }
  }
}
