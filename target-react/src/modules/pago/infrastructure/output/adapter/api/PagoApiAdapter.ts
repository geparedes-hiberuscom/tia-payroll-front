import { Pago } from '../../../../domain/model/Pago';
import { PagoOutputPort } from '../../../../application/port/output/PagoOutputPort';
import { PagoApiMapper } from '../mapper/PagoApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/pago';

/**
 * Adaptador de salida: API REST para 🏦 Pago y Acreditación
 */
export class PagoApiAdapter implements PagoOutputPort {
  async fetchById(id: string): Promise<Pago> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return PagoApiMapper.toDomain(data);
  }

  async fetchAll(): Promise<Pago[]> {
    const { data } = await httpClient.get(BASE_PATH);
    return data.map(PagoApiMapper.toDomain);
  }

  async save(model: Omit<Pago, 'id'>): Promise<Pago> {
    const payload = PagoApiMapper.toApi(model);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return PagoApiMapper.toDomain(data);
  }

  async update(id: string, model: Partial<Pago>): Promise<Pago> {
    const payload = PagoApiMapper.toApi(model);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return PagoApiMapper.toDomain(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
