/**
 * DTOs para funcionalidad: nominaresumenGralCxRubro.zul (nominaresumenGralCxRubro)
 * Entidades fuente: 6
 * Controladores fuente: 5
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: ResumenClasificacionPageResponseDTO — Lista paginada del resumen de nómina por clasificación de rubro
// Fuente: ResumenClasificacionResponseDTO — Resumen detallado de una clasificación de rubro en la nómina
// Fuente: RubrosClasificacionListDTO — Lista de rubros de una clasificación
// Fuente: ExportarResumenClasificacionDTO — Parámetros para la exportación del resumen por clasificación
// Fuente: ExportarResponseDTO — Resultado de la exportación
// Fuente: DeleteResponseDTO — Confirmación de eliminación

// ─── Request DTOs ───

export interface CreateNominaresumengralcxrubroRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdateNominaresumengralcxrubroRequest {
  // TODO: Campos del formulario de actualización
}

export interface NominaresumengralcxrubroFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface NominaresumengralcxrubroResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface NominaresumengralcxrubroListResponse {
  data: NominaresumengralcxrubroResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface NominaresumengralcxrubroErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
