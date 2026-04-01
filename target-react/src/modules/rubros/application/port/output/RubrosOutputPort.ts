import { Rubros } from '@modules/rubros/domain/model/Rubros';

/**
 * Puerto de salida: 📋 Gestión de Rubros
 */
export interface RubrosOutputPort {
  fetchById(id: string): Promise<Rubros>;
  fetchAll(): Promise<Rubros[]>;
  save(model: Omit<Rubros, 'id'>): Promise<Rubros>;
  update(id: string, model: Partial<Rubros>): Promise<Rubros>;
  remove(id: string): Promise<void>;
}
