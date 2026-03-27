import { Integraciones } from '../../domain/model/Integraciones';

/**
 * Puerto de entrada: 🔗 Integraciones Externas
 * Casos de uso: Interfaz IESS, Contabilización
 */
export interface IntegracionesInputPort {
  findById(id: string): Promise<Integraciones>;
  findAll(): Promise<Integraciones[]>;
  create(model: Omit<Integraciones, 'id'>): Promise<Integraciones>;
  update(id: string, model: Partial<Integraciones>): Promise<Integraciones>;
  delete(id: string): Promise<void>;
}
