import { GastospersonalesdialogResponse, GastospersonalesdialogListResponse, CreateGastospersonalesdialogRequest, UpdateGastospersonalesdialogRequest } from '../../../input/adapter/dto/GastospersonalesdialogDto';

/**
 * API Mapper: GastosPersonalesDialog.zul
 */
export class GastospersonalesdialogApiMapper {

  static toResponse(raw: any): GastospersonalesdialogResponse {
    return {
      id: raw.id,
      empresaId: raw.empresaId,
      empresaNombre: raw.empresaNombre,
      anio: raw.anio,
      descripcion: raw.descripcion,
      montoMaximo: raw.montoMaximo,
      porcentaje: raw.porcentaje,
      estado: raw.estado,
    };
  }

  static toListResponse(raw: any): GastospersonalesdialogListResponse {
    return {
      content: Array.isArray(raw.content) ? raw.content.map(GastospersonalesdialogApiMapper.toResponse) : [],
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 10,
    };
  }

  static toCreatePayload(request: CreateGastospersonalesdialogRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateGastospersonalesdialogRequest): Record<string, unknown> {
    return { ...request };
  }
}
