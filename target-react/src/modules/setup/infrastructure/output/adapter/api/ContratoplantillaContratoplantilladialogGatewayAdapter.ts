import { ContratoplantillaContratoplantilladialogGatewayPort } from '../../../../application/port/output/ContratoplantillaContratoplantilladialogGatewayPort';
import { ContratoplantillaContratoplantilladialogResponse, ContratoplantillaContratoplantilladialogListResponse, CreateContratoplantillaContratoplantilladialogRequest, UpdateContratoplantillaContratoplantilladialogRequest, ContratoplantillaContratoplantilladialogFilterParams } from '../../../input/adapter/dto/ContratoplantillaContratoplantilladialogDto';
import { ContratoplantillaContratoplantilladialogApiMapper } from '../mapper/ContratoplantillaContratoplantilladialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/en-plantillas';

/**
 * API Gateway Adapter: contratoPlantilla.zul / contratoPlantillaDialog.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class ContratoplantillaContratoplantilladialogGatewayAdapter implements ContratoplantillaContratoplantilladialogGatewayPort {

  async findById(id: string): Promise<ContratoplantillaContratoplantilladialogResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return ContratoplantillaContratoplantilladialogApiMapper.toResponse(data);
  }

  async findAll(params?: ContratoplantillaContratoplantilladialogFilterParams): Promise<ContratoplantillaContratoplantilladialogListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return ContratoplantillaContratoplantilladialogApiMapper.toListResponse(data);
  }

  async create(request: CreateContratoplantillaContratoplantilladialogRequest): Promise<ContratoplantillaContratoplantilladialogResponse> {
    const payload = ContratoplantillaContratoplantilladialogApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return ContratoplantillaContratoplantilladialogApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdateContratoplantillaContratoplantilladialogRequest): Promise<ContratoplantillaContratoplantilladialogResponse> {
    const payload = ContratoplantillaContratoplantilladialogApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return ContratoplantillaContratoplantilladialogApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }

}
