import { Geningproyectados, UpdateGeningproyectados, GeningproyectadosFilter, GeningproyectadosPageResult } from '../../../../domain/model/Geningproyectados';
import { GeningproyectadosResponse, GeningproyectadosListResponse, UpdateGeningproyectadosRequest, GeningproyectadosFilterParams } from '../dto/GeningproyectadosDto';

export class GeningproyectadosViewMapper {

  static toDomain(response: GeningproyectadosResponse): Geningproyectados {
    return {
      id: response.id,
      empresaId: response.empresaId,
      empresaNombre: response.empresaNombre,
      anio: response.anio,
      mes: response.mes,
      montoProyectado: response.montoProyectado,
      estado: response.estado,
      fechaGeneracion: response.fechaGeneracion ? new Date(response.fechaGeneracion) : undefined,
    };
  }

  static toPageResult(listResponse: GeningproyectadosListResponse): GeningproyectadosPageResult {
    return {
      content: listResponse.content.map(GeningproyectadosViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  static toUpdateRequest(model: UpdateGeningproyectados): UpdateGeningproyectadosRequest {
    return {
      montoProyectado: model.montoProyectado,
      estado: model.estado,
    };
  }

  static toFilterParams(filter: GeningproyectadosFilter): GeningproyectadosFilterParams {
    return {
      page: filter.page,
      size: filter.size,
      empresaId: filter.empresaId,
      anio: filter.anio,
    };
  }
}
