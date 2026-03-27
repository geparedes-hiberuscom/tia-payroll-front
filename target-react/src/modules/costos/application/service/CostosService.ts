import { Costos } from '../../domain/model/Costos';
import { CostosInputPort } from '../port/input/CostosInputPort';
import { CostosOutputPort } from '../port/output/CostosOutputPort';

/**
 * Servicio de aplicación: 💼 Distribución de Costos
 * Implementa el puerto de entrada, delega en el puerto de salida.
 */
export class CostosService implements CostosInputPort {
  constructor(private readonly outputPort: CostosOutputPort) {}

  async findById(id: string): Promise<Costos> {
    return this.outputPort.fetchById(id);
  }

  async findAll(): Promise<Costos[]> {
    return this.outputPort.fetchAll();
  }

  async create(model: Omit<Costos, 'id'>): Promise<Costos> {
    // TODO: Validaciones de negocio
    return this.outputPort.save(model);
  }

  async update(id: string, model: Partial<Costos>): Promise<Costos> {
    return this.outputPort.update(id, model);
  }

  async delete(id: string): Promise<void> {
    return this.outputPort.remove(id);
  }
}
