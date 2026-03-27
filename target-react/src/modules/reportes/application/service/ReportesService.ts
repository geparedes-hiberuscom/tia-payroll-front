import { Reportes } from '../../domain/model/Reportes';
import { ReportesInputPort } from '../port/input/ReportesInputPort';
import { ReportesOutputPort } from '../port/output/ReportesOutputPort';

/**
 * Servicio de aplicación: 📊 Reportes
 * Implementa el puerto de entrada, delega en el puerto de salida.
 */
export class ReportesService implements ReportesInputPort {
  constructor(private readonly outputPort: ReportesOutputPort) {}

  async findById(id: string): Promise<Reportes> {
    return this.outputPort.fetchById(id);
  }

  async findAll(): Promise<Reportes[]> {
    return this.outputPort.fetchAll();
  }

  async create(model: Omit<Reportes, 'id'>): Promise<Reportes> {
    // TODO: Validaciones de negocio
    return this.outputPort.save(model);
  }

  async update(id: string, model: Partial<Reportes>): Promise<Reportes> {
    return this.outputPort.update(id, model);
  }

  async delete(id: string): Promise<void> {
    return this.outputPort.remove(id);
  }
}
