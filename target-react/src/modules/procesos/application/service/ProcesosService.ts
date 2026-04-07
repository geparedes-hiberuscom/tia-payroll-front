import { Procesos } from '../../domain/model/Procesos';
import { ProcesosInputPort } from '../port/input/ProcesosInputPort';
import { ProcesosOutputPort } from '../port/output/ProcesosOutputPort';

export class ProcesosService implements ProcesosInputPort {
  constructor(private readonly outputPort: ProcesosOutputPort) {}

  async findById(id: string): Promise<Procesos> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.outputPort.fetchById(id);
  }

  async findAll(): Promise<Procesos[]> {
    return this.outputPort.fetchAll();
  }

  async create(model: Omit<Procesos, 'id'>): Promise<Procesos> {
    if (!model.nombre?.trim()) throw new Error('nombre es requerido');
    return this.outputPort.save(model);
  }

  async update(id: string, model: Partial<Procesos>): Promise<Procesos> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.outputPort.update(id, model);
  }

  async delete(id: string): Promise<void> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.outputPort.remove(id);
  }
}
