export interface CreateEjecucionbotRequest {
  colaboradorId: number;
  codigoActa?: string;
  tipoPago?: string;
}

export interface UpdateEjecucionbotRequest {
  codigoActa?: string;
  tipoPago?: string;
  estado?: string;
}

export interface EjecucionbotFilterParams {
  page?: number;
  size?: number;
  colaboradorId?: number;
  tipoPago?: string;
  estado?: string;
}

export interface EjecucionbotResponse {
  id: string;
  colaboradorId: number;
  codigoActa?: string;
  tipoPago?: string;
  estado?: string;
  fechaEjecucion?: string;
}

export interface EjecucionbotListResponse {
  data: EjecucionbotResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
