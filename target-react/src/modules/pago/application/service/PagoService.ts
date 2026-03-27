import { Pago } from '../../domain/model/Pago';
import { PagoInputPort } from '../port/input/PagoInputPort';
import { PagoOutputPort } from '../port/output/PagoOutputPort';

/**
 * Servicio de aplicación: 🏦 Pago y Acreditación
 * Implementa el puerto de entrada, delega en el puerto de salida.
 */
export class PagoService implements PagoInputPort {
  constructor(private readonly outputPort: PagoOutputPort) {}

  async findById(id: string): Promise<Pago> {
    return this.outputPort.fetchById(id);
  }

  async findAll(): Promise<Pago[]> {
    return this.outputPort.fetchAll();
  }

  async create(model: Omit<Pago, 'id'>): Promise<Pago> {
    // TODO: Validaciones de negocio
    return this.outputPort.save(model);
  }

  async update(id: string, model: Partial<Pago>): Promise<Pago> {
    return this.outputPort.update(id, model);
  }

  async delete(id: string): Promise<void> {
    return this.outputPort.remove(id);
  }
}
