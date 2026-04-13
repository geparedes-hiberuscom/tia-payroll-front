import { ProcesosejecucionreversionProcesosejecucionreversiondialogGatewayPort } from '../port/output/ProcesosejecucionreversionProcesosejecucionreversiondialogGatewayPort';
import {
  CreateProcesosejecucionreversionProcesosejecucionreversiondialogRequest,
  ProcesosejecucionreversionProcesosejecucionreversiondialogFilterParams,
  ProcesosejecucionreversionProcesosejecucionreversiondialogListResponse,
  ProcesosejecucionreversionProcesosejecucionreversiondialogResponse,
  ReversionResultadoResponse,
  RevertirProcesoRequest,
  SobreGiroListResponse,
  UpdateProcesosejecucionreversionProcesosejecucionreversiondialogRequest,
} from '../../infrastructure/input/adapter/dto/ProcesosejecucionreversionProcesosejecucionreversiondialogDto';

export class ProcesosejecucionreversionProcesosejecucionreversiondialogService {
  constructor(private readonly gateway: ProcesosejecucionreversionProcesosejecucionreversiondialogGatewayPort) {}

  async findById(id: string): Promise<ProcesosejecucionreversionProcesosejecucionreversiondialogResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.findById(id);
  }

  async findAll(params?: ProcesosejecucionreversionProcesosejecucionreversiondialogFilterParams): Promise<ProcesosejecucionreversionProcesosejecucionreversiondialogListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateProcesosejecucionreversionProcesosejecucionreversiondialogRequest): Promise<ProcesosejecucionreversionProcesosejecucionreversiondialogResponse> {
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateProcesosejecucionreversionProcesosejecucionreversiondialogRequest): Promise<ProcesosejecucionreversionProcesosejecucionreversiondialogResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    if (!id.trim()) throw new Error('id es requerido');
    await this.gateway.remove(id);
  }

  async revertir(id: string, request: RevertirProcesoRequest): Promise<ReversionResultadoResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    if (!request.motivo && request.empresaId === undefined) throw new Error('motivo o empresaId son requeridos para revertir');
    return this.gateway.revertir(id, request);
  }

  async listSobregiros(id: string, colaboradorId?: number, rubroId?: string): Promise<SobreGiroListResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    if (colaboradorId !== undefined && colaboradorId <= 0) throw new Error('colaboradorId debe ser mayor que cero');
    if (rubroId !== undefined && !rubroId.trim()) throw new Error('rubroId invalido');
    return this.gateway.listSobregiros(id, colaboradorId, rubroId);
  }
}
