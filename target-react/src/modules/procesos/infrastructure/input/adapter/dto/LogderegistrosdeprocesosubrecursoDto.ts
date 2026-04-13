export interface CreateLogderegistrosdeprocesosubrecursoRequest {
  ejecucionId: number;
  empresaId?: number;
  colaboradorId?: number;
  tipoProceso?: string;
  ejecuto?: string;
}

export interface UpdateLogderegistrosdeprocesosubrecursoRequest {
  ejecuto?: string;
  observacion?: string;
}

export interface LogderegistrosdeprocesosubrecursoFilterParams {
  ejecucionId: number;
  page?: number;
  size?: number;
  empresaId?: number;
  colaboradorId?: number;
  tipoProceso?: string;
  ejecuto?: string;
}

export interface LogderegistrosdeprocesosubrecursoResponse {
  id: string;
  ejecucionId: number;
  empresaId?: number;
  colaboradorId?: number;
  tipoProceso?: string;
  mensaje?: string;
  ejecuto?: string;
  fechaRegistro?: string;
}

export interface LogderegistrosdeprocesosubrecursoListResponse {
  data: LogderegistrosdeprocesosubrecursoResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
