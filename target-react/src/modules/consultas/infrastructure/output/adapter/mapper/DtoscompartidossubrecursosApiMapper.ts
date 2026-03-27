import { DtoscompartidossubrecursosResponse, DtoscompartidossubrecursosListResponse, CreateDtoscompartidossubrecursosRequest, UpdateDtoscompartidossubrecursosRequest } from '../../../input/adapter/dto/DtoscompartidossubrecursosDto';

/**
 * API Mapper: DTOs compartidos (subrecursos)
 * Transforma las respuestas raw de la API a los DTOs tipados del frontend.
 * Transforma los DTOs del frontend a los payloads de la API.
 */
export class DtoscompartidossubrecursosApiMapper {

  static toResponse(raw: any): DtoscompartidossubrecursosResponse {
    return {
      id: raw.id,
      // TODO: Mapear campos del JSON de respuesta del backend al DTO Response
    };
  }

  static toListResponse(raw: any): DtoscompartidossubrecursosListResponse {
    return {
      data: Array.isArray(raw.data || raw.content || raw)
        ? (raw.data || raw.content || raw).map(DtoscompartidossubrecursosApiMapper.toResponse)
        : [],
      totalElements: raw.totalElements || raw.total || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || raw.number || 0,
      size: raw.size || raw.pageSize || 10,
    };
  }

  static toCreatePayload(request: CreateDtoscompartidossubrecursosRequest): Record<string, unknown> {
    return {
      // TODO: Mapear campos del DTO Request al payload de la API
      ...request,
    };
  }

  static toUpdatePayload(request: UpdateDtoscompartidossubrecursosRequest): Record<string, unknown> {
    return {
      // TODO: Mapear campos del DTO Request al payload de la API
      ...request,
    };
  }
}
