import { Geningproyectados, CreateGeningproyectados, UpdateGeningproyectados, GeningproyectadosFilter, GeningproyectadosPageResult } from '../../../../domain/model/Geningproyectados';
import { GeningproyectadosResponse, GeningproyectadosListResponse, CreateGeningproyectadosRequest, UpdateGeningproyectadosRequest, GeningproyectadosFilterParams } from '../dto/GeningproyectadosDto';

/**
 * View Mapper: genIngProyectados.zul
 *
 * Transforma entre modelos de Dominio y DTOs de la Vista/Infraestructura.
 * - Response DTO → Domain Model (datos del backend → negocio)
 * - Domain Model → Request DTO (negocio → formulario/API)
 * - Domain Filter → DTO FilterParams
 *
 * Todos los métodos son estáticos.
 */
export class GeningproyectadosViewMapper {

  /**
   * Response DTO → Domain Model
   */
  static toDomain(response: GeningproyectadosResponse): Geningproyectados {
    return {
      id: response.id,
      // TODO: Mapear campos del Response DTO al modelo de dominio
    };
  }

  /**
   * ListResponse DTO → Domain PageResult
   */
  static toPageResult(listResponse: GeningproyectadosListResponse): GeningproyectadosPageResult {
    return {
      items: listResponse.data.map(GeningproyectadosViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      currentPage: listResponse.page,
    };
  }

  /**
   * Domain Create → Request DTO
   */
  static toCreateRequest(model: CreateGeningproyectados): CreateGeningproyectadosRequest {
    return {
      // TODO: Mapear campos del modelo de dominio al Request DTO de creación
    };
  }

  /**
   * Domain Update → Request DTO
   */
  static toUpdateRequest(model: UpdateGeningproyectados): UpdateGeningproyectadosRequest {
    return {
      // TODO: Mapear campos del modelo de dominio al Request DTO de actualización
    };
  }

  /**
   * Domain Filter → DTO FilterParams
   */
  static toFilterParams(filter: GeningproyectadosFilter): GeningproyectadosFilterParams {
    return {
      page: filter.page,
      size: filter.size,
      // TODO: Mapear filtros de dominio a parámetros de query
    };
  }

  /**
   * Domain Model → vista plana (para formularios)
   */
  static toFormData(model: Geningproyectados): Record<string, unknown> {
    return {
      // TODO: Mapear modelo de dominio a datos de formulario
      ...model,
    };
  }
}
