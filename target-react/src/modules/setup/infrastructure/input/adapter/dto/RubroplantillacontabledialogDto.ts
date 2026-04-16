/**
 * DTOs para funcionalidad: rubroplantillaContableDialog.zul (rubroplantillaContableDialog)
 * Entidades fuente: 5
 * Controladores fuente: 5
 */

// ─── Request DTOs ───

export interface CreateRubroplantillacontabledialogRequest {
  procesoId: number;
  rubroId: string;
  cuenta: string;
  debeHaber: string;
  subcuenta?: string;
  auxiliar?: string;
  distribucionCosto?: string;
  dimensionId?: number;
}

export interface UpdateRubroplantillacontabledialogRequest {
  cuenta?: string;
  subcuenta?: string;
  auxiliar?: string;
  debeHaber?: string;
  distribucionCosto?: string;
  dimensionId?: number;
}

export interface RubroplantillacontabledialogFilterParams {
  page?: number;
  size?: number;
  procesoId?: number;
  rubroId?: string;
}

// ─── Response DTOs ───

export interface RubroplantillacontabledialogResponse {
  id: number;
  procesoId: number;
  rubroId: string;
  rubroNombre?: string;
  cuenta: string;
  subcuenta?: string;
  debeHaber: string;
  auxiliar?: string;
  distribucionCosto?: string;
  dimensionId?: number;
  dimensionNombre?: string;
}

export interface RubroplantillacontabledialogListResponse {
  content: RubroplantillacontabledialogResponse[];
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
