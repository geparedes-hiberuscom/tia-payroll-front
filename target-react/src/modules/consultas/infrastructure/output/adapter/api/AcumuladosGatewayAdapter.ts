import { AcumuladosGatewayPort } from '../../../../application/port/output/AcumuladosGatewayPort';
import { AcumuladosResponse, AcumuladosListResponse, CreateAcumuladosRequest, UpdateAcumuladosRequest, AcumuladosFilterParams } from '../../../input/adapter/dto/AcumuladosDto';
import { AcumuladosApiMapper } from '../mapper/AcumuladosApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/acumulados';

/**
 * API Gateway Adapter: acumulados.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class AcumuladosGatewayAdapter implements AcumuladosGatewayPort {

  async findById(id: string): Promise<AcumuladosResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return AcumuladosApiMapper.toResponse(data);
  }

  async findAll(params?: AcumuladosFilterParams): Promise<AcumuladosListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return AcumuladosApiMapper.toListResponse(data);
  }

  async create(request: CreateAcumuladosRequest): Promise<AcumuladosResponse> {
    const payload = AcumuladosApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return AcumuladosApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdateAcumuladosRequest): Promise<AcumuladosResponse> {
    const payload = AcumuladosApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return AcumuladosApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }

  // TODO: Implementar métodos adicionales según los endpoints de la API
}
