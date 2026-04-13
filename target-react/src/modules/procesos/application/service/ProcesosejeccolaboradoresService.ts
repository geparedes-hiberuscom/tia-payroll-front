import { ProcesosejeccolaboradoresGatewayPort } from '../port/output/ProcesosejeccolaboradoresGatewayPort';
import {
  CreateProcesosejeccolaboradoresRequest,
  EjecutarColaboradorRequest,
  EjecucionResultadoResponse,
  ProcesosejeccolaboradoresFilterParams,
  ProcesosejeccolaboradoresListResponse,
  ProcesosejeccolaboradoresResponse,
  RubroPreliquidadoListResponse,
  UpdateProcesosejeccolaboradoresRequest,
} from '../../infrastructure/input/adapter/dto/ProcesosejeccolaboradoresDto';

export class ProcesosejeccolaboradoresService {
  constructor(private readonly gateway: ProcesosejeccolaboradoresGatewayPort) {}

  async findById(id: string): Promise<ProcesosejeccolaboradoresResponse> {
    if (!id.includes('/')) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    return this.gateway.findById(id);
  }

  async findAll(params: ProcesosejeccolaboradoresFilterParams): Promise<ProcesosejeccolaboradoresListResponse> {
    if (params.ejecucionId === undefined) throw new Error('ejecucionId es requerido');
    return this.gateway.findAll(params);
  }

  async create(request: CreateProcesosejeccolaboradoresRequest): Promise<ProcesosejeccolaboradoresResponse> {
    if (!request.ejecucionId) throw new Error('ejecucionId es requerido');
    if (!request.colaboradorId) throw new Error('colaboradorId es requerido');
    if (!request.empresaId) throw new Error('empresaId es requerido');
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateProcesosejeccolaboradoresRequest): Promise<ProcesosejeccolaboradoresResponse> {
    if (!id.includes('/')) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    if (!id.includes('/')) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    await this.gateway.remove(id);
  }

  async listRubros(ejecucionId: string, colaboradorId: string): Promise<RubroPreliquidadoListResponse> {
    if (!ejecucionId.trim() || !colaboradorId.trim()) throw new Error('ejecucionId y colaboradorId son requeridos');
    return this.gateway.listRubros(ejecucionId, colaboradorId);
  }

  async ejecutarColaborador(ejecucionId: string, request: EjecutarColaboradorRequest): Promise<EjecucionResultadoResponse> {
    if (!ejecucionId.trim()) throw new Error('ejecucionId es requerido');
    if (!request.colaboradorId) throw new Error('colaboradorId es requerido');
    if (!request.empresaId) throw new Error('empresaId es requerido');
    return this.gateway.ejecutarColaborador(ejecucionId, request);
  }
}
