import { EjecucionbotGatewayPort } from '../port/output/EjecucionbotGatewayPort';
import {
  CreateEjecucionbotRequest,
  EjecucionbotFilterParams,
  EjecucionbotListResponse,
  EjecucionbotResponse,
  UpdateEjecucionbotRequest,
} from '../../infrastructure/input/adapter/dto/EjecucionbotDto';

export class EjecucionbotService {
  constructor(private readonly gateway: EjecucionbotGatewayPort) {}

  async findById(id: string): Promise<EjecucionbotResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.findById(id);
  }

  async findAll(params?: EjecucionbotFilterParams): Promise<EjecucionbotListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateEjecucionbotRequest): Promise<EjecucionbotResponse> {
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateEjecucionbotRequest): Promise<EjecucionbotResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    if (!id.trim()) throw new Error('id es requerido');
    await this.gateway.remove(id);
  }
}
