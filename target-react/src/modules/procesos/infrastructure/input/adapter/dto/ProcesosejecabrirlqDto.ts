export interface CreateProcesosejecabrirlqRequest {
  ejecucionId: number;
  colaboradorIds: number[];
}

export interface UpdateProcesosejecabrirlqRequest {
  cerrado?: string;
  estado?: string;
}

export interface ProcesoResultadoResponse {
  success: boolean;
  message: string;
}

export interface ProcesosejecabrirlqFilterParams {
  page?: number;
  size?: number;
  ejecucionId?: number;
  colaboradorId?: number;
  cerrado?: string;
  estado?: string;
}

export interface ProcesosejecabrirlqResponse {
  id: string;
  ejecucionId: number;
  colaboradorId: number;
  estado?: string;
  cerrado?: string;
  nombres?: string;
}

export interface ProcesosejecabrirlqListResponse {
  data: ProcesosejecabrirlqResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
