/**
 * Gateway Adapter para Rubros de Plantillas Contables
 * Implementación usando httpClient (Axios)
 * Invoca los endpoints REST del backend
 */

import { RubroPlantillaGatewayPort } from '../../../application/port/output/RubroPlantillaGatewayPort';
import {
  CreateRubroPlantillaRequest,
  UpdateRubroPlantillaRequest,
  RubroPlantillaResponse,
  RubroPlantillaListResponse,
  DeleteResponse,
} from '../../input/adapter/dto/RubroPlantillaDto';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';
import { RubroPlantillaApiMapper } from './mapper/RubroPlantillaApiMapper';

export class RubroPlantillaGatewayAdapter implements RubroPlantillaGatewayPort {
  private baseUrl(plantillaId: number): string {
    return `/api/v1/plantillas-contables/${plantillaId}/rubros`;
  }

  async findAll(plantillaId: number): Promise<RubroPlantillaListResponse> {
    const url = this.baseUrl(plantillaId);
    const { data } = await httpClient.get(url);
    return RubroPlantillaApiMapper.toListResponse(data);
  }

  async findById(plantillaId: number, rubroId: string): Promise<RubroPlantillaResponse> {
    const url = `${this.baseUrl(plantillaId)}/${rubroId}`;
    const { data } = await httpClient.get(url);
    return RubroPlantillaApiMapper.toResponse(data);
  }

  async create(plantillaId: number, request: CreateRubroPlantillaRequest): Promise<RubroPlantillaResponse> {
    const url = this.baseUrl(plantillaId);
    const payload = RubroPlantillaApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(url, payload);
    return RubroPlantillaApiMapper.toResponse(data);
  }

  async update(plantillaId: number, rubroId: string, request: UpdateRubroPlantillaRequest): Promise<RubroPlantillaResponse> {
    const url = `${this.baseUrl(plantillaId)}/${rubroId}`;
    const payload = RubroPlantillaApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(url, payload);
    return RubroPlantillaApiMapper.toResponse(data);
  }

  async remove(plantillaId: number, rubroId: string): Promise<DeleteResponse> {
    const url = `${this.baseUrl(plantillaId)}/${rubroId}`;
    const { data } = await httpClient.delete(url);
    return data as DeleteResponse;
  }
}
