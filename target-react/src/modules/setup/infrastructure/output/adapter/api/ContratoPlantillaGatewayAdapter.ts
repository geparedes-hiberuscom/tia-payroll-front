/**
 * Gateway Adapter para Plantillas de Contratos
 * Implementación usando httpClient (Axios)
 * Invoca los endpoints REST del backend
 */

import { ContratoPlantillaGatewayPort } from '../../../application/port/output/ContratoPlantillaGatewayPort';
import {
  CreateContratoPlantillaRequest,
  UpdateContratoPlantillaRequest,
  ContratoPlantillaResponse,
  ContratoPlantillaFilterParams,
  ContratoPlantillaPageResponse,
  ArchivoPlantillaUploadRequest,
  ArchivoPlantillaUploadResponse,
  DeleteResponse,
} from '../../input/adapter/dto/ContratoPlantillaDto';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';
import { ContratoPlantillaApiMapper } from './mapper/ContratoPlantillaApiMapper';

export class ContratoPlantillaGatewayAdapter implements ContratoPlantillaGatewayPort {
  private readonly baseUrl = '/api/v1/contratos-plantilla';

  async findAll(filters?: ContratoPlantillaFilterParams): Promise<ContratoPlantillaPageResponse> {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.page !== undefined) params.append('page', String(filters.page));
      if (filters.size !== undefined) params.append('size', String(filters.size));
      if (filters.nombre) params.append('nombre', filters.nombre);
      if (filters.descripcion) params.append('descripcion', filters.descripcion);
    }

    const url = params.toString() ? `${this.baseUrl}?${params.toString()}` : this.baseUrl;
    const { data } = await httpClient.get(url);
    return ContratoPlantillaApiMapper.toListResponse(data);
  }

  async findById(id: number): Promise<ContratoPlantillaResponse> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await httpClient.get(url);
    return ContratoPlantillaApiMapper.toResponse(data);
  }

  async create(request: CreateContratoPlantillaRequest): Promise<ContratoPlantillaResponse> {
    const payload = ContratoPlantillaApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(this.baseUrl, payload);
    return ContratoPlantillaApiMapper.toResponse(data);
  }

  async update(id: number, request: UpdateContratoPlantillaRequest): Promise<ContratoPlantillaResponse> {
    const url = `${this.baseUrl}/${id}`;
    const payload = ContratoPlantillaApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(url, payload);
    return ContratoPlantillaApiMapper.toResponse(data);
  }

  async remove(id: number): Promise<DeleteResponse> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await httpClient.delete(url);
    return data as DeleteResponse;
  }

  async uploadArchivo(id: number, request: ArchivoPlantillaUploadRequest): Promise<ArchivoPlantillaUploadResponse> {
    const url = `${this.baseUrl}/${id}/archivo`;
    const formData = new FormData();
    formData.append('archivo', request.archivo);
    formData.append('tipo', request.tipo);

    const { data } = await httpClient.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data as ArchivoPlantillaUploadResponse;
  }
}
