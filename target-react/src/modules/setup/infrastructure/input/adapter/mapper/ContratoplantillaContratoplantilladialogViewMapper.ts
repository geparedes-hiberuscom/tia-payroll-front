import { ContratoplantillaContratoplantilladialog, CreateContratoplantillaContratoplantilladialog, UpdateContratoplantillaContratoplantilladialog, ContratoplantillaContratoplantilladialogFilter, ContratoplantillaContratoplantilladialogPageResult } from '../../../../domain/model/ContratoplantillaContratoplantilladialog';
import { ContratoplantillaContratoplantilladialogResponse, ContratoplantillaContratoplantilladialogListResponse, CreateContratoplantillaContratoplantilladialogRequest, UpdateContratoplantillaContratoplantilladialogRequest, ContratoplantillaContratoplantilladialogFilterParams } from '../dto/ContratoplantillaContratoplantilladialogDto';

export class ContratoplantillaContratoplantilladialogViewMapper {

  static toDomain(response: ContratoplantillaContratoplantilladialogResponse): ContratoplantillaContratoplantilladialog {
    return {
      id: Number(response.id),
      descripcion: response.descripcion ?? '',
      nombreArchivo: response.nombreArchivo,
      nombreArchivo2: response.nombreArchivo2,
      usuarioIngreso: response.usuarioIngreso,
      fechaIngreso: response.fechaIngreso ? new Date(response.fechaIngreso) : undefined,
      usuarioModificacion: response.usuarioModificacion,
      fechaModificacion: response.fechaModificacion ? new Date(response.fechaModificacion) : undefined,
    };
  }

  static toPageResult(listResponse: ContratoplantillaContratoplantilladialogListResponse): ContratoplantillaContratoplantilladialogPageResult {
    return {
      content: listResponse.content.map(ContratoplantillaContratoplantilladialogViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  static toCreateRequest(model: CreateContratoplantillaContratoplantilladialog): CreateContratoplantillaContratoplantilladialogRequest {
    return {
      vdescplantilla: model.descripcion,
      vnombrearchivo: model.nombreArchivo,
      vnombrearchivo2: model.nombreArchivo2,
    };
  }

  static toUpdateRequest(model: UpdateContratoplantillaContratoplantilladialog): UpdateContratoplantillaContratoplantilladialogRequest {
    return {
      vdescplantilla: model.descripcion,
      vnombrearchivo: model.nombreArchivo,
      vnombrearchivo2: model.nombreArchivo2,
    };
  }

  static toFilterParams(filter: ContratoplantillaContratoplantilladialogFilter): ContratoplantillaContratoplantilladialogFilterParams {
    return {
      page: filter.page,
      size: filter.size,
      descripcion: filter.descripcion,
    };
  }
}
