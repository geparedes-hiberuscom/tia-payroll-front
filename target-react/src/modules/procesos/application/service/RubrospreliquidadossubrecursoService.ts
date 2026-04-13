import { RubrospreliquidadossubrecursoGatewayPort } from '../port/output/RubrospreliquidadossubrecursoGatewayPort';
import {
  CreateRubrospreliquidadossubrecursoRequest,
  RubrospreliquidadossubrecursoFilterParams,
  RubrospreliquidadossubrecursoListResponse,
  RubrospreliquidadossubrecursoResponse,
  UpdateRubrospreliquidadossubrecursoRequest,
} from '../../infrastructure/input/adapter/dto/RubrospreliquidadossubrecursoDto';

export class RubrospreliquidadossubrecursoService {
  constructor(private readonly gateway: RubrospreliquidadossubrecursoGatewayPort) {}

  async findById(id: string): Promise<RubrospreliquidadossubrecursoResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.findById(id);
  }

  async findAll(params?: RubrospreliquidadossubrecursoFilterParams): Promise<RubrospreliquidadossubrecursoListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateRubrospreliquidadossubrecursoRequest): Promise<RubrospreliquidadossubrecursoResponse> {
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateRubrospreliquidadossubrecursoRequest): Promise<RubrospreliquidadossubrecursoResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    if (!id.trim()) throw new Error('id es requerido');
    await this.gateway.remove(id);
  }
}
