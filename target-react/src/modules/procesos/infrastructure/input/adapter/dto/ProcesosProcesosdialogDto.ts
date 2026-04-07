export interface CreateProcesosProcesosdialogRequest {
  empresaId: number;
  tipoProceso: string;
  frecuencia?: string;
  rolId?: number;
  spEjecucion?: string;
  spReversion?: string;
  spContabilizacion?: string;
  spSalvarHistoricos?: string;
  busquedaCpr?: string;
  procesoSecurityId?: number;
  nombre?: string;
  descripcion?: string;
}

export interface UpdateProcesosProcesosdialogRequest {
  empresaId?: number;
  tipoProceso?: string;
  frecuencia?: string;
  rolId?: number;
  spEjecucion?: string;
  spReversion?: string;
  spContabilizacion?: string;
  spSalvarHistoricos?: string;
  busquedaCpr?: string;
  procesoSecurityId?: number;
  nombre?: string;
  descripcion?: string;
  activo?: boolean;
}

export interface ProcesosProcesosdialogFilterParams {
  page?: number;
  size?: number;
  empresaId?: number;
  tipoProceso?: string;
  frecuencia?: string;
  rolId?: number;
}

export interface ProcesosProcesosdialogResponse {
  id: string;
  empresaId: number;
  tipoProceso: string;
  frecuencia?: string;
  rolId?: number;
  spEjecucion?: string;
  spReversion?: string;
  spContabilizacion?: string;
  spSalvarHistoricos?: string;
  busquedaCpr?: string;
  procesoSecurityId?: number;
  nombre?: string;
  descripcion?: string;
  activo?: boolean;
}

export interface ProcesosProcesosdialogListResponse {
  data: ProcesosProcesosdialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
