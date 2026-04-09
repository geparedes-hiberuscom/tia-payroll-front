import {
  Clasesrubro,
  ClasesrubroFilter,
  ClasesrubroPageResult,
} from "../../../../domain/model/Clasesrubro";
import {
  ClasesrubroFilterParams,
  ClasesrubroListResponse,
  ClasesrubroResponse,
} from "../dto/ClasesrubroDto";

/**
 * View Mapper: clases-rubro
 * Transforma DTOs de input adapter a modelos de dominio.
 */
export class ClasesrubroViewMapper {
  static toDomain(response: ClasesrubroResponse): Clasesrubro {
    return {
      id: response.vidclase,
      nombre: response.vclase,
      codigo: response.vidclasepadre,
      descripcion: response.creportenomina,
      estado: response.cocultar,
    };
  }

  static toPageResult(response: ClasesrubroListResponse): ClasesrubroPageResult {
    return {
      items: response.content.map(ClasesrubroViewMapper.toDomain),
      totalElements: response.totalElements,
      totalPages: response.totalPages,
      currentPage: response.number ?? 0,
    };
  }

  static toFilterParams(filter: ClasesrubroFilter): ClasesrubroFilterParams {
    return {
      page: filter.page,
      size: filter.size,
      search: filter.search,
    };
  }
}
