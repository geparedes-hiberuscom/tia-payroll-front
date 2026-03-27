import { Prestamos } from '../../../../domain/model/Prestamos';
import { PrestamosOutputPort } from '../../../../application/port/output/PrestamosOutputPort';
import { PrestamosApiMapper } from '../mapper/PrestamosApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/prestamos';

/**
 * Adaptador de salida: API REST para 💰 Préstamos
 */
export class PrestamosApiAdapter implements PrestamosOutputPort {
  async fetchById(id: string): Promise<Prestamos> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return PrestamosApiMapper.toDomain(data);
  }

  async fetchAll(): Promise<Prestamos[]> {
    const { data } = await httpClient.get(BASE_PATH);
    return data.map(PrestamosApiMapper.toDomain);
  }

  async save(model: Omit<Prestamos, 'id'>): Promise<Prestamos> {
    const payload = PrestamosApiMapper.toApi(model);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return PrestamosApiMapper.toDomain(data);
  }

  async update(id: string, model: Partial<Prestamos>): Promise<Prestamos> {
    const payload = PrestamosApiMapper.toApi(model);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return PrestamosApiMapper.toDomain(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
