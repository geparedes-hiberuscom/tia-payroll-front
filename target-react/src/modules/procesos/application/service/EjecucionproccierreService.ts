import { EjecucionproccierreGatewayPort } from '../port/output/EjecucionproccierreGatewayPort';
import {
  CierreResultadoResponse,
  CreateEjecucionproccierreRequest,
  EjecucionproccierreFilterParams,
  EjecucionproccierreListResponse,
  EjecucionproccierreResponse,
  ProcesoResultadoResponse,
  UpdateEjecucionproccierreRequest,
} from '../../infrastructure/input/adapter/dto/EjecucionproccierreDto';

export class EjecucionproccierreService {
  constructor(private readonly gateway: EjecucionproccierreGatewayPort) {}

  async findById(id: string): Promise<EjecucionproccierreResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.findById(id);
  }

  async findAll(params?: EjecucionproccierreFilterParams): Promise<EjecucionproccierreListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateEjecucionproccierreRequest): Promise<EjecucionproccierreResponse> {
    if (!request.empresaId) throw new Error('empresaId es requerido');
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateEjecucionproccierreRequest): Promise<EjecucionproccierreResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    if (!id.trim()) throw new Error('id es requerido');
    await this.gateway.remove(id);
  }

  async cerrar(id: string, request: CreateEjecucionproccierreRequest): Promise<CierreResultadoResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    if (!request.empresaId) throw new Error('empresaId es requerido');
    return this.gateway.cerrar(id, request);
  }

  async reabrir(id: string, request: UpdateEjecucionproccierreRequest): Promise<ProcesoResultadoResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    if (!request.motivo?.trim()) throw new Error('motivo es requerido');
    return this.gateway.reabrir(id, request);
  }
}
