/**
 * Gateway Adapter para Plantillas Contables
 * Implementación usando httpClient (Axios)
 * Invoca los endpoints REST del backend
 */

import { PlantillaContableGatewayPort } from '../../../application/port/output/PlantillaContableGatewayPort';
import {
  CreatePlantillaContableRequest,
  UpdatePlantillaContableRequest,
  PlantillaContableResponse,
  PlantillaContableFilterParams,
  PlantillaContablePageResponse,
  DeleteResponse,
} from '../../input/adapter/dto/PlantillaContableDto';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';
import { PlantillaContableApiMapper } from './mapper/PlantillaContableApiMapper';

export class PlantillaContableGatewayAdapter implements PlantillaContableGatewayPort {
  private readonly baseUrl = '/api/v1/plantillas-contables';

  async findAll(filters?: PlantillaContableFilterParams): Promise<PlantillaContablePageResponse> {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.page !== undefined) params.append('page', String(filters.page));
      if (filters.size !== undefined) params.append('size', String(filters.size));
      if (filters.procesoId !== undefined) params.append('procesoId', String(filters.procesoId));
      if (filters.rubroId) params.append('rubroId', filters.rubroId);
      if (filters.cuenta) params.append('cuenta', filters.cuenta);
      if (filters.localidadId !== undefined) params.append('localidadId', String(filters.localidadId));
    }

    const url = params.toString() ? `${this.baseUrl}?${params.toString()}` : this.baseUrl;
    const { data } = await httpClient.get(url);
    return PlantillaContableApiMapper.toListResponse(data);
  }

  async findById(id: number): Promise<PlantillaContableResponse> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await httpClient.get(url);
    return PlantillaContableApiMapper.toResponse(data);
  }

  async create(request: CreatePlantillaContableRequest): Promise<PlantillaContableResponse> {
    const payload = PlantillaContableApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(this.baseUrl, payload);
    return PlantillaContableApiMapper.toResponse(data);
  }

  async update(id: number, request: UpdatePlantillaContableRequest): Promise<PlantillaContableResponse> {
    const url = `${this.baseUrl}/${id}`;
    const payload = PlantillaContableApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(url, payload);
    return PlantillaContableApiMapper.toResponse(data);
  }

  async remove(id: number): Promise<DeleteResponse> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await httpClient.delete(url);
    return data as DeleteResponse;
  }
}
