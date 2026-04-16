import { GeningproyectadosResponse, GeningproyectadosListResponse, UpdateGeningproyectadosRequest } from '../../../input/adapter/dto/GeningproyectadosDto';

/**
 * API Mapper: genIngProyectados.zul
 */
export class GeningproyectadosApiMapper {

  static toResponse(raw: any): GeningproyectadosResponse {
    return {
      id: raw.id,
      empresaId: raw.empresaId,
      empresaNombre: raw.empresaNombre,
      anio: raw.anio,
      mes: raw.mes,
      montoProyectado: raw.montoProyectado,
      estado: raw.estado,
      fechaGeneracion: raw.fechaGeneracion,
    };
  }

  static toListResponse(raw: any): GeningproyectadosListResponse {
    return {
      content: Array.isArray(raw.content) ? raw.content.map(GeningproyectadosApiMapper.toResponse) : [],
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 10,
    };
  }

  static toUpdatePayload(request: UpdateGeningproyectadosRequest): Record<string, unknown> {
    return { ...request };
  }
}
