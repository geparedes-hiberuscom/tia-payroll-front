import { Prestamos } from '../../domain/model/Prestamos';

/**
 * Puerto de entrada: 💰 Préstamos
 * Casos de uso: Préstamos, Anticipos, Control deuda
 */
export interface PrestamosInputPort {
  findById(id: string): Promise<Prestamos>;
  findAll(): Promise<Prestamos[]>;
  create(model: Omit<Prestamos, 'id'>): Promise<Prestamos>;
  update(id: string, model: Partial<Prestamos>): Promise<Prestamos>;
  delete(id: string): Promise<void>;
}
