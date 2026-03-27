import { Reportes } from '../../../../domain/model/Reportes';
import { ReportesRequest, ReportesResponse } from '../dto/ReportesDto';

export class ReportesViewMapper {
  static toRequest(model: Omit<Reportes, 'id'>): ReportesRequest {
    return {
      nombre: model.nombre,
    };
  }

  static fromResponse(response: ReportesResponse): Reportes {
    return {
      id: response.id,
      nombre: response.nombre,
    };
  }
}
