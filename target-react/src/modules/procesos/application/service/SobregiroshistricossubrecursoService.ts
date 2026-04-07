import { SobregiroshistricossubrecursoGatewayPort } from '../port/output/SobregiroshistricossubrecursoGatewayPort';
import {
  CreateSobregiroshistricossubrecursoRequest,
  SobregiroshistricossubrecursoFilterParams,
  SobregiroshistricossubrecursoListResponse,
  SobregiroshistricossubrecursoResponse,
  UpdateSobregiroshistricossubrecursoRequest,
} from '../../infrastructure/input/adapter/dto/SobregiroshistricossubrecursoDto';

export class SobregiroshistricossubrecursoService {
  constructor(private readonly gateway: SobregiroshistricossubrecursoGatewayPort) {}

  async findById(id: string): Promise<SobregiroshistricossubrecursoResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.findById(id);
  }

  async findAll(params?: SobregiroshistricossubrecursoFilterParams): Promise<SobregiroshistricossubrecursoListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateSobregiroshistricossubrecursoRequest): Promise<SobregiroshistricossubrecursoResponse> {
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateSobregiroshistricossubrecursoRequest): Promise<SobregiroshistricossubrecursoResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    if (!id.trim()) throw new Error('id es requerido');
    await this.gateway.remove(id);
  }
}
