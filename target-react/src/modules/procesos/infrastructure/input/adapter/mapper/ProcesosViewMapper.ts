import { Procesos } from '../../../../domain/model/Procesos';
import { ProcesosRequest, ProcesosResponse } from '../dto/ProcesosDto';

export class ProcesosViewMapper {
  static toRequest(model: Omit<Procesos, 'id'>): ProcesosRequest {
    return {
      nombre: model.nombre,
    };
  }

  static fromResponse(response: ProcesosResponse): Procesos {
    return {
      id: response.id,
      nombre: response.nombre,
    };
  }
}
