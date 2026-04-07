import {
  CreateProcesosejecucionreversionProcesosejecucionreversiondialogRequest,
  ProcesosejecucionreversionProcesosejecucionreversiondialogFilterParams,
  ProcesosejecucionreversionProcesosejecucionreversiondialogListResponse,
  ProcesosejecucionreversionProcesosejecucionreversiondialogResponse,
  ReversionResultadoResponse,
  RevertirProcesoRequest,
  SobreGiroListResponse,
  UpdateProcesosejecucionreversionProcesosejecucionreversiondialogRequest,
} from '../../../infrastructure/input/adapter/dto/ProcesosejecucionreversionProcesosejecucionreversiondialogDto';

export interface ProcesosejecucionreversionProcesosejecucionreversiondialogGatewayPort {
  findById(id: string): Promise<ProcesosejecucionreversionProcesosejecucionreversiondialogResponse>;
  findAll(params?: ProcesosejecucionreversionProcesosejecucionreversiondialogFilterParams): Promise<ProcesosejecucionreversionProcesosejecucionreversiondialogListResponse>;
  create(request: CreateProcesosejecucionreversionProcesosejecucionreversiondialogRequest): Promise<ProcesosejecucionreversionProcesosejecucionreversiondialogResponse>;
  update(id: string, request: UpdateProcesosejecucionreversionProcesosejecucionreversiondialogRequest): Promise<ProcesosejecucionreversionProcesosejecucionreversiondialogResponse>;
  remove(id: string): Promise<void>;
  revertir(id: string, request: RevertirProcesoRequest): Promise<ReversionResultadoResponse>;
  listSobregiros(id: string, colaboradorId?: number, rubroId?: string): Promise<SobreGiroListResponse>;
}
