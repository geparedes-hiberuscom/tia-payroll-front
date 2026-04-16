import { ParametrosParametrosdialogGatewayPort } from '../../../../application/port/output/ParametrosParametrosdialogGatewayPort';
import { ParametrosParametrosdialogResponse, ParametrosParametrosdialogListResponse, CreateParametrosParametrosdialogRequest, UpdateParametrosParametrosdialogRequest, ParametrosParametrosdialogFilterParams } from '../../../input/adapter/dto/ParametrosParametrosdialogDto';
import { ParametrosParametrosdialogApiMapper } from '../mapper/ParametrosParametrosdialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/parametros';

/**
 * API Gateway Adapter: parametros.zul / parametrosDialog.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class ParametrosParametrosdialogGatewayAdapter implements ParametrosParametrosdialogGatewayPort {

  async findById(entorno: string, idParametro: string): Promise<ParametrosParametrosdialogResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${entorno}/${idParametro}`);
    return ParametrosParametrosdialogApiMapper.toResponse(data);
  }

  async findAll(params?: ParametrosParametrosdialogFilterParams): Promise<ParametrosParametrosdialogListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return ParametrosParametrosdialogApiMapper.toListResponse(data);
  }

  async create(request: CreateParametrosParametrosdialogRequest): Promise<ParametrosParametrosdialogResponse> {
    const payload = ParametrosParametrosdialogApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return ParametrosParametrosdialogApiMapper.toResponse(data);
  }

  async update(entorno: string, idParametro: string, request: UpdateParametrosParametrosdialogRequest): Promise<ParametrosParametrosdialogResponse> {
    const payload = ParametrosParametrosdialogApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${entorno}/${idParametro}`, payload);
    return ParametrosParametrosdialogApiMapper.toResponse(data);
  }

  async remove(entorno: string, idParametro: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${entorno}/${idParametro}`);
  }
}
