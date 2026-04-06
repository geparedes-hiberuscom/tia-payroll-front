/**
 * Application Service para Rubros de Plantillas Contables
 * Implementa la lógica de negocio y delega al Gateway Port
 */

import { RubroPlantillaGatewayPort } from '../port/output/RubroPlantillaGatewayPort';
import {
  CreateRubroPlantillaRequest,
  UpdateRubroPlantillaRequest,
  RubroPlantillaResponse,
  RubroPlantillaListResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/RubroPlantillaDto';

export class RubroPlantillaService {
  constructor(private readonly gateway: RubroPlantillaGatewayPort) {}

  async findAll(plantillaId: number): Promise<RubroPlantillaListResponse> {
    if (!plantillaId) {
      throw new Error('ID de plantilla es requerido');
    }
    return this.gateway.findAll(plantillaId);
  }

  async findById(plantillaId: number, rubroId: string): Promise<RubroPlantillaResponse> {
    if (!plantillaId || !rubroId) {
      throw new Error('ID de plantilla y ID de rubro son requeridos');
    }
    return this.gateway.findById(plantillaId, rubroId);
  }

  async create(plantillaId: number, request: CreateRubroPlantillaRequest): Promise<RubroPlantillaResponse> {
    if (!plantillaId) {
      throw new Error('ID de plantilla es requerido');
    }
    this.validateCreateRequest(request);
    return this.gateway.create(plantillaId, request);
  }

  async update(plantillaId: number, rubroId: string, request: UpdateRubroPlantillaRequest): Promise<RubroPlantillaResponse> {
    if (!plantillaId || !rubroId) {
      throw new Error('ID de plantilla y ID de rubro son requeridos');
    }
    return this.gateway.update(plantillaId, rubroId, request);
  }

  async remove(plantillaId: number, rubroId: string): Promise<DeleteResponse> {
    if (!plantillaId || !rubroId) {
      throw new Error('ID de plantilla y ID de rubro son requeridos');
    }
    return this.gateway.remove(plantillaId, rubroId);
  }

  private validateCreateRequest(request: CreateRubroPlantillaRequest): void {
    if (!request.rubroId) throw new Error('ID de rubro es requerido');
    if (!request.cuenta) throw new Error('Cuenta contable es requerida');
    if (!request.debeHaber) throw new Error('Indicador débito/haber es requerido');
  }
}
