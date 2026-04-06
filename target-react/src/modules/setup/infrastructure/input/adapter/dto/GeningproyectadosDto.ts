/**
 * DTOs para funcionalidad: genIngProyectados.zul (genIngProyectados)
 * Entidades fuente: 6
 * Controladores fuente: 5
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: IngresosProyectadosListResponseDTO — Lista de ingresos proyectados
// Fuente: IngresoProyectadoResponseDTO — Detalle de ingreso proyectado
// Fuente: GenerarIngresosProyectadosDTO — Datos para generar ingresos proyectados
// Fuente: ProcesoResponseDTO — Resultado de la ejecución del proceso de generación
// Fuente: IngresoProyectadoUpdateDTO — Datos para actualizar ingreso proyectado
// Fuente: DeleteResponseDTO — Confirmación de eliminación

// ─── Request DTOs ───

export interface CreateGeningproyectadosRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdateGeningproyectadosRequest {
  // TODO: Campos del formulario de actualización
}

export interface GeningproyectadosFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface GeningproyectadosResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface GeningproyectadosListResponse {
  data: GeningproyectadosResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface GeningproyectadosErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
