import { Nominaresumengralcxrubro, CreateNominaresumengralcxrubro, UpdateNominaresumengralcxrubro, NominaresumengralcxrubroFilter, NominaresumengralcxrubroPageResult } from '../../../../domain/model/Nominaresumengralcxrubro';
import { NominaresumengralcxrubroResponse, NominaresumengralcxrubroListResponse, CreateNominaresumengralcxrubroRequest, UpdateNominaresumengralcxrubroRequest, NominaresumengralcxrubroFilterParams } from '../dto/NominaresumengralcxrubroDto';

/**
 * View Mapper: nominaresumenGralCxRubro.zul
 *
 * Transforma entre modelos de Dominio y DTOs de la Vista/Infraestructura.
 * - Response DTO → Domain Model (datos del backend → negocio)
 * - Domain Model → Request DTO (negocio → formulario/API)
 * - Domain Filter → DTO FilterParams
 *
 * Todos los métodos son estáticos.
 */
export class NominaresumengralcxrubroViewMapper {

  /**
   * Response DTO → Domain Model
   */
  static toDomain(response: NominaresumengralcxrubroResponse): Nominaresumengralcxrubro {
    return {
      ejecucionId: response.ejecucionId,
      claseId: response.claseId,
      claseNombre: response.claseNombre,
      nivel: response.nivel,
      clasePadreId: response.clasePadreId,
      ocultar: response.ocultar,
      reporteNomina: response.reporteNomina,
      idExterno: response.idExterno,
      totalValor: response.totalValor,
      cantidadRubros: response.cantidadRubros,
      cantidadColaboradores: response.cantidadColaboradores,
      tipo: response.tipo,
    };
  }

  /**
   * ListResponse DTO → Domain PageResult
   */
  static toPageResult(listResponse: NominaresumengralcxrubroListResponse): NominaresumengralcxrubroPageResult {
    return {
      data: listResponse.data.map(NominaresumengralcxrubroViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  /**
   * Domain Create → Request DTO
   */
  static toCreateRequest(model: CreateNominaresumengralcxrubro): CreateNominaresumengralcxrubroRequest {
    return {
      ejecucionId: model.ejecucionId,
      claseId: model.claseId,
    };
  }

  /**
   * Domain Update → Request DTO
   */
  static toUpdateRequest(model: UpdateNominaresumengralcxrubro): UpdateNominaresumengralcxrubroRequest {
    return {
      ejecucionId: model.ejecucionId,
      claseId: model.claseId,
    };
  }

  /**
   * Domain Filter → DTO FilterParams
   */
  static toFilterParams(filter: NominaresumengralcxrubroFilter): NominaresumengralcxrubroFilterParams {
    return {
      page: filter.page || 0,
      size: filter.size || 20,
      ejecucionId: filter.ejecucionId || 0,
      empresaId: filter.empresaId,
      tipo: filter.tipo,
      claseId: filter.claseId,
    };
  }

  /**
   * Domain Model → vista plana (para formularios)
   */
  static toFormData(model: Nominaresumengralcxrubro): Record<string, unknown> {
    return {
      // TODO: Mapear modelo de dominio a datos de formulario
      ...model,
    };
  }
}
