export interface CreateProcesosejecucionreversionProcesosejecucionreversiondialogRequest {
  motivo?: string;
  empresaId?: number;
}

export interface UpdateProcesosejecucionreversionProcesosejecucionreversiondialogRequest {
  motivo?: string;
  observacion?: string;
}

export interface RevertirProcesoRequest {
  motivo?: string;
  empresaId?: number;
}

export interface ReversionResultadoResponse {
  success: boolean;
  message: string;
}

export interface SobreGiroResponse {
  ejecucionId: number;
  colaboradorId: number;
  rubroId: string;
  valor?: number;
  descripcion?: string;
}

export interface SobreGiroListResponse {
  items: SobreGiroResponse[];
  total: number;
}

export interface ProcesosejecucionreversionProcesosejecucionreversiondialogFilterParams {
  page?: number;
  size?: number;
  procesoId?: number;
  anio?: number;
  mes?: number;
  reversado?: number;
}

export interface ProcesosejecucionreversionProcesosejecucionreversiondialogResponse {
  id: string;
  procesoId: number;
  anio?: number;
  mes?: number;
  reversado?: boolean;
  motivoReversion?: string;
}

export interface ProcesosejecucionreversionProcesosejecucionreversiondialogListResponse {
  data: ProcesosejecucionreversionProcesosejecucionreversiondialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
