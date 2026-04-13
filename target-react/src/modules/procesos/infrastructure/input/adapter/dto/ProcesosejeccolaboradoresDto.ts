export interface CreateProcesosejeccolaboradoresRequest {
  ejecucionId: number;
  colaboradorId: number;
  empresaId: number;
}

export interface UpdateProcesosejeccolaboradoresRequest {
  estado?: string;
  observacion?: string;
}

export interface EjecutarColaboradorRequest {
  colaboradorId: number;
  empresaId: number;
}

export interface EjecucionResultadoResponse {
  success: boolean;
  message: string;
}

export interface RubroPreliquidadoItem {
  rubroId: string;
  valor?: number;
  descripcion?: string;
}

export interface RubroPreliquidadoListResponse {
  items: RubroPreliquidadoItem[];
  total: number;
}

export interface ProcesosejeccolaboradoresFilterParams {
  page?: number;
  size?: number;
  ejecucionId?: number;
  colaboradorId?: number;
  cedula?: string;
  empresaId?: number;
}

export interface ProcesosejeccolaboradoresResponse {
  id: string;
  ejecucionId: number;
  colaboradorId: number;
  cedula?: string;
  nombres?: string;
  empresaId?: number;
  totalIngresos?: number;
  totalEgresos?: number;
  totalNeto?: number;
}

export interface ProcesosejeccolaboradoresListResponse {
  data: ProcesosejeccolaboradoresResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
