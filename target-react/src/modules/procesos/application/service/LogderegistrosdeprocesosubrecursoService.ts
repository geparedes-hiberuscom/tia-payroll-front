import { LogderegistrosdeprocesosubrecursoGatewayPort } from '../port/output/LogderegistrosdeprocesosubrecursoGatewayPort';
import {
  CreateLogderegistrosdeprocesosubrecursoRequest,
  LogderegistrosdeprocesosubrecursoFilterParams,
  LogderegistrosdeprocesosubrecursoListResponse,
  LogderegistrosdeprocesosubrecursoResponse,
  UpdateLogderegistrosdeprocesosubrecursoRequest,
} from '../../infrastructure/input/adapter/dto/LogderegistrosdeprocesosubrecursoDto';

export class LogderegistrosdeprocesosubrecursoService {
  constructor(private readonly gateway: LogderegistrosdeprocesosubrecursoGatewayPort) {}

  async findById(id: string): Promise<LogderegistrosdeprocesosubrecursoResponse> {
    if (!id.includes('/')) throw new Error('id compuesto invalido: se esperaba ejecucionId/logId');
    return this.gateway.findById(id);
  }

  async findAll(params: LogderegistrosdeprocesosubrecursoFilterParams): Promise<LogderegistrosdeprocesosubrecursoListResponse> {
    if (params.ejecucionId === undefined) throw new Error('ejecucionId es requerido');
    return this.gateway.findAll(params);
  }

  async create(request: CreateLogderegistrosdeprocesosubrecursoRequest): Promise<LogderegistrosdeprocesosubrecursoResponse> {
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateLogderegistrosdeprocesosubrecursoRequest): Promise<LogderegistrosdeprocesosubrecursoResponse> {
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    await this.gateway.remove(id);
  }

  async clear(ejecucionId: string): Promise<void> {
    if (!ejecucionId.trim()) throw new Error('ejecucionId es requerido');
    await this.gateway.clear(ejecucionId);
  }
}
