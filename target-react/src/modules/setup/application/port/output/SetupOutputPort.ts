import { Setup } from '../../domain/model/Setup';

/**
 * Puerto de salida: 🔧 Setup y Configuración
 */
export interface SetupOutputPort {
  fetchById(id: string): Promise<Setup>;
  fetchAll(): Promise<Setup[]>;
  save(model: Omit<Setup, 'id'>): Promise<Setup>;
  update(id: string, model: Partial<Setup>): Promise<Setup>;
  remove(id: string): Promise<void>;
}
