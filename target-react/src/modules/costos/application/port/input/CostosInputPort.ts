import { Costos } from '../../domain/model/Costos';

/**
 * Puerto de entrada: 💼 Distribución de Costos
 * Casos de uso: Perfiles, Asignación, Distribución
 */
export interface CostosInputPort {
  findById(id: string): Promise<Costos>;
  findAll(): Promise<Costos[]>;
  create(model: Omit<Costos, 'id'>): Promise<Costos>;
  update(id: string, model: Partial<Costos>): Promise<Costos>;
  delete(id: string): Promise<void>;
}
