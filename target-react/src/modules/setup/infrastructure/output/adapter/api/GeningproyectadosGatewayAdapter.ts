import { GeningproyectadosGatewayPort } from '../../../../application/port/output/GeningproyectadosGatewayPort';
import { GeningproyectadosResponse, GeningproyectadosListResponse, GenerarGeningproyectadosRequest, ProcesoGeningproyectadosResponse, UpdateGeningproyectadosRequest, GeningproyectadosFilterParams } from '../../../input/adapter/dto/GeningproyectadosDto';
import { GeningproyectadosApiMapper } from '../mapper/GeningproyectadosApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/ingresos-proyectados';

/**
 * API Gateway Adapter: genIngProyectados.zul
 */
export class GeningproyectadosGatewayAdapter implements GeningproyectadosGatewayPort {

  async findById(id: number): Promise<GeningproyectadosResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return GeningproyectadosApiMapper.toResponse(data);
  }

  async findAll(params?: GeningproyectadosFilterParams): Promise<GeningproyectadosListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return GeningproyectadosApiMapper.toListResponse(data);
  }

  async generar(request: GenerarGeningproyectadosRequest): Promise<ProcesoGeningproyectadosResponse> {
    const { data } = await httpClient.post(`${BASE_PATH}/generar`, request);
    return data as ProcesoGeningproyectadosResponse;
  }

  async update(id: number, request: UpdateGeningproyectadosRequest): Promise<GeningproyectadosResponse> {
    const payload = GeningproyectadosApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return GeningproyectadosApiMapper.toResponse(data);
  }

  async remove(id: number): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
