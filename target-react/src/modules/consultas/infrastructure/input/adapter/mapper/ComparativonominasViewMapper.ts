import { Comparativonominas, CreateComparativonominas, UpdateComparativonominas, ComparativonominasFilter, ComparativonominasPageResult } from '../../../../domain/model/Comparativonominas';
import { ComparativonominasResponse, ComparativonominasListResponse, CreateComparativonominasRequest, UpdateComparativonominasRequest, ComparativonominasFilterParams } from '../dto/ComparativonominasDto';

/**
 * View Mapper: comparativoNominas.zul
 *
 * Transforma entre modelos de Dominio y DTOs de la Vista/Infraestructura.
 * - Response DTO → Domain Model (datos del backend → negocio)
 * - Domain Model → Request DTO (negocio → formulario/API)
 * - Domain Filter → DTO FilterParams
 *
 * Todos los métodos son estáticos.
 */
export class ComparativonominasViewMapper {

  /**
   * Response DTO → Domain Model
   */
  static toDomain(response: ComparativonominasResponse): Comparativonominas {
    return {
      id: response.id,
      nombre: response.nombre,
      descripcion: response.descripcion,
      tipo: response.tipo,
      estado: response.estado,
      fechaCreacion: response.fechaCreacion,
      fechaModificacion: response.fechaModificacion,
    };
  }

  /**
   * ListResponse DTO → Domain PageResult
   */
  static toPageResult(listResponse: ComparativonominasListResponse): ComparativonominasPageResult {
    return {
      data: listResponse.data.map(ComparativonominasViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  /**
   * Domain Create → Request DTO
   */
  static toCreateRequest(model: CreateComparativonominas): CreateComparativonominasRequest {
    return {
      nombre: model.nombre,
      descripcion: model.descripcion,
      tipo: model.tipo,
    };
  }

  /**
   * Domain Update → Request DTO
   */
  static toUpdateRequest(model: UpdateComparativonominas): UpdateComparativonominasRequest {
    return {
      nombre: model.nombre,
      descripcion: model.descripcion,
      tipo: model.tipo,
      estado: model.estado,
    };
  }

  /**
   * Domain Filter → DTO FilterParams
   */
  static toFilterParams(filter: ComparativonominasFilter): ComparativonominasFilterParams {
    return {
      page: filter.page || 0,
      size: filter.size || 20,
      nombre: filter.nombre,
      tipo: filter.tipo,
      estado: filter.estado,
    };
  }

  /**
   * Domain Model → vista plana (para formularios)
   */
  static toFormData(model: Comparativonominas): Record<string, unknown> {
    return {
      // TODO: Mapear modelo de dominio a datos de formulario
      ...model,
    };
  }
}
