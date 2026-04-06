/**
 * DTOs para funcionalidad: gestionTablaIR.zul / gestionTablaIRDialog.zul (gestionTablaIR_gestionTablaIRDialog)
 * Entidades fuente: 5
 * Controladores fuente: 5
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: TablaIRPageResponseDTO — Lista paginada de rangos de la tabla IR
// Fuente: TablaIRResponseDTO — Detalle de un rango de la tabla IR
// Fuente: TablaIRCreateDTO — Datos para crear un nuevo rango IR
// Fuente: TablaIRUpdateDTO — Datos para actualizar un rango IR existente
// Fuente: DeleteResponseDTO — Confirmación de eliminación

// ─── Request DTOs ───

export interface CreateGestiontablairGestiontablairdialogRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdateGestiontablairGestiontablairdialogRequest {
  // TODO: Campos del formulario de actualización
}

export interface GestiontablairGestiontablairdialogFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface GestiontablairGestiontablairdialogResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface GestiontablairGestiontablairdialogListResponse {
  data: GestiontablairGestiontablairdialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface GestiontablairGestiontablairdialogErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
