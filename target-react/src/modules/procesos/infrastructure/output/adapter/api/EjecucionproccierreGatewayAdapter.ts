import { EjecucionproccierreGatewayPort } from '../../../../application/port/output/EjecucionproccierreGatewayPort';
import {
  CierreResultadoResponse,
  CreateEjecucionproccierreRequest,
  EjecucionproccierreFilterParams,
  EjecucionproccierreListResponse,
  EjecucionproccierreResponse,
  ProcesoResultadoResponse,
  UpdateEjecucionproccierreRequest,
} from '../../../input/adapter/dto/EjecucionproccierreDto';
import { EjecucionproccierreApiMapper } from '../mapper/EjecucionproccierreApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/procesos-cierre';

export class EjecucionproccierreGatewayAdapter implements EjecucionproccierreGatewayPort {
  async findById(id: string): Promise<EjecucionproccierreResponse> {
    const { data } = await httpClient.get(BASE_PATH + '/' + id);
    return EjecucionproccierreApiMapper.toResponse(data);
  }

  async findAll(params?: EjecucionproccierreFilterParams): Promise<EjecucionproccierreListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return EjecucionproccierreApiMapper.toListResponse(data);
  }

  async create(_: CreateEjecucionproccierreRequest): Promise<EjecucionproccierreResponse> {
    throw new Error('Use cerrar(id, request) para ejecutar cierre');
  }

  async update(_: string, __: UpdateEjecucionproccierreRequest): Promise<EjecucionproccierreResponse> {
    throw new Error('Use reabrir(id, request) para reabrir cierre');
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(BASE_PATH + '/' + id);
  }

  async cerrar(id: string, request: CreateEjecucionproccierreRequest): Promise<CierreResultadoResponse> {
    const { data } = await httpClient.post(BASE_PATH + '/' + id + '/cerrar', EjecucionproccierreApiMapper.toCreatePayload(request));
    return EjecucionproccierreApiMapper.toCierreResult(data);
  }

  async reabrir(id: string, request: UpdateEjecucionproccierreRequest): Promise<ProcesoResultadoResponse> {
    const { data } = await httpClient.post(BASE_PATH + '/' + id + '/reabrir', EjecucionproccierreApiMapper.toUpdatePayload(request));
    return EjecucionproccierreApiMapper.toProcessResult(data);
  }
}
