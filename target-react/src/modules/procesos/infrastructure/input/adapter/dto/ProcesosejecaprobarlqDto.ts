export interface CreateProcesosejecaprobarlqRequest {
  ejecucionId: number;
  colaboradorIds: number[];
}

export interface UpdateProcesosejecaprobarlqRequest {
  estado?: string;
  observacion?: string;
}

export interface RechazarLiquidacionRequest {
  ejecucionId: number;
  colaboradorIds: number[];
}

export interface ProcesoResultadoResponse {
  success: boolean;
  message: string;
}

export interface ProcesosejecaprobarlqFilterParams {
  page?: number;
  size?: number;
  ejecucionId?: number;
  colaboradorId?: number;
  estado?: string;
}

export interface ProcesosejecaprobarlqResponse {
  id: string;
  ejecucionId: number;
  colaboradorId: number;
  estado?: string;
  nombres?: string;
}

export interface ProcesosejecaprobarlqListResponse {
  data: ProcesosejecaprobarlqResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
