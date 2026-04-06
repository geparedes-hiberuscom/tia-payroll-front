import { GestiontablairGestiontablairdialogGatewayPort } from '../../../../application/port/output/GestiontablairGestiontablairdialogGatewayPort';
import { GestiontablairGestiontablairdialogResponse, GestiontablairGestiontablairdialogListResponse, CreateGestiontablairGestiontablairdialogRequest, UpdateGestiontablairGestiontablairdialogRequest, GestiontablairGestiontablairdialogFilterParams } from '../../../input/adapter/dto/GestiontablairGestiontablairdialogDto';
import { GestiontablairGestiontablairdialogApiMapper } from '../mapper/GestiontablairGestiontablairdialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/tabla-ir';

/**
 * API Gateway Adapter: gestionTablaIR.zul / gestionTablaIRDialog.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class GestiontablairGestiontablairdialogGatewayAdapter implements GestiontablairGestiontablairdialogGatewayPort {

  async findById(id: number): Promise<GestiontablairGestiontablairdialogResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return GestiontablairGestiontablairdialogApiMapper.toResponse(data);
  }

  async findAll(params?: GestiontablairGestiontablairdialogFilterParams): Promise<GestiontablairGestiontablairdialogListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return GestiontablairGestiontablairdialogApiMapper.toListResponse(data);
  }

  async create(request: CreateGestiontablairGestiontablairdialogRequest): Promise<GestiontablairGestiontablairdialogResponse> {
    const payload = GestiontablairGestiontablairdialogApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return GestiontablairGestiontablairdialogApiMapper.toResponse(data);
  }

  async update(id: number, request: UpdateGestiontablairGestiontablairdialogRequest): Promise<GestiontablairGestiontablairdialogResponse> {
    const payload = GestiontablairGestiontablairdialogApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return GestiontablairGestiontablairdialogApiMapper.toResponse(data);
  }

  async remove(id: number): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }

}
