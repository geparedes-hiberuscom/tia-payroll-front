import { Nominaxcolablist, CreateNominaxcolablist, UpdateNominaxcolablist, NominaxcolablistFilter, NominaxcolablistPageResult } from '../../../../domain/model/Nominaxcolablist';
import { NominaxcolablistResponse, NominaxcolablistListResponse, CreateNominaxcolablistRequest, UpdateNominaxcolablistRequest, NominaxcolablistFilterParams } from '../dto/NominaxcolablistDto';

/**
 * View Mapper: nominaxColabList.zul
 *
 * Transforma entre modelos de Dominio y DTOs de la Vista/Infraestructura.
 * - Response DTO → Domain Model (datos del backend → negocio)
 * - Domain Model → Request DTO (negocio → formulario/API)
 * - Domain Filter → DTO FilterParams
 *
 * Todos los métodos son estáticos.
 */
export class NominaxcolablistViewMapper {

  /**
   * Response DTO → Domain Model
   */
  static toDomain(response: NominaxcolablistResponse): Nominaxcolablist {
    return {
      ejecucionId: response.ejecucionId,
      colaboradorId: response.colaboradorId,
      cedula: response.cedula,
      apellidosNombres: response.apellidosNombres,
      empresaId: response.empresaId,
      totalIngresos: response.totalIngresos,
      totalEgresos: response.totalEgresos,
      totalNeto: response.totalNeto,
      totalRubros: response.totalRubros,
      totalNoDeducible: response.totalNoDeducible,
    };
  }

  /**
   * ListResponse DTO → Domain PageResult
   */
  static toPageResult(listResponse: NominaxcolablistListResponse): NominaxcolablistPageResult {
    return {
      data: listResponse.data.map(NominaxcolablistViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  /**
   * Domain Create → Request DTO
   */
  static toCreateRequest(model: CreateNominaxcolablist): CreateNominaxcolablistRequest {
    return {
      ejecucionId: model.ejecucionId,
      empresaId: model.empresaId,
      formato: 'PDF',
    };
  }

  /**
   * Domain Update → Request DTO
   */
  static toUpdateRequest(model: UpdateNominaxcolablist): UpdateNominaxcolablistRequest {
    return {
      ejecucionId: model.ejecucionId,
      empresaId: model.empresaId,
    };
  }

  /**
   * Domain Filter → DTO FilterParams
   */
  static toFilterParams(filter: NominaxcolablistFilter): NominaxcolablistFilterParams {
    return {
      page: filter.page || 0,
      size: filter.size || 20,
      ejecucionId: filter.ejecucionId || 0,
      colaboradorId: filter.colaboradorId,
      cedula: filter.cedula,
      empresaId: filter.empresaId,
    };
  }

  /**
   * Domain Model → vista plana (para formularios)
   */
  static toFormData(model: Nominaxcolablist): Record<string, unknown> {
    return {
      // TODO: Mapear modelo de dominio a datos de formulario
      ...model,
    };
  }
}
