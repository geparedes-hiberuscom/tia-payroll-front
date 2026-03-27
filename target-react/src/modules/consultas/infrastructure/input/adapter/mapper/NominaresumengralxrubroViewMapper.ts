import { Nominaresumengralxrubro, CreateNominaresumengralxrubro, UpdateNominaresumengralxrubro, NominaresumengralxrubroFilter, NominaresumengralxrubroPageResult } from '../../../../domain/model/Nominaresumengralxrubro';
import { NominaresumengralxrubroResponse, NominaresumengralxrubroListResponse, CreateNominaresumengralxrubroRequest, UpdateNominaresumengralxrubroRequest, NominaresumengralxrubroFilterParams } from '../dto/NominaresumengralxrubroDto';

/**
 * View Mapper: nominaresumenGralxRubro.zul
 *
 * Transforma entre modelos de Dominio y DTOs de la Vista/Infraestructura.
 * - Response DTO → Domain Model (datos del backend → negocio)
 * - Domain Model → Request DTO (negocio → formulario/API)
 * - Domain Filter → DTO FilterParams
 *
 * Todos los métodos son estáticos.
 */
export class NominaresumengralxrubroViewMapper {

  /**
   * Response DTO → Domain Model
   */
  static toDomain(response: NominaresumengralxrubroResponse): Nominaresumengralxrubro {
    return {
      ejecucionId: response.ejecucionId,
      rubroId: response.rubroId,
      rubroNombre: response.rubroNombre,
      efecto: response.efecto,
      totalValor01: response.totalValor01,
      totalValor02: response.totalValor02,
      totalValor03: response.totalValor03,
      totalValor04: response.totalValor04,
      totalValor05: response.totalValor05,
      cantidadColaboradores: response.cantidadColaboradores,
      tipo: response.tipo,
    };
  }

  /**
   * ListResponse DTO → Domain PageResult
   */
  static toPageResult(listResponse: NominaresumengralxrubroListResponse): NominaresumengralxrubroPageResult {
    return {
      data: listResponse.data.map(NominaresumengralxrubroViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  /**
   * Domain Create → Request DTO
   */
  static toCreateRequest(model: CreateNominaresumengralxrubro): CreateNominaresumengralxrubroRequest {
    return {
      ejecucionId: model.ejecucionId,
      rubroId: model.rubroId,
    };
  }

  /**
   * Domain Update → Request DTO
   */
  static toUpdateRequest(model: UpdateNominaresumengralxrubro): UpdateNominaresumengralxrubroRequest {
    return {
      ejecucionId: model.ejecucionId,
      rubroId: model.rubroId,
    };
  }

  /**
   * Domain Filter → DTO FilterParams
   */
  static toFilterParams(filter: NominaresumengralxrubroFilter): NominaresumengralxrubroFilterParams {
    return {
      page: filter.page || 0,
      size: filter.size || 20,
      ejecucionId: filter.ejecucionId || 0,
      empresaId: filter.empresaId,
      tipo: filter.tipo,
      efecto: filter.efecto,
    };
  }

  /**
   * Domain Model → vista plana (para formularios)
   */
  static toFormData(model: Nominaresumengralxrubro): Record<string, unknown> {
    return {
      // TODO: Mapear modelo de dominio a datos de formulario
      ...model,
    };
  }
}
