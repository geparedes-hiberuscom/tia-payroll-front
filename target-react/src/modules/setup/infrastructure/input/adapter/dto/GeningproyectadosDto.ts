/**
 * DTOs para funcionalidad: genIngProyectados.zul (genIngProyectados)
 * Entidades fuente: 6
 * Controladores fuente: 5
 *
 */

// ─── Request DTOs ───

export interface GenerarGeningproyectadosRequest {
  empresaId: number;
  anio: number;
  mesDesde?: number;
  mesHasta?: number;
}

export interface UpdateGeningproyectadosRequest {
  montoProyectado?: number;
  estado?: string;
}

export interface GeningproyectadosFilterParams {
  page?: number;
  size?: number;
  empresaId?: number;
  anio?: number;
}

// ─── Response DTOs ───

export interface GeningproyectadosResponse {
  id: number;
  empresaId: number;
  empresaNombre?: string;
  anio: number;
  mes?: number;
  montoProyectado: number;
  estado?: string;
  fechaGeneracion?: string;
}

export interface ProcesoGeningproyectadosResponse {
  success: boolean;
  message: string;
  registrosGenerados: number;
}

export interface GeningproyectadosListResponse {
  content: GeningproyectadosResponse[];
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
