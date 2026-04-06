/**
 * Gateway Adapter para Tabla IR
 * Implementación usando httpClient (Axios)
 * Invoca los endpoints REST del backend
 */

import { TablaIRGatewayPort } from '../../../application/port/output/TablaIRGatewayPort';
import {
  CreateTablaIRRequest,
  UpdateTablaIRRequest,
  TablaIRResponse,
  TablaIRFilterParams,
  TablaIRPageResponse,
  DeleteResponse,
} from '../../input/adapter/dto/TablaIRDto';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';
import { TablaIRApiMapper } from './mapper/TablaIRApiMapper';

export class TablaIRGatewayAdapter implements TablaIRGatewayPort {
  private readonly baseUrl = '/api/v1/tabla-ir';

  async findAll(filters?: TablaIRFilterParams): Promise<TablaIRPageResponse> {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.page !== undefined) params.append('page', String(filters.page));
      if (filters.size !== undefined) params.append('size', String(filters.size));
      if (filters.anio !== undefined) params.append('anio', String(filters.anio));
      if (filters.tipo) params.append('tipo', filters.tipo);
    }

    const url = params.toString() ? `${this.baseUrl}?${params.toString()}` : this.baseUrl;
    const { data } = await httpClient.get(url);
    return TablaIRApiMapper.toListResponse(data);
  }

  async findById(id: number): Promise<TablaIRResponse> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await httpClient.get(url);
    return TablaIRApiMapper.toResponse(data);
  }

  async create(request: CreateTablaIRRequest): Promise<TablaIRResponse> {
    const payload = TablaIRApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(this.baseUrl, payload);
    return TablaIRApiMapper.toResponse(data);
  }

  async update(id: number, request: UpdateTablaIRRequest): Promise<TablaIRResponse> {
    const url = `${this.baseUrl}/${id}`;
    const payload = TablaIRApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(url, payload);
    return TablaIRApiMapper.toResponse(data);
  }

  async remove(id: number): Promise<DeleteResponse> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await httpClient.delete(url);
    return data as DeleteResponse;
  }
}
