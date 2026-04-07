import { InstanciasprocesosInstanciasprocesosdialogGatewayPort } from '../port/output/InstanciasprocesosInstanciasprocesosdialogGatewayPort';
import {
  CreateInstanciasprocesosInstanciasprocesosdialogRequest,
  InstanciasprocesosInstanciasprocesosdialogFilterParams,
  InstanciasprocesosInstanciasprocesosdialogListResponse,
  InstanciasprocesosInstanciasprocesosdialogResponse,
  UpdateInstanciasprocesosInstanciasprocesosdialogRequest,
} from '../../infrastructure/input/adapter/dto/InstanciasprocesosInstanciasprocesosdialogDto';

export class InstanciasprocesosInstanciasprocesosdialogService {
  constructor(private readonly gateway: InstanciasprocesosInstanciasprocesosdialogGatewayPort) {}

  async findById(id: string): Promise<InstanciasprocesosInstanciasprocesosdialogResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.findById(id);
  }

  async findAll(params?: InstanciasprocesosInstanciasprocesosdialogFilterParams): Promise<InstanciasprocesosInstanciasprocesosdialogListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateInstanciasprocesosInstanciasprocesosdialogRequest): Promise<InstanciasprocesosInstanciasprocesosdialogResponse> {
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateInstanciasprocesosInstanciasprocesosdialogRequest): Promise<InstanciasprocesosInstanciasprocesosdialogResponse> {
    if (!id.trim()) throw new Error('id es requerido');
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    if (!id.trim()) throw new Error('id es requerido');
    await this.gateway.remove(id);
  }
}
