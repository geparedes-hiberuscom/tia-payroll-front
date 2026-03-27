import { Reportes } from '../../domain/model/Reportes';

/**
 * Puerto de salida: 📊 Reportes
 */
export interface ReportesOutputPort {
  fetchById(id: string): Promise<Reportes>;
  fetchAll(): Promise<Reportes[]>;
  save(model: Omit<Reportes, 'id'>): Promise<Reportes>;
  update(id: string, model: Partial<Reportes>): Promise<Reportes>;
  remove(id: string): Promise<void>;
}
