/**
 * DTOs para funcionalidad: comparativoNominas.zul (comparativoNominas)
 * Entidades fuente: 5
 * Controladores fuente: 5
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: ComparativoNominasPageResponseDTO — Lista paginada de comparativos de nóminas
// Fuente: ComparativoNominasResponseDTO — Detalle de un registro comparativo de nómina
// Fuente: ComparativoNominasCreateDTO — Datos para crear un comparativo de nóminas
// Fuente: ComparativoNominasUpdateDTO — Datos para actualizar el comparativo
// Fuente: DeleteResponseDTO — Confirmación de eliminación

// ─── Request DTOs ───

export interface CreateComparativonominasRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdateComparativonominasRequest {
  // TODO: Campos del formulario de actualización
}

export interface ComparativonominasFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface ComparativonominasResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface ComparativonominasListResponse {
  data: ComparativonominasResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface ComparativonominasErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
