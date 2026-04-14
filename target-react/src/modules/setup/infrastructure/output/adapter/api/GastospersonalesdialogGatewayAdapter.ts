import { GastospersonalesdialogGatewayPort } from '../../../../application/port/output/GastospersonalesdialogGatewayPort';
import { GastospersonalesdialogResponse, GastospersonalesdialogListResponse, CreateGastospersonalesdialogRequest, UpdateGastospersonalesdialogRequest, GastospersonalesdialogFilterParams } from '../../../input/adapter/dto/GastospersonalesdialogDto';
import { GastospersonalesdialogApiMapper } from '../mapper/GastospersonalesdialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/gastos-personales';

/**
 * API Gateway Adapter: GastosPersonalesDialog.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class GastospersonalesdialogGatewayAdapter implements GastospersonalesdialogGatewayPort {

  async findById(id: number): Promise<GastospersonalesdialogResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return GastospersonalesdialogApiMapper.toResponse(data);
  }

  async findAll(params?: GastospersonalesdialogFilterParams): Promise<GastospersonalesdialogListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return GastospersonalesdialogApiMapper.toListResponse(data);
  }

  async create(request: CreateGastospersonalesdialogRequest): Promise<GastospersonalesdialogResponse> {
    const payload = GastospersonalesdialogApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return GastospersonalesdialogApiMapper.toResponse(data);
  }

  async update(id: number, request: UpdateGastospersonalesdialogRequest): Promise<GastospersonalesdialogResponse> {
    const payload = GastospersonalesdialogApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return GastospersonalesdialogApiMapper.toResponse(data);
  }

  async remove(id: number): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }

  async exportarExcel(empresaId: number, anio: number): Promise<Blob> {
    const { data } = await httpClient.get(`${BASE_PATH}/export`, {
      params: { empresaId, anio },
      responseType: 'blob',
    });
    return data as Blob;
  }
}
