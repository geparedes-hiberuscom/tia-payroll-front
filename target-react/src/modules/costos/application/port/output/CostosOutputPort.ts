import { Costos } from '../../domain/model/Costos';

/**
 * Puerto de salida: 💼 Distribución de Costos
 */
export interface CostosOutputPort {
  fetchById(id: string): Promise<Costos>;
  fetchAll(): Promise<Costos[]>;
  save(model: Omit<Costos, 'id'>): Promise<Costos>;
  update(id: string, model: Partial<Costos>): Promise<Costos>;
  remove(id: string): Promise<void>;
}
