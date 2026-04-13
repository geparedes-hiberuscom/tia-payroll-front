export interface CreateSobregiroshistricossubrecursoRequest {
  ejecucionId: number;
  colaboradorId: number;
  rubroId: string;
}

export interface UpdateSobregiroshistricossubrecursoRequest {
  observacion?: string;
}

export interface SobregiroshistricossubrecursoFilterParams {
  ejecucionId?: number;
  colaboradorId?: number;
  rubroId?: string;
}

export interface SobregiroshistricossubrecursoResponse {
  id: string;
  ejecucionId: number;
  colaboradorId: number;
  rubroId: string;
  valor?: number;
  descripcion?: string;
}

export interface SobregiroshistricossubrecursoListResponse {
  data: SobregiroshistricossubrecursoResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
