import { Reportes } from '../../../../domain/model/Reportes';
import { ReportesValidationError } from '../../../../domain/exception/ReportesError';

export class ReportesValidator {
  static validate(model: Partial<Reportes>): void {
    if (!model.nombre || model.nombre.trim().length === 0) {
      throw new ReportesValidationError('El nombre es obligatorio');
    }
  }
}
