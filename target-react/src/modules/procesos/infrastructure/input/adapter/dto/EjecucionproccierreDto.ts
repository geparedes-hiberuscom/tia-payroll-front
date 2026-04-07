export interface CreateEjecucionproccierreRequest {
  empresaId: number;
  contabilizar?: boolean;
}

export interface UpdateEjecucionproccierreRequest {
  motivo?: string;
}

export interface CierreResultadoResponse {
  success: boolean;
  message: string;
}

export interface ProcesoResultadoResponse {
  success: boolean;
  message: string;
}

export interface EjecucionproccierreFilterParams {
  page?: number;
  size?: number;
  empresaId?: number;
  procesoId?: number;
  anio?: number;
  mes?: number;
  cerrado?: number;
}

export interface EjecucionproccierreResponse {
  id: string;
  procesoId: number;
  empresaId?: number;
  anio?: number;
  mes?: number;
  cerrado?: boolean;
  estado?: string;
}

export interface EjecucionproccierreListResponse {
  data: EjecucionproccierreResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
