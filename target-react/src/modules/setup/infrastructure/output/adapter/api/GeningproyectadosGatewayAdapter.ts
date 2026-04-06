import { GeningproyectadosGatewayPort } from '../../../../application/port/output/GeningproyectadosGatewayPort';
import { GeningproyectadosResponse, GeningproyectadosListResponse, CreateGeningproyectadosRequest, UpdateGeningproyectadosRequest, GeningproyectadosFilterParams } from '../../../input/adapter/dto/GeningproyectadosDto';
import { GeningproyectadosApiMapper } from '../mapper/GeningproyectadosApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/ingresos-proyectados';

/**
 * API Gateway Adapter: genIngProyectados.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class GeningproyectadosGatewayAdapter implements GeningproyectadosGatewayPort {

  async findById(id: string): Promise<GeningproyectadosResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return GeningproyectadosApiMapper.toResponse(data);
  }

  async findAll(params?: GeningproyectadosFilterParams): Promise<GeningproyectadosListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return GeningproyectadosApiMapper.toListResponse(data);
  }

  async create(request: CreateGeningproyectadosRequest): Promise<GeningproyectadosResponse> {
    const payload = GeningproyectadosApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return GeningproyectadosApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdateGeningproyectadosRequest): Promise<GeningproyectadosResponse> {
    const payload = GeningproyectadosApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return GeningproyectadosApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }

  // TODO: Implementar métodos adicionales según los endpoints de la API
}
