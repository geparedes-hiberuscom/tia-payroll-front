import { Setup } from '../../domain/model/Setup';
import { SetupInputPort } from '../port/input/SetupInputPort';
import { SetupOutputPort } from '../port/output/SetupOutputPort';

/**
 * Servicio de aplicación: 🔧 Setup y Configuración
 * Implementa el puerto de entrada, delega en el puerto de salida.
 */
export class SetupService implements SetupInputPort {
  constructor(private readonly outputPort: SetupOutputPort) {}

  async findById(id: string): Promise<Setup> {
    return this.outputPort.fetchById(id);
  }

  async findAll(): Promise<Setup[]> {
    return this.outputPort.fetchAll();
  }

  async create(model: Omit<Setup, 'id'>): Promise<Setup> {
    // TODO: Validaciones de negocio
    return this.outputPort.save(model);
  }

  async update(id: string, model: Partial<Setup>): Promise<Setup> {
    return this.outputPort.update(id, model);
  }

  async delete(id: string): Promise<void> {
    return this.outputPort.remove(id);
  }
}
