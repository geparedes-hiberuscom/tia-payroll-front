import { Pago } from '../../domain/model/Pago';

/**
 * Puerto de salida: 🏦 Pago y Acreditación
 */
export interface PagoOutputPort {
  fetchById(id: string): Promise<Pago>;
  fetchAll(): Promise<Pago[]>;
  save(model: Omit<Pago, 'id'>): Promise<Pago>;
  update(id: string, model: Partial<Pago>): Promise<Pago>;
  remove(id: string): Promise<void>;
}
