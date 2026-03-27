import { Rubros } from '../../../../domain/model/Rubros';
import { RubrosRequest, RubrosResponse } from '../dto/RubrosDto';

export class RubrosViewMapper {
  static toRequest(model: Omit<Rubros, 'id'>): RubrosRequest {
    return {
      nombre: model.nombre,
    };
  }

  static fromResponse(response: RubrosResponse): Rubros {
    return {
      id: response.id,
      nombre: response.nombre,
    };
  }
}
