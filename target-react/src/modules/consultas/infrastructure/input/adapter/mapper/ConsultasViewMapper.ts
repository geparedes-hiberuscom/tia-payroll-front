import { Consultas } from '../../../../domain/model/Consultas';
import { ConsultasRequest, ConsultasResponse } from '../dto/ConsultasDto';

export class ConsultasViewMapper {
  static toRequest(model: Omit<Consultas, 'id'>): ConsultasRequest {
    return {
      nombre: model.nombre,
    };
  }

  static fromResponse(response: ConsultasResponse): Consultas {
    return {
      id: response.id,
      nombre: response.nombre,
    };
  }
}
