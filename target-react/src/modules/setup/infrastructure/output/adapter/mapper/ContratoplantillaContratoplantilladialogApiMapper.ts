import { ContratoplantillaContratoplantilladialogResponse, ContratoplantillaContratoplantilladialogListResponse, CreateContratoplantillaContratoplantilladialogRequest, UpdateContratoplantillaContratoplantilladialogRequest } from '../../../input/adapter/dto/ContratoplantillaContratoplantilladialogDto';

/**
 * API Mapper: contratoPlantilla.zul / contratoPlantillaDialog.zul
 */
export class ContratoplantillaContratoplantilladialogApiMapper {

  static toResponse(raw: any): ContratoplantillaContratoplantilladialogResponse {
    return {
      id: raw.id,
      descripcion: raw.vdescplantilla,
      nombreArchivo: raw.vnombrearchivo,
      nombreArchivo2: raw.vnombrearchivo2,
      usuarioIngreso: raw.usuarioIngreso,
      fechaIngreso: raw.fechaIngreso,
      usuarioModificacion: raw.usuarioModificacion,
      fechaModificacion: raw.fechaModificacion,
    };
  }

  static toListResponse(raw: any): ContratoplantillaContratoplantilladialogListResponse {
    return {
      content: Array.isArray(raw.content) ? raw.content.map(ContratoplantillaContratoplantilladialogApiMapper.toResponse) : [],
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 10,
    };
  }

  static toCreatePayload(request: CreateContratoplantillaContratoplantilladialogRequest): Record<string, unknown> {
    return {
      vdescplantilla: request.vdescplantilla,
      vnombrearchivo: request.vnombrearchivo,
      vnombrearchivo2: request.vnombrearchivo2,
    };
  }

  static toUpdatePayload(request: UpdateContratoplantillaContratoplantilladialogRequest): Record<string, unknown> {
    const payload: Record<string, unknown> = {};
    if (request.vdescplantilla !== undefined) payload.vdescplantilla = request.vdescplantilla;
    if (request.vnombrearchivo !== undefined) payload.vnombrearchivo = request.vnombrearchivo;
    if (request.vnombrearchivo2 !== undefined) payload.vnombrearchivo2 = request.vnombrearchivo2;
    return payload;
  }
}
