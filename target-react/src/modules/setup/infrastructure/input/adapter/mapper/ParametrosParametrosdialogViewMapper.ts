import { ParametrosParametrosdialog, CreateParametrosParametrosdialog, UpdateParametrosParametrosdialog, ParametrosParametrosdialogFilter, ParametrosParametrosdialogPageResult } from '../../../../domain/model/ParametrosParametrosdialog';
import { ParametrosParametrosdialogResponse, ParametrosParametrosdialogListResponse, CreateParametrosParametrosdialogRequest, UpdateParametrosParametrosdialogRequest, ParametrosParametrosdialogFilterParams } from '../dto/ParametrosParametrosdialogDto';

/**
 * View Mapper: parametros.zul / parametrosDialog.zul
 *
 * Transforma entre modelos de Dominio y DTOs de la Vista/Infraestructura.
 * - Response DTO → Domain Model (datos del backend → negocio)
 * - Domain Model → Request DTO (negocio → formulario/API)
 * - Domain Filter → DTO FilterParams
 *
 * Todos los métodos son estáticos.
 */
export class ParametrosParametrosdialogViewMapper {

  /**
   * Response DTO → Domain Model
   */
  static toDomain(response: ParametrosParametrosdialogResponse): ParametrosParametrosdialog {
    return {
      id: response.id,
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

  /**
   * ListResponse DTO → Domain PageResult
   */
  static toPageResult(listResponse: ParametrosParametrosdialogListResponse): ParametrosParametrosdialogPageResult {
    return {
      content: listResponse.data.map(ParametrosParametrosdialogViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  /**
   * Domain Create → Request DTO
   */
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

  /**
   * Domain Update → Request DTO
   */
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

  /**
   * Domain Filter → DTO FilterParams
   */
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
