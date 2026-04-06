import { GastospersonalesdialogResponse, GastospersonalesdialogListResponse, CreateGastospersonalesdialogRequest, UpdateGastospersonalesdialogRequest } from '../../../input/adapter/dto/GastospersonalesdialogDto';

/**
 * API Mapper: GastosPersonalesDialog.zul
 * Transforma las respuestas raw de la API a los DTOs tipados del frontend.
 * Transforma los DTOs del frontend a los payloads de la API.
 */
export class GastospersonalesdialogApiMapper {

  static toResponse(raw: any): GastospersonalesdialogResponse {
    return {
      id: raw.id,
      // TODO: Mapear campos del JSON de respuesta del backend al DTO Response
    };
  }

  static toListResponse(raw: any): GastospersonalesdialogListResponse {
    return {
      data: Array.isArray(raw.data || raw.content || raw)
        ? (raw.data || raw.content || raw).map(GastospersonalesdialogApiMapper.toResponse)
        : [],
      totalElements: raw.totalElements || raw.total || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || raw.number || 0,
      size: raw.size || raw.pageSize || 10,
    };
  }

  static toCreatePayload(request: CreateGastospersonalesdialogRequest): Record<string, unknown> {
    return {
      // TODO: Mapear campos del DTO Request al payload de la API
      ...request,
    };
  }

  static toUpdatePayload(request: UpdateGastospersonalesdialogRequest): Record<string, unknown> {
    return {
      // TODO: Mapear campos del DTO Request al payload de la API
      ...request,
    };
  }
}
