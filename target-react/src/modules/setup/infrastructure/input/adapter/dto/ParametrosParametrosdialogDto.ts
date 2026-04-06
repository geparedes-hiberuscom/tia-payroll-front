/**
 * DTOs para funcionalidad: parametros.zul / parametrosDialog.zul (parametros_parametrosDialog)
 * Entidades fuente: 5
 * Controladores fuente: 5
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: ParametroPageResponseDTO — Lista paginada de parámetros del sistema
// Fuente: ParametroResponseDTO — Detalle completo de un parámetro del sistema
// Fuente: ParametroCreateDTO — Datos para crear un nuevo parámetro
// Fuente: ParametroUpdateDTO — Datos para actualizar un parámetro existente
// Fuente: DeleteResponseDTO — Confirmación de eliminación

// ─── Request DTOs ───

export interface CreateParametrosParametrosdialogRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdateParametrosParametrosdialogRequest {
  // TODO: Campos del formulario de actualización
}

export interface ParametrosParametrosdialogFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface ParametrosParametrosdialogResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface ParametrosParametrosdialogListResponse {
  data: ParametrosParametrosdialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface ParametrosParametrosdialogErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
