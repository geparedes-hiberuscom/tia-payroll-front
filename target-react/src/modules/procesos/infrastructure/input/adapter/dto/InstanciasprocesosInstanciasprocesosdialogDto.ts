export interface CreateInstanciasprocesosInstanciasprocesosdialogRequest {
  procesoId: number;
  instancia?: string;
  anio?: number;
  mes?: number;
}

export interface UpdateInstanciasprocesosInstanciasprocesosdialogRequest {
  instancia?: string;
  fechaInicio?: string;
  fechaFin?: string;
  cerrado?: boolean;
  esFinal?: boolean;
  reversado?: boolean;
}

export interface InstanciasprocesosInstanciasprocesosdialogFilterParams {
  page?: number;
  size?: number;
  procesoId?: number;
  anio?: number;
  mes?: number;
  cerrado?: number;
  esFinal?: number;
  reversado?: number;
}

export interface InstanciasprocesosInstanciasprocesosdialogResponse {
  id: string;
  procesoId: number;
  instancia?: string;
  anio?: number;
  mes?: number;
  fechaInicio?: string;
  fechaFin?: string;
  cerrado?: boolean;
  esFinal?: boolean;
  reversado?: boolean;
}

export interface InstanciasprocesosInstanciasprocesosdialogListResponse {
  data: InstanciasprocesosInstanciasprocesosdialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
