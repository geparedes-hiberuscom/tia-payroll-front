import { Pago } from '../../../../domain/model/Pago';
import { PagoValidationError } from '../../../../domain/exception/PagoError';

export class PagoValidator {
  static validate(model: Partial<Pago>): void {
    if (!model.nombre || model.nombre.trim().length === 0) {
      throw new PagoValidationError('El nombre es obligatorio');
    }
  }
}
