import {
  CreateProcesosejecucionProcesosejecdialogRequest,
  EjecutarCalculoRequest,
  EjecucionResultadoResponse,
  ProcesosejecucionProcesosejecdialogFilterParams,
  ProcesosejecucionProcesosejecdialogListResponse,
  ProcesosejecucionProcesosejecdialogResponse,
  UpdateProcesosejecucionProcesosejecdialogRequest,
} from '../../../infrastructure/input/adapter/dto/ProcesosejecucionProcesosejecdialogDto';

export interface ProcesosejecucionProcesosejecdialogGatewayPort {
  findById(id: string): Promise<ProcesosejecucionProcesosejecdialogResponse>;
  findAll(params?: ProcesosejecucionProcesosejecdialogFilterParams): Promise<ProcesosejecucionProcesosejecdialogListResponse>;
  create(request: CreateProcesosejecucionProcesosejecdialogRequest): Promise<ProcesosejecucionProcesosejecdialogResponse>;
  update(id: string, request: UpdateProcesosejecucionProcesosejecdialogRequest): Promise<ProcesosejecucionProcesosejecdialogResponse>;
  remove(id: string): Promise<void>;
  ejecutar(id: string, request: EjecutarCalculoRequest): Promise<EjecucionResultadoResponse>;
}
