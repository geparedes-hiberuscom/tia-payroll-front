import { Procesos } from '../../../../domain/model/Procesos';
import { ProcesosOutputPort } from '../../../../application/port/output/ProcesosOutputPort';
import { ProcesosApiMapper } from '../mapper/ProcesosApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/procesos';

/**
 * Adaptador de salida: API REST para ⚙️ Procesos de Nómina
 */
export class ProcesosApiAdapter implements ProcesosOutputPort {
  async fetchById(id: string): Promise<Procesos> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return ProcesosApiMapper.toDomain(data);
  }

  async fetchAll(): Promise<Procesos[]> {
    const { data } = await httpClient.get(BASE_PATH);
    return data.map(ProcesosApiMapper.toDomain);
  }

  async save(model: Omit<Procesos, 'id'>): Promise<Procesos> {
    const payload = ProcesosApiMapper.toApi(model);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return ProcesosApiMapper.toDomain(data);
  }

  async update(id: string, model: Partial<Procesos>): Promise<Procesos> {
    const payload = ProcesosApiMapper.toApi(model);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return ProcesosApiMapper.toDomain(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
