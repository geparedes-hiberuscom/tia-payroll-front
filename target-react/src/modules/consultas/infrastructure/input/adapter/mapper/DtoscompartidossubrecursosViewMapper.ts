import { Dtoscompartidossubrecursos, CreateDtoscompartidossubrecursos, UpdateDtoscompartidossubrecursos, DtoscompartidossubrecursosFilter, DtoscompartidossubrecursosPageResult } from '../../../../domain/model/Dtoscompartidossubrecursos';
import { DtoscompartidossubrecursosResponse, DtoscompartidossubrecursosListResponse, CreateDtoscompartidossubrecursosRequest, UpdateDtoscompartidossubrecursosRequest, DtoscompartidossubrecursosFilterParams } from '../dto/DtoscompartidossubrecursosDto';

/**
 * View Mapper: DTOs compartidos (subrecursos)
 *
 * Transforma entre modelos de Dominio y DTOs de la Vista/Infraestructura.
 * - Response DTO → Domain Model (datos del backend → negocio)
 * - Domain Model → Request DTO (negocio → formulario/API)
 * - Domain Filter → DTO FilterParams
 *
 * Todos los métodos son estáticos.
 */
export class DtoscompartidossubrecursosViewMapper {

  /**
   * Response DTO → Domain Model
   */
  static toDomain(response: DtoscompartidossubrecursosResponse): Dtoscompartidossubrecursos {
    return {
      id: response.id,
      nombre: response.nombre,
      tipo: response.tipo,
      descripcion: response.descripcion,
      estado: response.estado,
      fechaCreacion: response.fechaCreacion,
    };
  }

  /**
   * ListResponse DTO → Domain PageResult
   */
  static toPageResult(listResponse: DtoscompartidossubrecursosListResponse): DtoscompartidossubrecursosPageResult {
    return {
      data: listResponse.data.map(DtoscompartidossubrecursosViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  /**
   * Domain Create → Request DTO
   */
  static toCreateRequest(model: CreateDtoscompartidossubrecursos): CreateDtoscompartidossubrecursosRequest {
    return {
      nombre: model.nombre,
      tipo: model.tipo,
      descripcion: model.descripcion,
    };
  }

  /**
   * Domain Update → Request DTO
   */
  static toUpdateRequest(model: UpdateDtoscompartidossubrecursos): UpdateDtoscompartidossubrecursosRequest {
    return {
      nombre: model.nombre,
      tipo: model.tipo,
      descripcion: model.descripcion,
      estado: model.estado,
    };
  }

  /**
   * Domain Filter → DTO FilterParams
   */
  static toFilterParams(filter: DtoscompartidossubrecursosFilter): DtoscompartidossubrecursosFilterParams {
    return {
      page: filter.page || 0,
      size: filter.size || 20,
      nombre: filter.nombre,
      tipo: filter.tipo,
    };
  }

  /**
   * Domain Model → vista plana (para formularios)
   */
  static toFormData(model: Dtoscompartidossubrecursos): Record<string, unknown> {
    return {
      // TODO: Mapear modelo de dominio a datos de formulario
      ...model,
    };
  }
}
