import { ProcesosejecaprobarlqGatewayPort } from '../port/output/ProcesosejecaprobarlqGatewayPort';
import {
  CreateProcesosejecaprobarlqRequest,
  ProcesoResultadoResponse,
  ProcesosejecaprobarlqFilterParams,
  ProcesosejecaprobarlqListResponse,
  ProcesosejecaprobarlqResponse,
  RechazarLiquidacionRequest,
  UpdateProcesosejecaprobarlqRequest,
} from '../../infrastructure/input/adapter/dto/ProcesosejecaprobarlqDto';

export class ProcesosejecaprobarlqService {
  constructor(private readonly gateway: ProcesosejecaprobarlqGatewayPort) {}

  async findById(id: string): Promise<ProcesosejecaprobarlqResponse> {
    if (!id.includes('/')) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    return this.gateway.findById(id);
  }

  async findAll(params?: ProcesosejecaprobarlqFilterParams): Promise<ProcesosejecaprobarlqListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateProcesosejecaprobarlqRequest): Promise<ProcesoResultadoResponse> {
    if (!request.ejecucionId) throw new Error('ejecucionId es requerido');
    if (!request.colaboradorIds.length) throw new Error('Debe enviar al menos un colaborador');
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateProcesosejecaprobarlqRequest): Promise<ProcesosejecaprobarlqResponse> {
    if (!id.includes('/')) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    if (!id.includes('/')) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    await this.gateway.remove(id);
  }

  async rechazar(request: RechazarLiquidacionRequest): Promise<ProcesoResultadoResponse> {
    if (!request.ejecucionId) throw new Error('ejecucionId es requerido');
    if (!request.colaboradorIds.length) throw new Error('Debe enviar al menos un colaborador');
    return this.gateway.rechazar(request);
  }
}
