/**
 * DTOs para funcionalidad: GastosPersonalesDialog.zul (GastosPersonalesDialog)
 * Entidades fuente: 5
 * Controladores fuente: 5
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: GastosPersonalesListResponseDTO — Lista de configuración de gastos personales
// Fuente: GastosPersonalesResponseDTO — Detalle de configuración de gasto personal deducible
// Fuente: GastosPersonalesCreateDTO — Datos para crear configuración de gasto personal
// Fuente: GastosPersonalesUpdateDTO — Datos para actualizar configuración de gasto personal
// Fuente: DeleteResponseDTO — Confirmación de eliminación

// ─── Request DTOs ───

export interface CreateGastospersonalesdialogRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdateGastospersonalesdialogRequest {
  // TODO: Campos del formulario de actualización
}

export interface GastospersonalesdialogFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface GastospersonalesdialogResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface GastospersonalesdialogListResponse {
  data: GastospersonalesdialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface GastospersonalesdialogErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
