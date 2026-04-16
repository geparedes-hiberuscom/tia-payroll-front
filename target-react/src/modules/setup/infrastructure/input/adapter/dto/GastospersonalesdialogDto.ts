/**
 * DTOs para funcionalidad: GastosPersonalesDialog.zul (GastosPersonalesDialog)
 * Entidades fuente: 5
 * Controladores fuente: 5
 */

// ─── Request DTOs ───

export interface CreateGastospersonalesdialogRequest {
  empresaId: number;
  anio: number;
  descripcion: string;
  montoMaximo?: number;
  porcentaje?: number;
}

export interface UpdateGastospersonalesdialogRequest {
  descripcion?: string;
  montoMaximo?: number;
  porcentaje?: number;
}

export interface GastospersonalesdialogFilterParams {
  page?: number;
  size?: number;
  empresaId?: number;
  anio?: number;
}

// ─── Response DTOs ───

export interface GastospersonalesdialogResponse {
  id: number;
  empresaId: number;
  empresaNombre?: string;
  anio: number;
  descripcion: string;
  montoMaximo?: number;
  porcentaje?: number;
  estado?: string;
}

export interface GastospersonalesdialogListResponse {
  content: GastospersonalesdialogResponse[];
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
