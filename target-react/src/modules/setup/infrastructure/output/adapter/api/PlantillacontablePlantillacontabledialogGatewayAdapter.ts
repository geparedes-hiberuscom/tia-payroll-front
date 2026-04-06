import { PlantillacontablePlantillacontabledialogGatewayPort } from '../../../../application/port/output/PlantillacontablePlantillacontabledialogGatewayPort';
import { PlantillacontablePlantillacontabledialogResponse, PlantillacontablePlantillacontabledialogListResponse, CreatePlantillacontablePlantillacontabledialogRequest, UpdatePlantillacontablePlantillacontabledialogRequest, PlantillacontablePlantillacontabledialogFilterParams } from '../../../input/adapter/dto/PlantillacontablePlantillacontabledialogDto';
import { PlantillacontablePlantillacontabledialogApiMapper } from '../mapper/PlantillacontablePlantillacontabledialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/setup';

/**
 * API Gateway Adapter: plantillaContable.zul / plantillaContableDialog.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class PlantillacontablePlantillacontabledialogGatewayAdapter implements PlantillacontablePlantillacontabledialogGatewayPort {

  async findById(id: string): Promise<PlantillacontablePlantillacontabledialogResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return PlantillacontablePlantillacontabledialogApiMapper.toResponse(data);
  }

  async findAll(params?: PlantillacontablePlantillacontabledialogFilterParams): Promise<PlantillacontablePlantillacontabledialogListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return PlantillacontablePlantillacontabledialogApiMapper.toListResponse(data);
  }

  async create(request: CreatePlantillacontablePlantillacontabledialogRequest): Promise<PlantillacontablePlantillacontabledialogResponse> {
    const payload = PlantillacontablePlantillacontabledialogApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return PlantillacontablePlantillacontabledialogApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdatePlantillacontablePlantillacontabledialogRequest): Promise<PlantillacontablePlantillacontabledialogResponse> {
    const payload = PlantillacontablePlantillacontabledialogApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return PlantillacontablePlantillacontabledialogApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }

  // TODO: Implementar métodos adicionales según los endpoints de la API
}
