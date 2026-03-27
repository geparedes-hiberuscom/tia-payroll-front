import { NominaresumengralcxrubroGatewayPort } from '../../../../application/port/output/NominaresumengralcxrubroGatewayPort';
import { NominaresumengralcxrubroResponse, NominaresumengralcxrubroListResponse, CreateNominaresumengralcxrubroRequest, UpdateNominaresumengralcxrubroRequest, NominaresumengralcxrubroFilterParams } from '../../../input/adapter/dto/NominaresumengralcxrubroDto';
import { NominaresumengralcxrubroApiMapper } from '../mapper/NominaresumengralcxrubroApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/nomina-resumen/por-clasificacion';

/**
 * API Gateway Adapter: nominaresumenGralCxRubro.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class NominaresumengralcxrubroGatewayAdapter implements NominaresumengralcxrubroGatewayPort {

  async findById(id: string): Promise<NominaresumengralcxrubroResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return NominaresumengralcxrubroApiMapper.toResponse(data);
  }

  async findAll(params?: NominaresumengralcxrubroFilterParams): Promise<NominaresumengralcxrubroListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return NominaresumengralcxrubroApiMapper.toListResponse(data);
  }

  async create(request: CreateNominaresumengralcxrubroRequest): Promise<NominaresumengralcxrubroResponse> {
    const payload = NominaresumengralcxrubroApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return NominaresumengralcxrubroApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdateNominaresumengralcxrubroRequest): Promise<NominaresumengralcxrubroResponse> {
    const payload = NominaresumengralcxrubroApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return NominaresumengralcxrubroApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }

  // TODO: Implementar métodos adicionales según los endpoints de la API
}
