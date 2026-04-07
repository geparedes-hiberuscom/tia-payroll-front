import { EjecucionbotGatewayPort } from '../../../../application/port/output/EjecucionbotGatewayPort';
import {
  CreateEjecucionbotRequest,
  EjecucionbotFilterParams,
  EjecucionbotListResponse,
  EjecucionbotResponse,
  UpdateEjecucionbotRequest,
} from '../../../input/adapter/dto/EjecucionbotDto';
import { EjecucionbotApiMapper } from '../mapper/EjecucionbotApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/ejecucion-bot';

export class EjecucionbotGatewayAdapter implements EjecucionbotGatewayPort {
  async findById(id: string): Promise<EjecucionbotResponse> {
    const { data } = await httpClient.get(BASE_PATH + '/' + id);
    return EjecucionbotApiMapper.toResponse(data);
  }

  async findAll(params?: EjecucionbotFilterParams): Promise<EjecucionbotListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return EjecucionbotApiMapper.toListResponse(data);
  }

  async create(request: CreateEjecucionbotRequest): Promise<EjecucionbotResponse> {
    const { data } = await httpClient.post(BASE_PATH, EjecucionbotApiMapper.toCreatePayload(request));
    return EjecucionbotApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdateEjecucionbotRequest): Promise<EjecucionbotResponse> {
    const { data } = await httpClient.put(BASE_PATH + '/' + id, EjecucionbotApiMapper.toUpdatePayload(request));
    return EjecucionbotApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(BASE_PATH + '/' + id);
  }
}
