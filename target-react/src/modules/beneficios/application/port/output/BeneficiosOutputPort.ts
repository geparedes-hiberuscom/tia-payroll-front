import { Beneficios } from '../../domain/model/Beneficios';

/**
 * Puerto de salida: 🎁 Beneficios Especiales
 */
export interface BeneficiosOutputPort {
  fetchById(id: string): Promise<Beneficios>;
  fetchAll(): Promise<Beneficios[]>;
  save(model: Omit<Beneficios, 'id'>): Promise<Beneficios>;
  update(id: string, model: Partial<Beneficios>): Promise<Beneficios>;
  remove(id: string): Promise<void>;
}
