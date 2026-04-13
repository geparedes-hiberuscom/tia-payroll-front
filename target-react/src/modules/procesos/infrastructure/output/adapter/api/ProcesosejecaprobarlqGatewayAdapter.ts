import { ProcesosejecaprobarlqGatewayPort } from '../../../../application/port/output/ProcesosejecaprobarlqGatewayPort';
import {
  CreateProcesosejecaprobarlqRequest,
  ProcesoResultadoResponse,
  ProcesosejecaprobarlqFilterParams,
  ProcesosejecaprobarlqListResponse,
  ProcesosejecaprobarlqResponse,
  RechazarLiquidacionRequest,
  UpdateProcesosejecaprobarlqRequest,
} from '../../../input/adapter/dto/ProcesosejecaprobarlqDto';
import { ProcesosejecaprobarlqApiMapper } from '../mapper/ProcesosejecaprobarlqApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/liquidaciones/aprobacion';

export class ProcesosejecaprobarlqGatewayAdapter implements ProcesosejecaprobarlqGatewayPort {
  async findById(id: string): Promise<ProcesosejecaprobarlqResponse> {
    const [ejecucionId, colaboradorId] = id.split('/');
    if (!ejecucionId || !colaboradorId) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    const { data } = await httpClient.get(BASE_PATH + '/' + ejecucionId + '/' + colaboradorId);
    return ProcesosejecaprobarlqApiMapper.toResponse(data);
  }

  async findAll(params?: ProcesosejecaprobarlqFilterParams): Promise<ProcesosejecaprobarlqListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return ProcesosejecaprobarlqApiMapper.toListResponse(data);
  }

  async create(request: CreateProcesosejecaprobarlqRequest): Promise<ProcesoResultadoResponse> {
    const { data } = await httpClient.post(BASE_PATH, ProcesosejecaprobarlqApiMapper.toCreatePayload(request));
    return ProcesosejecaprobarlqApiMapper.toProcessResult(data);
  }

  async update(_: string, __: UpdateProcesosejecaprobarlqRequest): Promise<ProcesosejecaprobarlqResponse> {
    throw new Error('No existe endpoint PUT para aprobacion de liquidaciones');
  }

  async remove(id: string): Promise<void> {
    const [ejecucionId, colaboradorId] = id.split('/');
    if (!ejecucionId || !colaboradorId) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    await httpClient.delete(BASE_PATH + '/' + ejecucionId + '/' + colaboradorId);
  }

  async rechazar(request: RechazarLiquidacionRequest): Promise<ProcesoResultadoResponse> {
    const { data } = await httpClient.post(BASE_PATH + '/rechazar', ProcesosejecaprobarlqApiMapper.toRejectPayload(request));
    return ProcesosejecaprobarlqApiMapper.toProcessResult(data);
  }
}
