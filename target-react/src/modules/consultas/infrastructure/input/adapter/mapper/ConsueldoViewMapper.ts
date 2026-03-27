import { Consueldo, CreateConsueldo, UpdateConsueldo, ConsueldoFilter, ConsueldoPageResult } from '../../../../domain/model/Consueldo';
import { ConsueldoResponse, ConsueldoListResponse, CreateConsueldoRequest, UpdateConsueldoRequest, ConsueldoFilterParams } from '../dto/ConsueldoDto';

/**
 * View Mapper: conSueldo.zul
 *
 * Transforma entre modelos de Dominio y DTOs de la Vista/Infraestructura.
 * - Response DTO → Domain Model (datos del backend → negocio)
 * - Domain Model → Request DTO (negocio → formulario/API)
 * - Domain Filter → DTO FilterParams
 *
 * Todos los métodos son estáticos.
 */
export class ConsueldoViewMapper {

  /**
   * Response DTO → Domain Model
   */
  static toDomain(response: ConsueldoResponse): Consueldo {
    return {
      id: response.id,
      empresaId: response.empresaId,
      colaboradorId: response.colaboradorId,
      cedula: response.cedula,
      apellidosNombres: response.apellidosNombres,
      sueldo: response.sueldo,
      fechaIngreso: response.fechaIngreso,
      cargo: response.cargo,
      localidad: response.localidad,
      centroCosto: response.centroCosto,
    };
  }

  /**
   * ListResponse DTO → Domain PageResult
   */
  static toPageResult(listResponse: ConsueldoListResponse): ConsueldoPageResult {
    return {
      data: listResponse.data.map(ConsueldoViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  /**
   * Domain Create → Request DTO
   */
  static toCreateRequest(model: CreateConsueldo): CreateConsueldoRequest {
    return {
      empresaId: model.empresaId,
      colaboradorId: model.colaboradorId,
      cedula: model.cedula,
      sueldo: model.sueldo,
    };
  }

  /**
   * Domain Update → Request DTO
   */
  static toUpdateRequest(model: UpdateConsueldo): UpdateConsueldoRequest {
    return {
      sueldo: model.sueldo,
      cargo: model.cargo,
      localidad: model.localidad,
      centroCosto: model.centroCosto,
    };
  }

  /**
   * Domain Filter → DTO FilterParams
   */
  static toFilterParams(filter: ConsueldoFilter): ConsueldoFilterParams {
    return {
      page: filter.page || 0,
      size: filter.size || 20,
      cedula: filter.cedula,
      apellidosNombres: filter.apellidosNombres,
      empresaId: filter.empresaId,
      cargo: filter.cargo,
    };
  }

  /**
   * Domain Model → vista plana (para formularios)
   */
  static toFormData(model: Consueldo): Record<string, unknown> {
    return {
      // TODO: Mapear modelo de dominio a datos de formulario
      ...model,
    };
  }
}
