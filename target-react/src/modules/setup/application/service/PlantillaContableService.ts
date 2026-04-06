/**
 * Application Service para Plantillas Contables
 * Implementa la lógica de negocio y delega al Gateway Port
 */

import { PlantillaContableGatewayPort } from '../port/output/PlantillaContableGatewayPort';
import {
  CreatePlantillaContableRequest,
  UpdatePlantillaContableRequest,
  PlantillaContableResponse,
  PlantillaContableFilterParams,
  PlantillaContablePageResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/PlantillaContableDto';

export class PlantillaContableService {
  constructor(private readonly gateway: PlantillaContableGatewayPort) {}

  async findAll(filters?: PlantillaContableFilterParams): Promise<PlantillaContablePageResponse> {
    return this.gateway.findAll(filters);
  }

  async findById(id: number): Promise<PlantillaContableResponse> {
    if (!id) {
      throw new Error('ID de plantilla contable es requerido');
    }
    return this.gateway.findById(id);
  }

  async create(request: CreatePlantillaContableRequest): Promise<PlantillaContableResponse> {
    this.validateCreateRequest(request);
    return this.gateway.create(request);
  }

  async update(id: number, request: UpdatePlantillaContableRequest): Promise<PlantillaContableResponse> {
    if (!id) {
      throw new Error('ID de plantilla contable es requerido');
    }
    return this.gateway.update(id, request);
  }

  async remove(id: number): Promise<DeleteResponse> {
    if (!id) {
      throw new Error('ID de plantilla contable es requerido');
    }
    return this.gateway.remove(id);
  }

  private validateCreateRequest(request: CreatePlantillaContableRequest): void {
    if (!request.procesoId) throw new Error('ID de proceso es requerido');
    if (!request.rubroId) throw new Error('ID de rubro es requerido');
    if (!request.cuenta) throw new Error('Cuenta contable es requerida');
    if (!request.debeHaber) throw new Error('Indicador débito/haber es requerido');
  }
}
