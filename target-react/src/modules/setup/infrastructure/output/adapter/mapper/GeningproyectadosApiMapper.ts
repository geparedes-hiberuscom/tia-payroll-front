import { GeningproyectadosResponse, GeningproyectadosListResponse, CreateGeningproyectadosRequest, UpdateGeningproyectadosRequest } from '../../../input/adapter/dto/GeningproyectadosDto';

/**
 * API Mapper: genIngProyectados.zul
 * Transforma las respuestas raw de la API a los DTOs tipados del frontend.
 * Transforma los DTOs del frontend a los payloads de la API.
 */
export class GeningproyectadosApiMapper {

  static toResponse(raw: any): GeningproyectadosResponse {
    return {
      id: raw.id,
      // TODO: Mapear campos del JSON de respuesta del backend al DTO Response
    };
  }

  static toListResponse(raw: any): GeningproyectadosListResponse {
    return {
      data: Array.isArray(raw.data || raw.content || raw)
        ? (raw.data || raw.content || raw).map(GeningproyectadosApiMapper.toResponse)
        : [],
      totalElements: raw.totalElements || raw.total || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || raw.number || 0,
      size: raw.size || raw.pageSize || 10,
    };
  }

  static toCreatePayload(request: CreateGeningproyectadosRequest): Record<string, unknown> {
    return {
      // TODO: Mapear campos del DTO Request al payload de la API
      ...request,
    };
  }

  static toUpdatePayload(request: UpdateGeningproyectadosRequest): Record<string, unknown> {
    return {
      // TODO: Mapear campos del DTO Request al payload de la API
      ...request,
    };
  }
}
