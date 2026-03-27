import { Costos } from '../../../../domain/model/Costos';
import { CostosRequest, CostosResponse } from '../dto/CostosDto';

export class CostosViewMapper {
  static toRequest(model: Omit<Costos, 'id'>): CostosRequest {
    return {
      nombre: model.nombre,
    };
  }

  static fromResponse(response: CostosResponse): Costos {
    return {
      id: response.id,
      nombre: response.nombre,
    };
  }
}
