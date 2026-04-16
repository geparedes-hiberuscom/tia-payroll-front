import { ParametrosParametrosdialog, CreateParametrosParametrosdialog, UpdateParametrosParametrosdialog, ParametrosParametrosdialogFilter, ParametrosParametrosdialogPageResult } from '../../../../domain/model/ParametrosParametrosdialog';
import { ParametrosParametrosdialogResponse, ParametrosParametrosdialogListResponse, CreateParametrosParametrosdialogRequest, UpdateParametrosParametrosdialogRequest, ParametrosParametrosdialogFilterParams } from '../dto/ParametrosParametrosdialogDto';

export class ParametrosParametrosdialogViewMapper {

  static toDomain(response: ParametrosParametrosdialogResponse): ParametrosParametrosdialog {
    return {
      id: `${response.entorno}:${response.idParametro}`,
      entorno: response.entorno,
      idParametro: response.idParametro,
      parametro: response.parametro,
      datoCadena: response.datoCadena,
      datoCadena2: response.datoCadena2,
      datoNumero: response.datoNumero,
      datoNumero2: response.datoNumero2,
      datoFechaInicio: response.datoFechaInicio ? new Date(response.datoFechaInicio) : undefined,
      datoFechaFin: response.datoFechaFin ? new Date(response.datoFechaFin) : undefined,
      usuarioIngreso: response.usuarioIngreso,
      fechaIngreso: response.fechaIngreso ? new Date(response.fechaIngreso) : undefined,
      usuarioModificacion: response.usuarioModificacion,
      fechaModificacion: response.fechaModificacion ? new Date(response.fechaModificacion) : undefined,
    };
  }

  static toPageResult(listResponse: ParametrosParametrosdialogListResponse): ParametrosParametrosdialogPageResult {
    return {
      content: listResponse.content.map(ParametrosParametrosdialogViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  static toCreateRequest(model: CreateParametrosParametrosdialog): CreateParametrosParametrosdialogRequest {
    return {
      entorno: model.entorno,
      idParametro: model.idParametro,
      parametro: model.parametro,
      datoCadena: model.datoCadena,
      datoCadena2: model.datoCadena2,
      datoNumero: model.datoNumero,
      datoNumero2: model.datoNumero2,
      datoFechaInicio: model.datoFechaInicio ? model.datoFechaInicio.toISOString() : undefined,
      datoFechaFin: model.datoFechaFin ? model.datoFechaFin.toISOString() : undefined,
    };
  }

  static toUpdateRequest(model: UpdateParametrosParametrosdialog): UpdateParametrosParametrosdialogRequest {
    return {
      parametro: model.parametro,
      datoCadena: model.datoCadena,
      datoCadena2: model.datoCadena2,
      datoNumero: model.datoNumero,
      datoNumero2: model.datoNumero2,
      datoFechaInicio: model.datoFechaInicio ? model.datoFechaInicio.toISOString() : undefined,
      datoFechaFin: model.datoFechaFin ? model.datoFechaFin.toISOString() : undefined,
    };
  }

  static toFilterParams(filter: ParametrosParametrosdialogFilter): ParametrosParametrosdialogFilterParams {
    return {
      page: filter.page ?? 0,
      size: filter.size ?? 20,
      idParametro: filter.idParametro,
      nombre: filter.nombre,
      observaciones: filter.observaciones,
    };
  }
}
