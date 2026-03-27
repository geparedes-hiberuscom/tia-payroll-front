import { Integraciones } from '../../../../domain/model/Integraciones';
import { IntegracionesOutputPort } from '../../../../application/port/output/IntegracionesOutputPort';
import { IntegracionesApiMapper } from '../mapper/IntegracionesApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/integraciones';

/**
 * Adaptador de salida: API REST para 🔗 Integraciones Externas
 */
export class IntegracionesApiAdapter implements IntegracionesOutputPort {
  async fetchById(id: string): Promise<Integraciones> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return IntegracionesApiMapper.toDomain(data);
  }

  async fetchAll(): Promise<Integraciones[]> {
    const { data } = await httpClient.get(BASE_PATH);
    return data.map(IntegracionesApiMapper.toDomain);
  }

  async save(model: Omit<Integraciones, 'id'>): Promise<Integraciones> {
    const payload = IntegracionesApiMapper.toApi(model);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return IntegracionesApiMapper.toDomain(data);
  }

  async update(id: string, model: Partial<Integraciones>): Promise<Integraciones> {
    const payload = IntegracionesApiMapper.toApi(model);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return IntegracionesApiMapper.toDomain(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
