import { Reportes } from '../../../../domain/model/Reportes';
import { ReportesOutputPort } from '../../../../application/port/output/ReportesOutputPort';
import { ReportesApiMapper } from '../mapper/ReportesApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/reportes';

/**
 * Adaptador de salida: API REST para 📊 Reportes
 */
export class ReportesApiAdapter implements ReportesOutputPort {
  async fetchById(id: string): Promise<Reportes> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return ReportesApiMapper.toDomain(data);
  }

  async fetchAll(): Promise<Reportes[]> {
    const { data } = await httpClient.get(BASE_PATH);
    return data.map(ReportesApiMapper.toDomain);
  }

  async save(model: Omit<Reportes, 'id'>): Promise<Reportes> {
    const payload = ReportesApiMapper.toApi(model);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return ReportesApiMapper.toDomain(data);
  }

  async update(id: string, model: Partial<Reportes>): Promise<Reportes> {
    const payload = ReportesApiMapper.toApi(model);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return ReportesApiMapper.toDomain(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
