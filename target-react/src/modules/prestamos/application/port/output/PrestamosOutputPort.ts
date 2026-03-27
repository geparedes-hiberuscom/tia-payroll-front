import { Prestamos } from '../../domain/model/Prestamos';

/**
 * Puerto de salida: 💰 Préstamos
 */
export interface PrestamosOutputPort {
  fetchById(id: string): Promise<Prestamos>;
  fetchAll(): Promise<Prestamos[]>;
  save(model: Omit<Prestamos, 'id'>): Promise<Prestamos>;
  update(id: string, model: Partial<Prestamos>): Promise<Prestamos>;
  remove(id: string): Promise<void>;
}
