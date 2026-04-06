/**
 * Gateway Port para Plantillas de Contratos
 * Define el contrato de comunicación con el backend
 */

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

export interface ContratoPlantillaGatewayPort {
  findAll(filters?: ContratoPlantillaFilterParams): Promise<ContratoPlantillaPageResponse>;
  findById(id: number): Promise<ContratoPlantillaResponse>;
  create(request: CreateContratoPlantillaRequest): Promise<ContratoPlantillaResponse>;
  update(id: number, request: UpdateContratoPlantillaRequest): Promise<ContratoPlantillaResponse>;
  remove(id: number): Promise<DeleteResponse>;
  uploadArchivo(id: number, request: ArchivoPlantillaUploadRequest): Promise<ArchivoPlantillaUploadResponse>;
}
