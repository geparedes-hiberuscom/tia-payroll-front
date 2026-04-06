import { RubroplantillacontabledialogGatewayPort } from '../../../../application/port/output/RubroplantillacontabledialogGatewayPort';
import { RubroplantillacontabledialogResponse, RubroplantillacontabledialogListResponse, CreateRubroplantillacontabledialogRequest, UpdateRubroplantillacontabledialogRequest, RubroplantillacontabledialogFilterParams } from '../../../input/adapter/dto/RubroplantillacontabledialogDto';
import { RubroplantillacontabledialogApiMapper } from '../mapper/RubroplantillacontabledialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/plantillas-contables/{plantillaId}/rubros';

/**
 * API Gateway Adapter: rubroplantillaContableDialog.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class RubroplantillacontabledialogGatewayAdapter implements RubroplantillacontabledialogGatewayPort {

  async findById(id: string): Promise<RubroplantillacontabledialogResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return RubroplantillacontabledialogApiMapper.toResponse(data);
  }

  async findAll(params?: RubroplantillacontabledialogFilterParams): Promise<RubroplantillacontabledialogListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return RubroplantillacontabledialogApiMapper.toListResponse(data);
  }

  async create(request: CreateRubroplantillacontabledialogRequest): Promise<RubroplantillacontabledialogResponse> {
    const payload = RubroplantillacontabledialogApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return RubroplantillacontabledialogApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdateRubroplantillacontabledialogRequest): Promise<RubroplantillacontabledialogResponse> {
    const payload = RubroplantillacontabledialogApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return RubroplantillacontabledialogApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }

  // TODO: Implementar métodos adicionales según los endpoints de la API
}
