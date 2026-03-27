import { Rubros } from '../../domain/model/Rubros';

/**
 * Puerto de entrada: 📋 Gestión de Rubros
 * Casos de uso: Crear rubros, Rubros IDO, Config cálculo
 */
export interface RubrosInputPort {
  findById(id: string): Promise<Rubros>;
  findAll(): Promise<Rubros[]>;
  create(model: Omit<Rubros, 'id'>): Promise<Rubros>;
  update(id: string, model: Partial<Rubros>): Promise<Rubros>;
  delete(id: string): Promise<void>;
}
