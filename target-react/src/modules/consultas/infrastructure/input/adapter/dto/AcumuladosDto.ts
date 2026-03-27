/**
 * DTOs para funcionalidad: acumulados.zul (acumulados)
 * Entidades fuente: 5
 * Controladores fuente: 5
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: AcumuladoPageResponseDTO — Lista paginada de acumulados de nómina
// Fuente: AcumuladoResponseDTO — Detalle de un acumulado de nómina (vista av_py_acumulados_v)
// Fuente: AcumuladoCreateDTO — Datos para crear un acumulado de nómina
// Fuente: AcumuladoUpdateDTO — Datos para actualizar el acumulado
// Fuente: DeleteResponseDTO — Confirmación de eliminación

// ─── Request DTOs ───

export interface CreateAcumuladosRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdateAcumuladosRequest {
  // TODO: Campos del formulario de actualización
}

export interface AcumuladosFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface AcumuladosResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface AcumuladosListResponse {
  data: AcumuladosResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface AcumuladosErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
