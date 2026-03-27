import { Procesos } from '../../domain/model/Procesos';
import { ProcesosInputPort } from '../port/input/ProcesosInputPort';
import { ProcesosOutputPort } from '../port/output/ProcesosOutputPort';

/**
 * Servicio de aplicación: ⚙️ Procesos de Nómina
 * Implementa el puerto de entrada, delega en el puerto de salida.
 */
export class ProcesosService implements ProcesosInputPort {
  constructor(private readonly outputPort: ProcesosOutputPort) {}

  async findById(id: string): Promise<Procesos> {
    return this.outputPort.fetchById(id);
  }

  async findAll(): Promise<Procesos[]> {
    return this.outputPort.fetchAll();
  }

  async create(model: Omit<Procesos, 'id'>): Promise<Procesos> {
    // TODO: Validaciones de negocio
    return this.outputPort.save(model);
  }

  async update(id: string, model: Partial<Procesos>): Promise<Procesos> {
    return this.outputPort.update(id, model);
  }

  async delete(id: string): Promise<void> {
    return this.outputPort.remove(id);
  }
}
