/**
 * DTOs para funcionalidad: DTOs compartidos (subrecursos) (DTOscompartidossubrecursos)
 * Entidades fuente: 5
 * Controladores fuente: 5
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: RubroHistoricoDTO — Detalle de un rubro histórico de nómina (av_py_rubroslhis)
// Fuente: RubroPreLiquidadoDTO — Detalle de un rubro preliquidado de nómina (av_py_rubroslpre)
// Fuente: ClaseRubroListDTO — Lista de clases de rubros
// Fuente: ClaseRubroResumenDTO — Detalle de una clase de rubro (av_py_clasesrubros)
// Fuente: EstructuraOrganizacionalDTO — Detalle de un nodo de la estructura organizacional

// ─── Request DTOs ───

export interface CreateDtoscompartidossubrecursosRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdateDtoscompartidossubrecursosRequest {
  // TODO: Campos del formulario de actualización
}

export interface DtoscompartidossubrecursosFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface DtoscompartidossubrecursosResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface DtoscompartidossubrecursosListResponse {
  data: DtoscompartidossubrecursosResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface DtoscompartidossubrecursosErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
