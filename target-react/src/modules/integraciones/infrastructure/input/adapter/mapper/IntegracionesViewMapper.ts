import { Integraciones } from '../../../../domain/model/Integraciones';
import { IntegracionesRequest, IntegracionesResponse } from '../dto/IntegracionesDto';

export class IntegracionesViewMapper {
  static toRequest(model: Omit<Integraciones, 'id'>): IntegracionesRequest {
    return {
      nombre: model.nombre,
    };
  }

  static fromResponse(response: IntegracionesResponse): Integraciones {
    return {
      id: response.id,
      nombre: response.nombre,
    };
  }
}
