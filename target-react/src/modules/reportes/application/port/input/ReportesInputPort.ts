import { Reportes } from '../../domain/model/Reportes';

/**
 * Puerto de entrada: 📊 Reportes
 * Casos de uso: Reportes, Estadísticas
 */
export interface ReportesInputPort {
  findById(id: string): Promise<Reportes>;
  findAll(): Promise<Reportes[]>;
  create(model: Omit<Reportes, 'id'>): Promise<Reportes>;
  update(id: string, model: Partial<Reportes>): Promise<Reportes>;
  delete(id: string): Promise<void>;
}
