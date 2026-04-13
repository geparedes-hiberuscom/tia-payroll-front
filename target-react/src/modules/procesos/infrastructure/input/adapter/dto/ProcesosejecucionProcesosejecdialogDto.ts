export interface CreateProcesosejecucionProcesosejecdialogRequest {
  procesoId: number;
  instancia?: string;
  anio?: number;
  mes?: number;
  entornoEjecucionId?: number;
}

export interface UpdateProcesosejecucionProcesosejecdialogRequest {
  instancia?: string;
  fechaInicio?: string;
  fechaFin?: string;
  cerrado?: boolean;
  entornoEjecucionId?: number;
}

export interface EjecutarCalculoRequest {
  entornoEjecucionId?: number;
  empresaId?: number;
}

export interface EjecucionResultadoResponse {
  success: boolean;
  message: string;
}

export interface ProcesosejecucionProcesosejecdialogFilterParams {
  page?: number;
  size?: number;
  procesoId?: number;
  anio?: number;
  mes?: number;
  cerrado?: number;
  entornoEjecucion?: number;
}

export interface ProcesosejecucionProcesosejecdialogResponse {
  id: string;
  procesoId: number;
  instancia?: string;
  anio?: number;
  mes?: number;
  fechaInicio?: string;
  fechaFin?: string;
  cerrado?: boolean;
  entornoEjecucionId?: number;
}

export interface ProcesosejecucionProcesosejecdialogListResponse {
  data: ProcesosejecucionProcesosejecdialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
