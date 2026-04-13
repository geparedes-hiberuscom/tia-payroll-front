import { ProcesosProcesosdialogGatewayPort } from '../port/output/ProcesosProcesosdialogGatewayPort';
import {
  CreateProcesosProcesosdialogRequest,
  ProcesosProcesosdialogFilterParams,
  ProcesosProcesosdialogListResponse,
  ProcesosProcesosdialogResponse,
  UpdateProcesosProcesosdialogRequest,
} from '../../infrastructure/input/adapter/dto/ProcesosProcesosdialogDto';

export class ProcesosProcesosdialogService {
  constructor(private readonly gateway: ProcesosProcesosdialogGatewayPort) {}

  async findById(id: string): Promise<ProcesosProcesosdialogResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.findById(id);
  }

  async findAll(params?: ProcesosProcesosdialogFilterParams): Promise<ProcesosProcesosdialogListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateProcesosProcesosdialogRequest): Promise<ProcesosProcesosdialogResponse> {
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateProcesosProcesosdialogRequest): Promise<ProcesosProcesosdialogResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    if (!id.trim()) throw new Error('id es requerido');
    await this.gateway.remove(id);
  }
}
