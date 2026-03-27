import { Costos } from '../../../../domain/model/Costos';
import { CostosOutputPort } from '../../../../application/port/output/CostosOutputPort';
import { CostosApiMapper } from '../mapper/CostosApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/costos';

/**
 * Adaptador de salida: API REST para 💼 Distribución de Costos
 */
export class CostosApiAdapter implements CostosOutputPort {
  async fetchById(id: string): Promise<Costos> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return CostosApiMapper.toDomain(data);
  }

  async fetchAll(): Promise<Costos[]> {
    const { data } = await httpClient.get(BASE_PATH);
    return data.map(CostosApiMapper.toDomain);
  }

  async save(model: Omit<Costos, 'id'>): Promise<Costos> {
    const payload = CostosApiMapper.toApi(model);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return CostosApiMapper.toDomain(data);
  }

  async update(id: string, model: Partial<Costos>): Promise<Costos> {
    const payload = CostosApiMapper.toApi(model);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return CostosApiMapper.toDomain(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
