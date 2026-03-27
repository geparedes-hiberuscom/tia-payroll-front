import { ConsueldoGatewayPort } from '../../../../application/port/output/ConsueldoGatewayPort';
import { ConsueldoResponse, ConsueldoListResponse, CreateConsueldoRequest, UpdateConsueldoRequest, ConsueldoFilterParams } from '../../../input/adapter/dto/ConsueldoDto';
import { ConsueldoApiMapper } from '../mapper/ConsueldoApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/consulta-sueldos';

/**
 * API Gateway Adapter: conSueldo.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class ConsueldoGatewayAdapter implements ConsueldoGatewayPort {

  async findById(id: string): Promise<ConsueldoResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return ConsueldoApiMapper.toResponse(data);
  }

  async findAll(params?: ConsueldoFilterParams): Promise<ConsueldoListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return ConsueldoApiMapper.toListResponse(data);
  }

  async create(request: CreateConsueldoRequest): Promise<ConsueldoResponse> {
    const payload = ConsueldoApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return ConsueldoApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdateConsueldoRequest): Promise<ConsueldoResponse> {
    const payload = ConsueldoApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return ConsueldoApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }

  // TODO: Implementar métodos adicionales según los endpoints de la API
}
