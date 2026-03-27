import { Rubros } from '../../domain/model/Rubros';
import { RubrosInputPort } from '../port/input/RubrosInputPort';
import { RubrosOutputPort } from '../port/output/RubrosOutputPort';

/**
 * Servicio de aplicación: 📋 Gestión de Rubros
 * Implementa el puerto de entrada, delega en el puerto de salida.
 */
export class RubrosService implements RubrosInputPort {
  constructor(private readonly outputPort: RubrosOutputPort) {}

  async findById(id: string): Promise<Rubros> {
    return this.outputPort.fetchById(id);
  }

  async findAll(): Promise<Rubros[]> {
    return this.outputPort.fetchAll();
  }

  async create(model: Omit<Rubros, 'id'>): Promise<Rubros> {
    // TODO: Validaciones de negocio
    return this.outputPort.save(model);
  }

  async update(id: string, model: Partial<Rubros>): Promise<Rubros> {
    return this.outputPort.update(id, model);
  }

  async delete(id: string): Promise<void> {
    return this.outputPort.remove(id);
  }
}
