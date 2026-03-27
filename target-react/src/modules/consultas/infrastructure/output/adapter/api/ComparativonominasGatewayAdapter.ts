import { ComparativonominasGatewayPort } from '../../../../application/port/output/ComparativonominasGatewayPort';
import { ComparativonominasResponse, ComparativonominasListResponse, CreateComparativonominasRequest, UpdateComparativonominasRequest, ComparativonominasFilterParams } from '../../../input/adapter/dto/ComparativonominasDto';
import { ComparativonominasApiMapper } from '../mapper/ComparativonominasApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/comparativo-nominas';

export class ComparativonominasGatewayAdapter implements ComparativonominasGatewayPort {

  async listarComparativos(params?: ComparativonominasFilterParams): Promise<ComparativonominasListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return ComparativonominasApiMapper.toListResponse(data);
  }

  async obtenerComparativo(id: string): Promise<ComparativonominasResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return ComparativonominasApiMapper.toResponse(data);
  }

  async crearComparativo(request: CreateComparativonominasRequest): Promise<ComparativonominasResponse> {
    const payload = ComparativonominasApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return ComparativonominasApiMapper.toResponse(data);
  }

  async actualizarComparativo(id: string, request: UpdateComparativonominasRequest): Promise<ComparativonominasResponse> {
    const payload = ComparativonominasApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return ComparativonominasApiMapper.toResponse(data);
  }

  async eliminarComparativo(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
