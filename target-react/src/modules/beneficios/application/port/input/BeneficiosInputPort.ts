import { Beneficios } from '../../domain/model/Beneficios';

/**
 * Puerto de entrada: 🎁 Beneficios Especiales
 * Casos de uso: Vales diferidos, Provisiones
 */
export interface BeneficiosInputPort {
  findById(id: string): Promise<Beneficios>;
  findAll(): Promise<Beneficios[]>;
  create(model: Omit<Beneficios, 'id'>): Promise<Beneficios>;
  update(id: string, model: Partial<Beneficios>): Promise<Beneficios>;
  delete(id: string): Promise<void>;
}
