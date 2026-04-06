/**
 * Gateway Adapter para Ingresos Proyectados
 * Implementación usando httpClient (Axios)
 * Invoca los endpoints REST del backend
 */

import { IngresoProyectadoGatewayPort } from '../../../application/port/output/IngresoProyectadoGatewayPort';
import {
  CreateIngresoProyectadoRequest,
  UpdateIngresoProyectadoRequest,
  GenerarIngresosProyectadosRequest,
  IngresoProyectadoResponse,
  IngresoProyectadoFilterParams,
  IngresoProyectadoListResponse,
  ProcesoResponse,
  DeleteResponse,
} from '../../input/adapter/dto/IngresoProyectadoDto';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';
import { IngresoProyectadoApiMapper } from './mapper/IngresoProyectadoApiMapper';

export class IngresoProyectadoGatewayAdapter implements IngresoProyectadoGatewayPort {
  private readonly baseUrl = '/api/v1/ingresos-proyectados';

  async findAll(filters?: IngresoProyectadoFilterParams): Promise<IngresoProyectadoListResponse> {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.empresaId !== undefined) params.append('empresaId', String(filters.empresaId));
      if (filters.anio !== undefined) params.append('anio', String(filters.anio));
    }

    const url = params.toString() ? `${this.baseUrl}?${params.toString()}` : this.baseUrl;
    const { data } = await httpClient.get(url);
    return IngresoProyectadoApiMapper.toListResponse(data);
  }

  async findById(id: number): Promise<IngresoProyectadoResponse> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await httpClient.get(url);
    return IngresoProyectadoApiMapper.toResponse(data);
  }

  async create(request: CreateIngresoProyectadoRequest): Promise<IngresoProyectadoResponse> {
    const payload = IngresoProyectadoApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(this.baseUrl, payload);
    return IngresoProyectadoApiMapper.toResponse(data);
  }

  async generar(request: GenerarIngresosProyectadosRequest): Promise<ProcesoResponse> {
    const url = `${this.baseUrl}/generar`;
    const payload = IngresoProyectadoApiMapper.toGenerarPayload(request);
    const { data } = await httpClient.post(url, payload);
    return data as ProcesoResponse;
  }

  async update(id: number, request: UpdateIngresoProyectadoRequest): Promise<IngresoProyectadoResponse> {
    const url = `${this.baseUrl}/${id}`;
    const payload = IngresoProyectadoApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(url, payload);
    return IngresoProyectadoApiMapper.toResponse(data);
  }

  async remove(id: number): Promise<DeleteResponse> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await httpClient.delete(url);
    return data as DeleteResponse;
  }
}
