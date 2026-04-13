import { ProcesosejecabrirlqGatewayPort } from '../../../../application/port/output/ProcesosejecabrirlqGatewayPort';
import {
  CreateProcesosejecabrirlqRequest,
  ProcesoResultadoResponse,
  ProcesosejecabrirlqFilterParams,
  ProcesosejecabrirlqListResponse,
  ProcesosejecabrirlqResponse,
  UpdateProcesosejecabrirlqRequest,
} from '../../../input/adapter/dto/ProcesosejecabrirlqDto';
import { ProcesosejecabrirlqApiMapper } from '../mapper/ProcesosejecabrirlqApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/liquidaciones/apertura';

export class ProcesosejecabrirlqGatewayAdapter implements ProcesosejecabrirlqGatewayPort {
  async findById(id: string): Promise<ProcesosejecabrirlqResponse> {
    const [ejecucionId, colaboradorId] = id.split('/');
    if (!ejecucionId || !colaboradorId) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    const { data } = await httpClient.get(BASE_PATH + '/' + ejecucionId + '/' + colaboradorId);
    return ProcesosejecabrirlqApiMapper.toResponse(data);
  }

  async findAll(params?: ProcesosejecabrirlqFilterParams): Promise<ProcesosejecabrirlqListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return ProcesosejecabrirlqApiMapper.toListResponse(data);
  }

  async create(request: CreateProcesosejecabrirlqRequest): Promise<ProcesoResultadoResponse> {
    const { data } = await httpClient.post(BASE_PATH, ProcesosejecabrirlqApiMapper.toCreatePayload(request));
    return ProcesosejecabrirlqApiMapper.toProcessResult(data);
  }

  async update(id: string, request: UpdateProcesosejecabrirlqRequest): Promise<ProcesosejecabrirlqResponse> {
    const [ejecucionId, colaboradorId] = id.split('/');
    if (!ejecucionId || !colaboradorId) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    const { data } = await httpClient.put(BASE_PATH + '/' + ejecucionId + '/' + colaboradorId, ProcesosejecabrirlqApiMapper.toUpdatePayload(request));
    return ProcesosejecabrirlqApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    const [ejecucionId, colaboradorId] = id.split('/');
    if (!ejecucionId || !colaboradorId) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    await httpClient.delete(BASE_PATH + '/' + ejecucionId + '/' + colaboradorId);
  }
}
