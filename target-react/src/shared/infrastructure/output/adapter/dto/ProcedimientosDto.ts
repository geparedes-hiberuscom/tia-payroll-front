/**
 * DTOs de API: Procedimientos
 * Endpoint base: /api/v1/procesos
 */

export interface CreateProcedimientoRequestDTO {

  nombreProcedimiento?: string;
  tipo?: string;
}

export interface UpdateProcedimientoRequestDTO {
  
  nombreProcedimiento?: string;
  tipo?: string;
}

export interface ProcedimientosFilterParamsDTO {
  page?: number;
  size?: number;
  tipo?: string;
}

export interface ProcedimientoResponseDTO {
  id: number;
  nombreProcedimiento?: string;
  tipo?: string;
}

export interface ProcedimientosListResponseDTO {
  data: ProcedimientoResponseDTO[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
