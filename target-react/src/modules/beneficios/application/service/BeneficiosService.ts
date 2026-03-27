import { Beneficios } from '../../domain/model/Beneficios';
import { BeneficiosInputPort } from '../port/input/BeneficiosInputPort';
import { BeneficiosOutputPort } from '../port/output/BeneficiosOutputPort';

/**
 * Servicio de aplicación: 🎁 Beneficios Especiales
 * Implementa el puerto de entrada, delega en el puerto de salida.
 */
export class BeneficiosService implements BeneficiosInputPort {
  constructor(private readonly outputPort: BeneficiosOutputPort) {}

  async findById(id: string): Promise<Beneficios> {
    return this.outputPort.fetchById(id);
  }

  async findAll(): Promise<Beneficios[]> {
    return this.outputPort.fetchAll();
  }

  async create(model: Omit<Beneficios, 'id'>): Promise<Beneficios> {
    // TODO: Validaciones de negocio
    return this.outputPort.save(model);
  }

  async update(id: string, model: Partial<Beneficios>): Promise<Beneficios> {
    return this.outputPort.update(id, model);
  }

  async delete(id: string): Promise<void> {
    return this.outputPort.remove(id);
  }
}
