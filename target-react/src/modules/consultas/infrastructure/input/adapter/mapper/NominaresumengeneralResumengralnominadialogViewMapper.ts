import { NominaresumengeneralResumengralnominadialog, CreateNominaresumengeneralResumengralnominadialog, UpdateNominaresumengeneralResumengralnominadialog, NominaresumengeneralResumengralnominadialogFilter, NominaresumengeneralResumengralnominadialogPageResult } from '../../../../domain/model/NominaresumengeneralResumengralnominadialog';
import { NominaresumengeneralResumengralnominadialogResponse, NominaresumengeneralResumengralnominadialogListResponse, CreateNominaresumengeneralResumengralnominadialogRequest, UpdateNominaresumengeneralResumengralnominadialogRequest, NominaresumengeneralResumengralnominadialogFilterParams } from '../dto/NominaresumengeneralResumengralnominadialogDto';

/**
 * View Mapper: nominaresumenGeneral.zul / ResumenGralNominaDialog.zul
 *
 * Transforma entre modelos de Dominio y DTOs de la Vista/Infraestructura.
 * - Response DTO → Domain Model (datos del backend → negocio)
 * - Domain Model → Request DTO (negocio → formulario/API)
 * - Domain Filter → DTO FilterParams
 *
 * Todos los métodos son estáticos.
 */
export class NominaresumengeneralResumengralnominadialogViewMapper {

  /**
   * Response DTO → Domain Model
   */
  static toDomain(response: NominaresumengeneralResumengralnominadialogResponse): NominaresumengeneralResumengralnominadialog {
    return {
      ejecucionId: response.ejecucionId,
      procesoNombre: response.procesoNombre,
      empresaId: response.empresaId,
      empresaNombre: response.empresaNombre,
      tipo: response.tipo,
      totalIngresos: response.totalIngresos,
      totalEgresos: response.totalEgresos,
      totalNeto: response.totalNeto,
      totalRubros: response.totalRubros,
      totalNoDeducible: response.totalNoDeducible,
      totalColaboradores: response.totalColaboradores,
      periodo: response.periodo,
      fechaInicio: response.fechaInicio,
      fechaFin: response.fechaFin,
    };
  }

  /**
   * ListResponse DTO → Domain PageResult
   */
  static toPageResult(listResponse: NominaresumengeneralResumengralnominadialogListResponse): NominaresumengeneralResumengralnominadialogPageResult {
    return {
      data: listResponse.data.map(NominaresumengeneralResumengralnominadialogViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  /**
   * Domain Create → Request DTO
   */
  static toCreateRequest(model: CreateNominaresumengeneralResumengralnominadialog): CreateNominaresumengeneralResumengralnominadialogRequest {
    return {
      ejecucionId: model.ejecucionId,
      empresaId: model.empresaId || 0,
      tipo: model.tipo,
    };
  }

  /**
   * Domain Update → Request DTO
   */
  static toUpdateRequest(model: UpdateNominaresumengeneralResumengralnominadialog): UpdateNominaresumengeneralResumengralnominadialogRequest {
    return {
      ejecucionId: model.ejecucionId,
      empresaId: model.empresaId,
    };
  }

  /**
   * Domain Filter → DTO FilterParams
   */
  static toFilterParams(filter: NominaresumengeneralResumengralnominadialogFilter): NominaresumengeneralResumengralnominadialogFilterParams {
    return {
      ejecucionId: filter.ejecucionId || 0,
      empresaId: filter.empresaId,
      tipo: filter.tipo,
    };
  }

  /**
   * Domain Model → vista plana (para formularios)
   */
  static toFormData(model: NominaresumengeneralResumengralnominadialog): Record<string, unknown> {
    return {
      // TODO: Mapear modelo de dominio a datos de formulario
      ...model,
    };
  }
}
