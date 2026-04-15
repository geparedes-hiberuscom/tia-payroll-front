export interface CreateProcesosProcesosdialogRequest {
    iidempresa: number;

  iidproceso: number;
  ctipoproceso: string;
  iiddmrol?: number;
  ctipoprocesoic?: string;
  vspejecucion?: string;
  vspreversion?: string;
  vspcontabilizacion?: string;
  vspsalvarhistoricos?: string;
  vidfrecuencia?: string;
  vbusquedacpr?: string;
  caplicasobmesant?: string;
}

export interface UpdateProcesosProcesosdialogRequest {
  iidempresa?: number;
  iidproceso?: number;
  ctipoproceso?: string;
  iiddmrol?: number;
  ctipoprocesoic?: string;
  vspejecucion?: string;
  vspreversion?: string;
  vspcontabilizacion?: string;
  vspsalvarhistoricos?: string;
  vidfrecuencia?: string;
  vbusquedacpr?: string;
  caplicasobmesant?: string;
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
  id: number;
  iidempresa: number;
  iidproceso: number;
  ctipoproceso: string;
  iiddmrol?: number;
  ctipoprocesoic?: string;
  vspejecucion?: string;
  vspreversion?: string;
  vspcontabilizacion?: string;
  vspsalvarhistoricos?: string;
  vidfrecuencia?: string;
  vbusquedacpr?: string;
  caplicasobmesant?: string;
  horaingresoAu?: string;
  fechaIngreso?: string;
  usuariomodificacionAu?: string;
  horamodificacionAu?: string;
}

export interface ProcesosProcesosdialogListResponse {
  data: ProcesosProcesosdialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
