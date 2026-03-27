/**
 * DTOs para funcionalidad: conSueldo.zul (conSueldo)
 * Entidades fuente: 6
 * Controladores fuente: 5
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: ConsultaSueldoPageResponseDTO — Lista paginada de sueldos de colaboradores
// Fuente: ConsultaSueldoResponseDTO — Detalle del sueldo de un colaborador
// Fuente: EstructuraOrganizacionalListDTO — Lista de nodos de la estructura organizacional
// Fuente: ExportarConsultaSueldoDTO — Filtros para la exportación de sueldos
// Fuente: ExportarResponseDTO — Resultado de la exportación
// Fuente: DeleteResponseDTO — Confirmación de eliminación

// ─── Request DTOs ───

export interface CreateConsueldoRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdateConsueldoRequest {
  // TODO: Campos del formulario de actualización
}

export interface ConsueldoFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface ConsueldoResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface ConsueldoListResponse {
  data: ConsueldoResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface ConsueldoErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
