export interface CreateRubrospreliquidadossubrecursoRequest {
  ejecucionId: number;
  colaboradorId: number;
  rubroId: string;
  valorSalida01?: number;
  valorSalida02?: number;
}

export interface UpdateRubrospreliquidadossubrecursoRequest {
  valorSalida01?: number;
  valorSalida02?: number;
}

export interface RubrospreliquidadossubrecursoFilterParams {
  page?: number;
  size?: number;
  ejecucionId?: number;
  colaboradorId?: number;
  rubroId?: string;
}

export interface RubrospreliquidadossubrecursoResponse {
  id: string;
  ejecucionId: number;
  colaboradorId: number;
  rubroId: string;
  valorSalida01?: number;
  valorSalida02?: number;
  descripcion?: string;
}

export interface RubrospreliquidadossubrecursoListResponse {
  data: RubrospreliquidadossubrecursoResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
