/**
 * Gateway Adapter para Reportes IR/INEC
 * Implementación usando httpClient (Axios)
 * Invoca los endpoints REST del backend
 */

import { ReporteIRINECGatewayPort } from '../../../application/port/output/ReporteIRINECGatewayPort';
import {
  CreateReporteIRINECRequest,
  UpdateReporteIRINECRequest,
  GenerarReporteIRINECRequest,
  ReporteIRINECResponse,
  ReporteIRINECFilterParams,
  ReporteIRINECListResponse,
  ProcesoResponse,
  DeleteResponse,
} from '../../input/adapter/dto/ReporteIRINECDto';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';
import { ReporteIRINECApiMapper } from './mapper/ReporteIRINECApiMapper';

export class ReporteIRINECGatewayAdapter implements ReporteIRINECGatewayPort {
  private readonly baseUrl = '/api/v1/reportes-ir-inec';

  async findAll(filters?: ReporteIRINECFilterParams): Promise<ReporteIRINECListResponse> {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.empresaId !== undefined) params.append('empresaId', String(filters.empresaId));
      if (filters.tipo) params.append('tipo', filters.tipo);
    }

    const url = params.toString() ? `${this.baseUrl}?${params.toString()}` : this.baseUrl;
    const { data } = await httpClient.get(url);
    return ReporteIRINECApiMapper.toListResponse(data);
  }

  async findById(id: number): Promise<ReporteIRINECResponse> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await httpClient.get(url);
    return ReporteIRINECApiMapper.toResponse(data);
  }

  async create(request: CreateReporteIRINECRequest): Promise<ReporteIRINECResponse> {
    const payload = ReporteIRINECApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(this.baseUrl, payload);
    return ReporteIRINECApiMapper.toResponse(data);
  }

  async generar(request: GenerarReporteIRINECRequest): Promise<ProcesoResponse> {
    const url = `${this.baseUrl}/generar`;
    const payload = ReporteIRINECApiMapper.toGenerarPayload(request);
    const { data } = await httpClient.post(url, payload);
    return data as ProcesoResponse;
  }

  async update(id: number, request: UpdateReporteIRINECRequest): Promise<ReporteIRINECResponse> {
    const url = `${this.baseUrl}/${id}`;
    const payload = ReporteIRINECApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(url, payload);
    return ReporteIRINECApiMapper.toResponse(data);
  }

  async remove(id: number): Promise<DeleteResponse> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await httpClient.delete(url);
    return data as DeleteResponse;
  }
}
