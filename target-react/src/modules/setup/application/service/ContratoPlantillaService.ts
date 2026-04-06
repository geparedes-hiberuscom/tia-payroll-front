/**
 * Application Service para Plantillas de Contratos
 * Implementa la lógica de negocio y delega al Gateway Port
 */

import { ContratoPlantillaGatewayPort } from '../port/output/ContratoPlantillaGatewayPort';
import {
  CreateContratoPlantillaRequest,
  UpdateContratoPlantillaRequest,
  ContratoPlantillaResponse,
  ContratoPlantillaFilterParams,
  ContratoPlantillaPageResponse,
  ArchivoPlantillaUploadRequest,
  ArchivoPlantillaUploadResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/ContratoPlantillaDto';

export class ContratoPlantillaService {
  constructor(private readonly gateway: ContratoPlantillaGatewayPort) {}

  async findAll(filters?: ContratoPlantillaFilterParams): Promise<ContratoPlantillaPageResponse> {
    return this.gateway.findAll(filters);
  }

  async findById(id: number): Promise<ContratoPlantillaResponse> {
    if (!id) {
      throw new Error('ID de plantilla de contrato es requerido');
    }
    return this.gateway.findById(id);
  }

  async create(request: CreateContratoPlantillaRequest): Promise<ContratoPlantillaResponse> {
    this.validateCreateRequest(request);
    return this.gateway.create(request);
  }

  async update(id: number, request: UpdateContratoPlantillaRequest): Promise<ContratoPlantillaResponse> {
    if (!id) {
      throw new Error('ID de plantilla de contrato es requerido');
    }
    return this.gateway.update(id, request);
  }

  async remove(id: number): Promise<DeleteResponse> {
    if (!id) {
      throw new Error('ID de plantilla de contrato es requerido');
    }
    return this.gateway.remove(id);
  }

  async uploadArchivo(id: number, request: ArchivoPlantillaUploadRequest): Promise<ArchivoPlantillaUploadResponse> {
    if (!id) {
      throw new Error('ID de plantilla de contrato es requerido');
    }
    this.validateUploadRequest(request);
    return this.gateway.uploadArchivo(id, request);
  }

  private validateCreateRequest(request: CreateContratoPlantillaRequest): void {
    if (!request.descripcion) throw new Error('Descripción es requerida');
  }

  private validateUploadRequest(request: ArchivoPlantillaUploadRequest): void {
    if (!request.archivo) throw new Error('Archivo es requerido');
    if (!request.tipo) throw new Error('Tipo de archivo (PRINCIPAL/SECUNDARIO) es requerido');
    if (!['PRINCIPAL', 'SECUNDARIO'].includes(request.tipo)) {
      throw new Error('Tipo de archivo debe ser PRINCIPAL o SECUNDARIO');
    }
  }
}
