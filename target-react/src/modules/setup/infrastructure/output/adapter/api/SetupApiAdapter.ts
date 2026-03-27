import { Setup } from '../../../../domain/model/Setup';
import { SetupOutputPort } from '../../../../application/port/output/SetupOutputPort';
import { SetupApiMapper } from '../mapper/SetupApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/setup';

/**
 * Adaptador de salida: API REST para 🔧 Setup y Configuración
 */
export class SetupApiAdapter implements SetupOutputPort {
  async fetchById(id: string): Promise<Setup> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return SetupApiMapper.toDomain(data);
  }

  async fetchAll(): Promise<Setup[]> {
    const { data } = await httpClient.get(BASE_PATH);
    return data.map(SetupApiMapper.toDomain);
  }

  async save(model: Omit<Setup, 'id'>): Promise<Setup> {
    const payload = SetupApiMapper.toApi(model);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return SetupApiMapper.toDomain(data);
  }

  async update(id: string, model: Partial<Setup>): Promise<Setup> {
    const payload = SetupApiMapper.toApi(model);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return SetupApiMapper.toDomain(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
