import { Consultas } from '../../domain/model/Consultas';

/**
 * Puerto de entrada: 👤 Consultas
 * Casos de uso: Ver nómina, Acumulados, Comparativas
 */
export interface ConsultasInputPort {
  findById(id: string): Promise<Consultas>;
  findAll(): Promise<Consultas[]>;
  create(model: Omit<Consultas, 'id'>): Promise<Consultas>;
  update(id: string, model: Partial<Consultas>): Promise<Consultas>;
  delete(id: string): Promise<void>;
}
