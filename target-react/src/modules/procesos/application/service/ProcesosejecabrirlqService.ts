import { ProcesosejecabrirlqGatewayPort } from '../port/output/ProcesosejecabrirlqGatewayPort';
import {
  CreateProcesosejecabrirlqRequest,
  ProcesoResultadoResponse,
  ProcesosejecabrirlqFilterParams,
  ProcesosejecabrirlqListResponse,
  ProcesosejecabrirlqResponse,
  UpdateProcesosejecabrirlqRequest,
} from '../../infrastructure/input/adapter/dto/ProcesosejecabrirlqDto';

export class ProcesosejecabrirlqService {
  constructor(private readonly gateway: ProcesosejecabrirlqGatewayPort) {}

  async findById(id: string): Promise<ProcesosejecabrirlqResponse> {
    if (!id.includes('/')) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    return this.gateway.findById(id);
  }

  async findAll(params?: ProcesosejecabrirlqFilterParams): Promise<ProcesosejecabrirlqListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateProcesosejecabrirlqRequest): Promise<ProcesoResultadoResponse> {
    if (!request.ejecucionId) throw new Error('ejecucionId es requerido');
    if (!request.colaboradorIds.length) throw new Error('Debe enviar al menos un colaborador');
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateProcesosejecabrirlqRequest): Promise<ProcesosejecabrirlqResponse> {
    if (!id.includes('/')) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    if (!id.includes('/')) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    await this.gateway.remove(id);
  }
}
