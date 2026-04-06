import { ContratoplantillaContratoplantilladialogResponse, ContratoplantillaContratoplantilladialogListResponse, CreateContratoplantillaContratoplantilladialogRequest, UpdateContratoplantillaContratoplantilladialogRequest } from '../../../input/adapter/dto/ContratoplantillaContratoplantilladialogDto';

/**
 * API Mapper: contratoPlantilla.zul / contratoPlantillaDialog.zul
 * El backend usa nombres con prefijo v* (vdescplantilla, vnombrearchivo).
 * El frontend usa nombres semánticos (descripcion, nombreArchivo).
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
    return { ...request };
  }

  static toUpdatePayload(request: UpdateContratoplantillaContratoplantilladialogRequest): Record<string, unknown> {
    return { ...request };
  }
}
