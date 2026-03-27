import { Beneficios } from '../../../../domain/model/Beneficios';
import { BeneficiosRequest, BeneficiosResponse } from '../dto/BeneficiosDto';

export class BeneficiosViewMapper {
  static toRequest(model: Omit<Beneficios, 'id'>): BeneficiosRequest {
    return {
      nombre: model.nombre,
    };
  }

  static fromResponse(response: BeneficiosResponse): Beneficios {
    return {
      id: response.id,
      nombre: response.nombre,
    };
  }
}
