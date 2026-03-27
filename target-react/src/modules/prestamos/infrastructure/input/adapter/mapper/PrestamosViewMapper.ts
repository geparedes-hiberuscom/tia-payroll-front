import { Prestamos } from '../../../../domain/model/Prestamos';
import { PrestamosRequest, PrestamosResponse } from '../dto/PrestamosDto';

export class PrestamosViewMapper {
  static toRequest(model: Omit<Prestamos, 'id'>): PrestamosRequest {
    return {
      nombre: model.nombre,
    };
  }

  static fromResponse(response: PrestamosResponse): Prestamos {
    return {
      id: response.id,
      nombre: response.nombre,
    };
  }
}
