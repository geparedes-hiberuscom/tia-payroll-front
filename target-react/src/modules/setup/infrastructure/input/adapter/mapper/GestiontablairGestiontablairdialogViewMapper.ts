import { GestiontablairGestiontablairdialog, CreateGestiontablairGestiontablairdialog, UpdateGestiontablairGestiontablairdialog, GestiontablairGestiontablairdialogFilter, GestiontablairGestiontablairdialogPageResult } from '../../../../domain/model/GestiontablairGestiontablairdialog';
import { GestiontablairGestiontablairdialogResponse, GestiontablairGestiontablairdialogListResponse, CreateGestiontablairGestiontablairdialogRequest, UpdateGestiontablairGestiontablairdialogRequest, GestiontablairGestiontablairdialogFilterParams } from '../dto/GestiontablairGestiontablairdialogDto';

export class GestiontablairGestiontablairdialogViewMapper {

  static toDomain(response: GestiontablairGestiontablairdialogResponse): GestiontablairGestiontablairdialog {
    return {
      id: response.id,
      anio: response.anio,
      nivel: response.nivel,
      tipo: response.tipo,
      valorMinimo: response.valorMinimo,
      valorMaximo: response.valorMaximo,
      fraccionBasica: response.fraccionBasica,
      porcentajeExcedente: response.porcentajeExcedente,
    };
  }

  static toPageResult(listResponse: GestiontablairGestiontablairdialogListResponse): GestiontablairGestiontablairdialogPageResult {
    return {
      content: listResponse.content.map(GestiontablairGestiontablairdialogViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  static toCreateRequest(model: CreateGestiontablairGestiontablairdialog): CreateGestiontablairGestiontablairdialogRequest {
    return {
      anio: model.anio,
      nivel: model.nivel,
      tipo: model.tipo,
      valorMinimo: model.valorMinimo,
      valorMaximo: model.valorMaximo,
      fraccionBasica: model.fraccionBasica,
      porcentajeExcedente: model.porcentajeExcedente,
    };
  }

  static toUpdateRequest(model: UpdateGestiontablairGestiontablairdialog): UpdateGestiontablairGestiontablairdialogRequest {
    return {
      anio: model.anio,
      nivel: model.nivel,
      tipo: model.tipo,
      valorMinimo: model.valorMinimo,
      valorMaximo: model.valorMaximo,
      fraccionBasica: model.fraccionBasica,
      porcentajeExcedente: model.porcentajeExcedente,
    };
  }

  static toFilterParams(filter: GestiontablairGestiontablairdialogFilter): GestiontablairGestiontablairdialogFilterParams {
    return {
      page: filter.page,
      size: filter.size,
      anio: filter.anio,
      tipo: filter.tipo,
    };
  }
}
