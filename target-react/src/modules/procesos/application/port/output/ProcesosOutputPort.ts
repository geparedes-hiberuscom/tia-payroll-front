import { Procesos } from '../../../domain/model/Procesos';

/**
 * Puerto de salida: ⚙️ Procesos de Nómina
 */
export interface ProcesosOutputPort {
  fetchById(id: string): Promise<Procesos>;
  fetchAll(): Promise<Procesos[]>;
  save(model: Omit<Procesos, 'id'>): Promise<Procesos>;
  update(id: string, model: Partial<Procesos>): Promise<Procesos>;
  remove(id: string): Promise<void>;
}
