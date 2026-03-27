import { Beneficios } from '../../../../domain/model/Beneficios';
import { BeneficiosOutputPort } from '../../../../application/port/output/BeneficiosOutputPort';
import { BeneficiosApiMapper } from '../mapper/BeneficiosApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/beneficios';

/**
 * Adaptador de salida: API REST para 🎁 Beneficios Especiales
 */
export class BeneficiosApiAdapter implements BeneficiosOutputPort {
  async fetchById(id: string): Promise<Beneficios> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return BeneficiosApiMapper.toDomain(data);
  }

  async fetchAll(): Promise<Beneficios[]> {
    const { data } = await httpClient.get(BASE_PATH);
    return data.map(BeneficiosApiMapper.toDomain);
  }

  async save(model: Omit<Beneficios, 'id'>): Promise<Beneficios> {
    const payload = BeneficiosApiMapper.toApi(model);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return BeneficiosApiMapper.toDomain(data);
  }

  async update(id: string, model: Partial<Beneficios>): Promise<Beneficios> {
    const payload = BeneficiosApiMapper.toApi(model);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return BeneficiosApiMapper.toDomain(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
