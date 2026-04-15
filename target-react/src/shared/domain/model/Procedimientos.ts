/**
 * Dominio: Procedimientos
 * Tipos y modelos de negocio para /api/v1/procesos
 */

export interface Procedimiento {
 
  nombreProcedimiento?: string;
  tipo?: string;
}

export interface ProcedimientosFilter {
  page?: number;
  size?: number;
  tipo?: string;
}

export interface ProcedimientosPageResult {
  items: Procedimiento[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
