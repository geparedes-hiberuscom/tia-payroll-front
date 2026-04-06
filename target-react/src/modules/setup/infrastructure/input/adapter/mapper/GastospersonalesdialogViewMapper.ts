import { Gastospersonalesdialog, CreateGastospersonalesdialog, UpdateGastospersonalesdialog, GastospersonalesdialogFilter, GastospersonalesdialogPageResult } from '../../../../domain/model/Gastospersonalesdialog';
import { GastospersonalesdialogResponse, GastospersonalesdialogListResponse, CreateGastospersonalesdialogRequest, UpdateGastospersonalesdialogRequest, GastospersonalesdialogFilterParams } from '../dto/GastospersonalesdialogDto';

export class GastospersonalesdialogViewMapper {

  static toDomain(response: GastospersonalesdialogResponse): Gastospersonalesdialog {
    return {
      id: response.id,
      empresaId: response.empresaId,
      empresaNombre: response.empresaNombre,
      anio: response.anio,
      descripcion: response.descripcion,
      montoMaximo: response.montoMaximo,
      porcentaje: response.porcentaje,
      estado: response.estado,
    };
  }

  static toPageResult(listResponse: GastospersonalesdialogListResponse): GastospersonalesdialogPageResult {
    return {
      content: listResponse.content.map(GastospersonalesdialogViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  static toCreateRequest(model: CreateGastospersonalesdialog): CreateGastospersonalesdialogRequest {
    return {
      empresaId: model.empresaId,
      anio: model.anio,
      descripcion: model.descripcion,
      montoMaximo: model.montoMaximo,
      porcentaje: model.porcentaje,
    };
  }

  static toUpdateRequest(model: UpdateGastospersonalesdialog): UpdateGastospersonalesdialogRequest {
    return {
      descripcion: model.descripcion,
      montoMaximo: model.montoMaximo,
      porcentaje: model.porcentaje,
    };
  }

  static toFilterParams(filter: GastospersonalesdialogFilter): GastospersonalesdialogFilterParams {
    return {
      page: filter.page,
      size: filter.size,
      empresaId: filter.empresaId,
      anio: filter.anio,
    };
  }
}
