import { Consultas } from '../../domain/model/Consultas';
import { ConsultasInputPort } from '../port/input/ConsultasInputPort';
import { ConsultasOutputPort } from '../port/output/ConsultasOutputPort';

/**
 * Servicio de aplicación: 👤 Consultas
 * Implementa el puerto de entrada, delega en el puerto de salida.
 */
export class ConsultasService implements ConsultasInputPort {
  constructor(private readonly outputPort: ConsultasOutputPort) {}

  async findById(id: string): Promise<Consultas> {
    return this.outputPort.fetchById(id);
  }

  async findAll(): Promise<Consultas[]> {
    return this.outputPort.fetchAll();
  }

  async create(model: Omit<Consultas, 'id'>): Promise<Consultas> {
    // TODO: Validaciones de negocio
    return this.outputPort.save(model);
  }

  async update(id: string, model: Partial<Consultas>): Promise<Consultas> {
    return this.outputPort.update(id, model);
  }

  async delete(id: string): Promise<void> {
    return this.outputPort.remove(id);
  }
}
