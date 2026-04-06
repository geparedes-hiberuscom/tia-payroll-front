import { PlantillacontablePlantillacontabledialogResponse, PlantillacontablePlantillacontabledialogListResponse, CreatePlantillacontablePlantillacontabledialogRequest, UpdatePlantillacontablePlantillacontabledialogRequest } from '../../../input/adapter/dto/PlantillacontablePlantillacontabledialogDto';

/**
 * API Mapper: plantillaContable.zul / plantillaContableDialog.zul
 * Transforma las respuestas raw de la API a los DTOs tipados del frontend.
 * Transforma los DTOs del frontend a los payloads de la API.
 */
export class PlantillacontablePlantillacontabledialogApiMapper {

  static toResponse(raw: any): PlantillacontablePlantillacontabledialogResponse {
    return {
      id: raw.id,
      // TODO: Mapear campos del JSON de respuesta del backend al DTO Response
    };
  }

  static toListResponse(raw: any): PlantillacontablePlantillacontabledialogListResponse {
    return {
      data: Array.isArray(raw.data || raw.content || raw)
        ? (raw.data || raw.content || raw).map(PlantillacontablePlantillacontabledialogApiMapper.toResponse)
        : [],
      totalElements: raw.totalElements || raw.total || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || raw.number || 0,
      size: raw.size || raw.pageSize || 10,
    };
  }

  static toCreatePayload(request: CreatePlantillacontablePlantillacontabledialogRequest): Record<string, unknown> {
    return {
      // TODO: Mapear campos del DTO Request al payload de la API
      ...request,
    };
  }

  static toUpdatePayload(request: UpdatePlantillacontablePlantillacontabledialogRequest): Record<string, unknown> {
    return {
      // TODO: Mapear campos del DTO Request al payload de la API
      ...request,
    };
  }
}
