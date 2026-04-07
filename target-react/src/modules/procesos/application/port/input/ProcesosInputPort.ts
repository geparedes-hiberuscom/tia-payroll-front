import { Procesos } from '../../../domain/model/Procesos';

/**
 * Puerto de entrada: ⚙️ Procesos de Nómina
 * Casos de uso: Definir procesos, Ejecutar cálculo, Revertir
 */
export interface ProcesosInputPort {
  findById(id: string): Promise<Procesos>;
  findAll(): Promise<Procesos[]>;
  create(model: Omit<Procesos, 'id'>): Promise<Procesos>;
  update(id: string, model: Partial<Procesos>): Promise<Procesos>;
  delete(id: string): Promise<void>;
}
