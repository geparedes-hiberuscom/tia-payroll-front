import { Consultas } from '../../domain/model/Consultas';

/**
 * Puerto de salida: 👤 Consultas
 */
export interface ConsultasOutputPort {
  fetchById(id: string): Promise<Consultas>;
  fetchAll(): Promise<Consultas[]>;
  save(model: Omit<Consultas, 'id'>): Promise<Consultas>;
  update(id: string, model: Partial<Consultas>): Promise<Consultas>;
  remove(id: string): Promise<void>;
}
