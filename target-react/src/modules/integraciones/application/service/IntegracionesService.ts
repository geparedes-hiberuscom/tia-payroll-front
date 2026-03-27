import { Integraciones } from '../../domain/model/Integraciones';
import { IntegracionesInputPort } from '../port/input/IntegracionesInputPort';
import { IntegracionesOutputPort } from '../port/output/IntegracionesOutputPort';

/**
 * Servicio de aplicación: 🔗 Integraciones Externas
 * Implementa el puerto de entrada, delega en el puerto de salida.
 */
export class IntegracionesService implements IntegracionesInputPort {
  constructor(private readonly outputPort: IntegracionesOutputPort) {}

  async findById(id: string): Promise<Integraciones> {
    return this.outputPort.fetchById(id);
  }

  async findAll(): Promise<Integraciones[]> {
    return this.outputPort.fetchAll();
  }

  async create(model: Omit<Integraciones, 'id'>): Promise<Integraciones> {
    // TODO: Validaciones de negocio
    return this.outputPort.save(model);
  }

  async update(id: string, model: Partial<Integraciones>): Promise<Integraciones> {
    return this.outputPort.update(id, model);
  }

  async delete(id: string): Promise<void> {
    return this.outputPort.remove(id);
  }
}
