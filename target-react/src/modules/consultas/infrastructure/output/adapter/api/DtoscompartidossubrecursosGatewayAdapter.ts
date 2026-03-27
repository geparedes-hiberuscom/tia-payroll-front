import { DtoscompartidossubrecursosGatewayPort } from '../../../../application/port/output/DtoscompartidossubrecursosGatewayPort';
import { DtoscompartidossubrecursosResponse, DtoscompartidossubrecursosListResponse, CreateDtoscompartidossubrecursosRequest, UpdateDtoscompartidossubrecursosRequest, DtoscompartidossubrecursosFilterParams } from '../../../input/adapter/dto/DtoscompartidossubrecursosDto';
import { DtoscompartidossubrecursosApiMapper } from '../mapper/DtoscompartidossubrecursosApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/consultas';

/**
 * API Gateway Adapter: DTOs compartidos (subrecursos)
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class DtoscompartidossubrecursosGatewayAdapter implements DtoscompartidossubrecursosGatewayPort {

  async findById(id: string): Promise<DtoscompartidossubrecursosResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return DtoscompartidossubrecursosApiMapper.toResponse(data);
  }

  async findAll(params?: DtoscompartidossubrecursosFilterParams): Promise<DtoscompartidossubrecursosListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return DtoscompartidossubrecursosApiMapper.toListResponse(data);
  }

  async create(request: CreateDtoscompartidossubrecursosRequest): Promise<DtoscompartidossubrecursosResponse> {
    const payload = DtoscompartidossubrecursosApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return DtoscompartidossubrecursosApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdateDtoscompartidossubrecursosRequest): Promise<DtoscompartidossubrecursosResponse> {
    const payload = DtoscompartidossubrecursosApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return DtoscompartidossubrecursosApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }

  // TODO: Implementar métodos adicionales según los endpoints de la API
}
