/**
 * Gateway Adapter para Gastos Personales
 * Implementación usando httpClient (Axios)
 * Invoca los endpoints REST del backend
 */

import { GastosPersonalesGatewayPort } from '../../../application/port/output/GastosPersonalesGatewayPort';
import {
  CreateGastosPersonalesRequest,
  UpdateGastosPersonalesRequest,
  GastosPersonalesResponse,
  GastosPersonalesFilterParams,
  GastosPersonalesListResponse,
  DeleteResponse,
} from '../../input/adapter/dto/GastosPersonalesDto';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';
import { GastosPersonalesApiMapper } from './mapper/GastosPersonalesApiMapper';

export class GastosPersonalesGatewayAdapter implements GastosPersonalesGatewayPort {
  private readonly baseUrl = '/api/v1/gastos-personales';

  async findAll(filters?: GastosPersonalesFilterParams): Promise<GastosPersonalesListResponse> {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.empresaId !== undefined) params.append('empresaId', String(filters.empresaId));
      if (filters.anio !== undefined) params.append('anio', String(filters.anio));
    }

    const url = params.toString() ? `${this.baseUrl}?${params.toString()}` : this.baseUrl;
    const { data } = await httpClient.get(url);
    return GastosPersonalesApiMapper.toListResponse(data);
  }

  async findById(id: number): Promise<GastosPersonalesResponse> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await httpClient.get(url);
    return GastosPersonalesApiMapper.toResponse(data);
  }

  async create(request: CreateGastosPersonalesRequest): Promise<GastosPersonalesResponse> {
    const payload = GastosPersonalesApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(this.baseUrl, payload);
    return GastosPersonalesApiMapper.toResponse(data);
  }

  async update(id: number, request: UpdateGastosPersonalesRequest): Promise<GastosPersonalesResponse> {
    const url = `${this.baseUrl}/${id}`;
    const payload = GastosPersonalesApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(url, payload);
    return GastosPersonalesApiMapper.toResponse(data);
  }

  async remove(id: number): Promise<DeleteResponse> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await httpClient.delete(url);
    return data as DeleteResponse;
  }
}
