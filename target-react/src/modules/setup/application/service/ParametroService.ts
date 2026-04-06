/**
 * Application Service para Parámetros
 * Implementa la lógica de negocio y delega al Gateway Port
 */

import { ParametroGatewayPort } from '../port/output/ParametroGatewayPort';
import {
  CreateParametroRequest,
  UpdateParametroRequest,
  ParametroResponse,
  ParametroFilterParams,
  ParametroPageResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/ParametroDto';

export class ParametroService {
  constructor(private readonly gateway: ParametroGatewayPort) {}

  async findAll(filters?: ParametroFilterParams): Promise<ParametroPageResponse> {
    return this.gateway.findAll(filters);
  }

  async findById(entorno: string, idParametro: string): Promise<ParametroResponse> {
    if (!entorno || !idParametro) {
      throw new Error('Entorno e ID de parámetro son requeridos');
    }
    return this.gateway.findById(entorno, idParametro);
  }

  async create(request: CreateParametroRequest): Promise<ParametroResponse> {
    this.validateCreateRequest(request);
    return this.gateway.create(request);
  }

  async update(entorno: string, idParametro: string, request: UpdateParametroRequest): Promise<ParametroResponse> {
    if (!entorno || !idParametro) {
      throw new Error('Entorno e ID de parámetro son requeridos');
    }
    return this.gateway.update(entorno, idParametro, request);
  }

  async remove(entorno: string, idParametro: string): Promise<DeleteResponse> {
    if (!entorno || !idParametro) {
      throw new Error('Entorno e ID de parámetro son requeridos');
    }
    return this.gateway.remove(entorno, idParametro);
  }

  private validateCreateRequest(request: CreateParametroRequest): void {
    if (!request.entorno) throw new Error('Entorno es requerido');
    if (!request.idParametro) throw new Error('ID de parámetro es requerido');
    if (!request.parametro) throw new Error('Nombre del parámetro es requerido');
  }
}
