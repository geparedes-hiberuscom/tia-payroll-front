import { Acumulados, CreateAcumulados, UpdateAcumulados, AcumuladosFilter, AcumuladosPageResult } from '../../../../domain/model/Acumulados';
import { AcumuladosResponse, AcumuladosListResponse, CreateAcumuladosRequest, UpdateAcumuladosRequest, AcumuladosFilterParams } from '../dto/AcumuladosDto';

/**
 * View Mapper: acumulados.zul
 *
 * Transforma entre modelos de Dominio y DTOs de la Vista/Infraestructura.
 * - Response DTO → Domain Model (datos del backend → negocio)
 * - Domain Model → Request DTO (negocio → formulario/API)
 * - Domain Filter → DTO FilterParams
 *
 * Todos los métodos son estáticos.
 */
export class AcumuladosViewMapper {

  /**
   * Response DTO → Domain Model
   */
  static toDomain(response: AcumuladosResponse): Acumulados {
    return {
      id: response.id,
      nombre: response.nombre,
      valor: response.valor,
      tipo: response.tipo,
      estado: response.estado,
      fechaCreacion: response.fechaCreacion,
      fechaModificacion: response.fechaModificacion,
    };
  }

  /**
   * ListResponse DTO → Domain PageResult
   */
  static toPageResult(listResponse: AcumuladosListResponse): AcumuladosPageResult {
    return {
      data: listResponse.data.map(AcumuladosViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  /**
   * Domain Create → Request DTO
   */
  static toCreateRequest(model: CreateAcumulados): CreateAcumuladosRequest {
    return {
      nombre: model.nombre,
      valor: model.valor,
      tipo: model.tipo,
    };
  }

  /**
   * Domain Update → Request DTO
   */
  static toUpdateRequest(model: UpdateAcumulados): UpdateAcumuladosRequest {
    return {
      nombre: model.nombre,
      valor: model.valor,
      tipo: model.tipo,
      estado: model.estado,
    };
  }

  /**
   * Domain Filter → DTO FilterParams
   */
  static toFilterParams(filter: AcumuladosFilter): AcumuladosFilterParams {
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
  static toFormData(model: Acumulados): Record<string, unknown> {
    return {
      // TODO: Mapear modelo de dominio a datos de formulario
      ...model,
    };
  }
}
