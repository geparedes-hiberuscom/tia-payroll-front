/**
 * Application Service para Gastos Personales
 * Implementa la lógica de negocio y delega al Gateway Port
 */

import { GastosPersonalesGatewayPort } from '../port/output/GastosPersonalesGatewayPort';
import {
  CreateGastosPersonalesRequest,
  UpdateGastosPersonalesRequest,
  GastosPersonalesResponse,
  GastosPersonalesFilterParams,
  GastosPersonalesListResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/GastosPersonalesDto';

export class GastosPersonalesService {
  constructor(private readonly gateway: GastosPersonalesGatewayPort) {}

  async findAll(filters?: GastosPersonalesFilterParams): Promise<GastosPersonalesListResponse> {
    return this.gateway.findAll(filters);
  }

  async findById(id: number): Promise<GastosPersonalesResponse> {
    if (!id) {
      throw new Error('ID de gasto personal es requerido');
    }
    return this.gateway.findById(id);
  }

  async create(request: CreateGastosPersonalesRequest): Promise<GastosPersonalesResponse> {
    this.validateCreateRequest(request);
    return this.gateway.create(request);
  }

  async update(id: number, request: UpdateGastosPersonalesRequest): Promise<GastosPersonalesResponse> {
    if (!id) {
      throw new Error('ID de gasto personal es requerido');
    }
    return this.gateway.update(id, request);
  }

  async remove(id: number): Promise<DeleteResponse> {
    if (!id) {
      throw new Error('ID de gasto personal es requerido');
    }
    return this.gateway.remove(id);
  }

  private validateCreateRequest(request: CreateGastosPersonalesRequest): void {
    if (!request.empresaId) throw new Error('ID de empresa es requerido');
    if (!request.anio) throw new Error('Año fiscal es requerido');
    if (!request.descripcion) throw new Error('Descripción es requerida');
  }
}
