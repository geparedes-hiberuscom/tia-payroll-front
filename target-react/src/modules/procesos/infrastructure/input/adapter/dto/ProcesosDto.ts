export interface ProcesosRequest {
  nombre: string;
  tipoProceso?: string;
  frecuencia?: string;
}

export interface ProcesosResponse {
  id: string;
  nombre: string;
  tipoProceso?: string;
  frecuencia?: string;
}
