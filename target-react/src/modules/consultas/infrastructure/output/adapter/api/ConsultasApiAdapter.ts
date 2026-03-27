import { Consultas } from '../../../../domain/model/Consultas';
import { ConsultasOutputPort } from '../../../../application/port/output/ConsultasOutputPort';
import { ConsultasApiMapper } from '../mapper/ConsultasApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/consultas';

/**
 * Adaptador de salida: API REST para 👤 Consultas
 */
export class ConsultasApiAdapter implements ConsultasOutputPort {
  async fetchById(id: string): Promise<Consultas> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return ConsultasApiMapper.toDomain(data);
  }

  async fetchAll(): Promise<Consultas[]> {
    const { data } = await httpClient.get(BASE_PATH);
    return data.map(ConsultasApiMapper.toDomain);
  }

  async save(model: Omit<Consultas, 'id'>): Promise<Consultas> {
    const payload = ConsultasApiMapper.toApi(model);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return ConsultasApiMapper.toDomain(data);
  }

  async update(id: string, model: Partial<Consultas>): Promise<Consultas> {
    const payload = ConsultasApiMapper.toApi(model);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return ConsultasApiMapper.toDomain(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
