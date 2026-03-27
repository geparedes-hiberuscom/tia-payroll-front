import { Costos } from '../../../../domain/model/Costos';
import { CostosValidationError } from '../../../../domain/exception/CostosError';

export class CostosValidator {
  static validate(model: Partial<Costos>): void {
    if (!model.nombre || model.nombre.trim().length === 0) {
      throw new CostosValidationError('El nombre es obligatorio');
    }
  }
}
