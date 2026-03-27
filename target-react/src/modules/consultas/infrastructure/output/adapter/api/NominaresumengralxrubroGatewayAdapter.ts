import { NominaresumengralxrubroGatewayPort } from '../../../../application/port/output/NominaresumengralxrubroGatewayPort';
import { NominaresumengralxrubroResponse, NominaresumengralxrubroListResponse, CreateNominaresumengralxrubroRequest, UpdateNominaresumengralxrubroRequest, NominaresumengralxrubroFilterParams } from '../../../input/adapter/dto/NominaresumengralxrubroDto';
import { NominaresumengralxrubroApiMapper } from '../mapper/NominaresumengralxrubroApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/nomina-resumen/por-rubro';

/**
 * API Gateway Adapter: nominaresumenGralxRubro.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class NominaresumengralxrubroGatewayAdapter implements NominaresumengralxrubroGatewayPort {

  async findById(id: string): Promise<NominaresumengralxrubroResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return NominaresumengralxrubroApiMapper.toResponse(data);
  }

  async findAll(params?: NominaresumengralxrubroFilterParams): Promise<NominaresumengralxrubroListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return NominaresumengralxrubroApiMapper.toListResponse(data);
  }

  async create(request: CreateNominaresumengralxrubroRequest): Promise<NominaresumengralxrubroResponse> {
    const payload = NominaresumengralxrubroApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return NominaresumengralxrubroApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdateNominaresumengralxrubroRequest): Promise<NominaresumengralxrubroResponse> {
    const payload = NominaresumengralxrubroApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return NominaresumengralxrubroApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }

  // TODO: Implementar métodos adicionales según los endpoints de la API
}
