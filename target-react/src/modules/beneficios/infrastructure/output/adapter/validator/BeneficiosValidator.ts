import { Beneficios } from '../../../../domain/model/Beneficios';
import { BeneficiosValidationError } from '../../../../domain/exception/BeneficiosError';

export class BeneficiosValidator {
  static validate(model: Partial<Beneficios>): void {
    if (!model.nombre || model.nombre.trim().length === 0) {
      throw new BeneficiosValidationError('El nombre es obligatorio');
    }
  }
}
