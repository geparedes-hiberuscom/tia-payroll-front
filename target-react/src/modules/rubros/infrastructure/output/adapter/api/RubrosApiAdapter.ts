import { Rubros } from '../../../../domain/model/Rubros';
import { RubrosOutputPort } from '../../../../application/port/output/RubrosOutputPort';
import { RubrosApiMapper } from '../mapper/RubrosApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/rubros';

/**
 * Adaptador de salida: API REST para 📋 Gestión de Rubros
 */
export class RubrosApiAdapter implements RubrosOutputPort {
  async fetchById(id: string): Promise<Rubros> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return RubrosApiMapper.toDomain(data);
  }

  async fetchAll(): Promise<Rubros[]> {
    const { data } = await httpClient.get(BASE_PATH);
    return data.map(RubrosApiMapper.toDomain);
  }

  async save(model: Omit<Rubros, 'id'>): Promise<Rubros> {
    const payload = RubrosApiMapper.toApi(model);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return RubrosApiMapper.toDomain(data);
  }

  async update(id: string, model: Partial<Rubros>): Promise<Rubros> {
    const payload = RubrosApiMapper.toApi(model);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return RubrosApiMapper.toDomain(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
