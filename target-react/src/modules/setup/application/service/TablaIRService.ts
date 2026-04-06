/**
 * Application Service para Tabla IR
 * Implementa la lógica de negocio y delega al Gateway Port
 */

import { TablaIRGatewayPort } from '../port/output/TablaIRGatewayPort';
import {
  CreateTablaIRRequest,
  UpdateTablaIRRequest,
  TablaIRResponse,
  TablaIRFilterParams,
  TablaIRPageResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/TablaIRDto';

export class TablaIRService {
  constructor(private readonly gateway: TablaIRGatewayPort) {}

  async findAll(filters?: TablaIRFilterParams): Promise<TablaIRPageResponse> {
    return this.gateway.findAll(filters);
  }

  async findById(id: number): Promise<TablaIRResponse> {
    if (!id) {
      throw new Error('ID de rango IR es requerido');
    }
    return this.gateway.findById(id);
  }

  async create(request: CreateTablaIRRequest): Promise<TablaIRResponse> {
    this.validateCreateRequest(request);
    return this.gateway.create(request);
  }

  async update(id: number, request: UpdateTablaIRRequest): Promise<TablaIRResponse> {
    if (!id) {
      throw new Error('ID de rango IR es requerido');
    }
    return this.gateway.update(id, request);
  }

  async remove(id: number): Promise<DeleteResponse> {
    if (!id) {
      throw new Error('ID de rango IR es requerido');
    }
    return this.gateway.remove(id);
  }

  private validateCreateRequest(request: CreateTablaIRRequest): void {
    if (request.anio === undefined || request.anio === null) throw new Error('Año fiscal es requerido');
    if (request.nivel === undefined || request.nivel === null) throw new Error('Nivel es requerido');
    if (!request.tipo) throw new Error('Tipo de tabla es requerido');
    if (request.valorMinimo === undefined || request.valorMinimo === null) throw new Error('Valor mínimo es requerido');
  }
}
