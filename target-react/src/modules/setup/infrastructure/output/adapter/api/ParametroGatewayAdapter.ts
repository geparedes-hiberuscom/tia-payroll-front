/**
 * Gateway Adapter para Parámetros
 * Implementación usando httpClient (Axios)
 * Invoca los endpoints REST del backend
 */

import { ParametroGatewayPort } from '../../../application/port/output/ParametroGatewayPort';
import {
  CreateParametroRequest,
  UpdateParametroRequest,
  ParametroResponse,
  ParametroFilterParams,
  ParametroPageResponse,
  DeleteResponse,
} from '../../input/adapter/dto/ParametroDto';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';
import { ParametroApiMapper } from './mapper/ParametroApiMapper';

export class ParametroGatewayAdapter implements ParametroGatewayPort {
  private readonly baseUrl = '/api/v1/parametros';

  async findAll(filters?: ParametroFilterParams): Promise<ParametroPageResponse> {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.page !== undefined) params.append('page', String(filters.page));
      if (filters.size !== undefined) params.append('size', String(filters.size));
      if (filters.idParametro) params.append('idParametro', filters.idParametro);
      if (filters.nombre) params.append('nombre', filters.nombre);
      if (filters.observaciones) params.append('observaciones', filters.observaciones);
    }

    const url = params.toString() ? `${this.baseUrl}?${params.toString()}` : this.baseUrl;
    const { data } = await httpClient.get(url);
    return ParametroApiMapper.toListResponse(data);
  }

  async findById(entorno: string, idParametro: string): Promise<ParametroResponse> {
    const url = `${this.baseUrl}/${entorno}/${idParametro}`;
    const { data } = await httpClient.get(url);
    return ParametroApiMapper.toResponse(data);
  }

  async create(request: CreateParametroRequest): Promise<ParametroResponse> {
    const payload = ParametroApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(this.baseUrl, payload);
    return ParametroApiMapper.toResponse(data);
  }

  async update(entorno: string, idParametro: string, request: UpdateParametroRequest): Promise<ParametroResponse> {
    const url = `${this.baseUrl}/${entorno}/${idParametro}`;
    const payload = ParametroApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(url, payload);
    return ParametroApiMapper.toResponse(data);
  }

  async remove(entorno: string, idParametro: string): Promise<DeleteResponse> {
    const url = `${this.baseUrl}/${entorno}/${idParametro}`;
    const { data } = await httpClient.delete(url);
    return data as DeleteResponse;
  }
}
