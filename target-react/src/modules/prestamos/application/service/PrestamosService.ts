import { Prestamos } from '../../domain/model/Prestamos';
import { PrestamosInputPort } from '../port/input/PrestamosInputPort';
import { PrestamosOutputPort } from '../port/output/PrestamosOutputPort';

/**
 * Servicio de aplicación: 💰 Préstamos
 * Implementa el puerto de entrada, delega en el puerto de salida.
 */
export class PrestamosService implements PrestamosInputPort {
  constructor(private readonly outputPort: PrestamosOutputPort) {}

  async findById(id: string): Promise<Prestamos> {
    return this.outputPort.fetchById(id);
  }

  async findAll(): Promise<Prestamos[]> {
    return this.outputPort.fetchAll();
  }

  async create(model: Omit<Prestamos, 'id'>): Promise<Prestamos> {
    // TODO: Validaciones de negocio
    return this.outputPort.save(model);
  }

  async update(id: string, model: Partial<Prestamos>): Promise<Prestamos> {
    return this.outputPort.update(id, model);
  }

  async delete(id: string): Promise<void> {
    return this.outputPort.remove(id);
  }
}
