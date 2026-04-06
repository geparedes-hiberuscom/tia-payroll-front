/**
 * DTOs para funcionalidad: rubroplantillaContableDialog.zul (rubroplantillaContableDialog)
 * Entidades fuente: 5
 * Controladores fuente: 5
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: RubroPlantillaListResponseDTO — Lista de rubros asociados a la plantilla contable
// Fuente: RubroPlantillaResponseDTO — Detalle de un rubro asignado a la plantilla contable
// Fuente: RubroPlantillaCreateDTO — Datos para asociar un rubro a la plantilla contable
// Fuente: RubroPlantillaUpdateDTO — Datos para actualizar la asociación rubro-plantilla
// Fuente: DeleteResponseDTO — Confirmación de eliminación

// ─── Request DTOs ───

export interface CreateRubroplantillacontabledialogRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdateRubroplantillacontabledialogRequest {
  // TODO: Campos del formulario de actualización
}

export interface RubroplantillacontabledialogFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface RubroplantillacontabledialogResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface RubroplantillacontabledialogListResponse {
  data: RubroplantillacontabledialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface RubroplantillacontabledialogErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
