import { Integraciones } from '../../domain/model/Integraciones';

/**
 * Puerto de salida: 🔗 Integraciones Externas
 */
export interface IntegracionesOutputPort {
  fetchById(id: string): Promise<Integraciones>;
  fetchAll(): Promise<Integraciones[]>;
  save(model: Omit<Integraciones, 'id'>): Promise<Integraciones>;
  update(id: string, model: Partial<Integraciones>): Promise<Integraciones>;
  remove(id: string): Promise<void>;
}
