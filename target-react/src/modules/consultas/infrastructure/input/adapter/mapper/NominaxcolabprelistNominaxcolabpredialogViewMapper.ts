import { NominaxcolabprelistNominaxcolabpredialog, CreateNominaxcolabprelistNominaxcolabpredialog, UpdateNominaxcolabprelistNominaxcolabpredialog, NominaxcolabprelistNominaxcolabpredialogFilter, NominaxcolabprelistNominaxcolabpredialogPageResult } from '../../../../domain/model/NominaxcolabprelistNominaxcolabpredialog';
import { NominaxcolabprelistNominaxcolabpredialogResponse, NominaxcolabprelistNominaxcolabpredialogListResponse, CreateNominaxcolabprelistNominaxcolabpredialogRequest, UpdateNominaxcolabprelistNominaxcolabpredialogRequest, NominaxcolabprelistNominaxcolabpredialogFilterParams } from '../dto/NominaxcolabprelistNominaxcolabpredialogDto';

/**
 * View Mapper: nominaxColabPreList.zul / nominaxColabPreDialog.zul
 *
 * Transforma entre modelos de Dominio y DTOs de la Vista/Infraestructura.
 * - Response DTO → Domain Model (datos del backend → negocio)
 * - Domain Model → Request DTO (negocio → formulario/API)
 * - Domain Filter → DTO FilterParams
 *
 * Todos los métodos son estáticos.
 */
export class NominaxcolabprelistNominaxcolabpredialogViewMapper {

  /**
   * Response DTO → Domain Model
   */
  static toDomain(response: NominaxcolabprelistNominaxcolabpredialogResponse): NominaxcolabprelistNominaxcolabpredialog {
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
  static toPageResult(listResponse: NominaxcolabprelistNominaxcolabpredialogListResponse): NominaxcolabprelistNominaxcolabpredialogPageResult {
    return {
      data: listResponse.data.map(NominaxcolabprelistNominaxcolabpredialogViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  /**
   * Domain Create → Request DTO
   */
  static toCreateRequest(model: CreateNominaxcolabprelistNominaxcolabpredialog): CreateNominaxcolabprelistNominaxcolabpredialogRequest {
    return {
      ejecucionId: model.ejecucionId,
      empresaId: model.empresaId,
    };
  }

  /**
   * Domain Update → Request DTO
   */
  static toUpdateRequest(model: UpdateNominaxcolabprelistNominaxcolabpredialog): UpdateNominaxcolabprelistNominaxcolabpredialogRequest {
    return {
      ejecucionId: model.ejecucionId,
      empresaId: model.empresaId,
    };
  }

  /**
   * Domain Filter → DTO FilterParams
   */
  static toFilterParams(filter: NominaxcolabprelistNominaxcolabpredialogFilter): NominaxcolabprelistNominaxcolabpredialogFilterParams {
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
  static toFormData(model: NominaxcolabprelistNominaxcolabpredialog): Record<string, unknown> {
    return {
      // TODO: Mapear modelo de dominio a datos de formulario
      ...model,
    };
  }
}
