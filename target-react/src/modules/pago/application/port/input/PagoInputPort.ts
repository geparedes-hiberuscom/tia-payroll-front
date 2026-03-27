import { Pago } from '../../domain/model/Pago';

/**
 * Puerto de entrada: 🏦 Pago y Acreditación
 * Casos de uso: Generar acreditación, Validar
 */
export interface PagoInputPort {
  findById(id: string): Promise<Pago>;
  findAll(): Promise<Pago[]>;
  create(model: Omit<Pago, 'id'>): Promise<Pago>;
  update(id: string, model: Partial<Pago>): Promise<Pago>;
  delete(id: string): Promise<void>;
}
