import { Setup } from '../../domain/model/Setup';

/**
 * Puerto de entrada: 🔧 Setup y Configuración
 * Casos de uso: Config inicial, Tabla de IR, Mapeo contable
 */
export interface SetupInputPort {
  findById(id: string): Promise<Setup>;
  findAll(): Promise<Setup[]>;
  create(model: Omit<Setup, 'id'>): Promise<Setup>;
  update(id: string, model: Partial<Setup>): Promise<Setup>;
  delete(id: string): Promise<void>;
}
