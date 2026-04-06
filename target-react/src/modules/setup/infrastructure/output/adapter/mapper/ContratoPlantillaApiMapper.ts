/**
 * API Mapper para Plantillas de Contratos
 * Transforma JSON del backend ↔ DTOs tipados
 */

import {
  CreateContratoPlantillaRequest,
  UpdateContratoPlantillaRequest,
  ContratoPlantillaResponse,
  ContratoPlantillaPageResponse,
} from '../../../input/adapter/dto/ContratoPlantillaDto';

export class ContratoPlantillaApiMapper {
  static toResponse(raw: any): ContratoPlantillaResponse {
    return {
      id: raw.id,
      descripcion: raw.descripcion,
      nombreArchivo: raw.nombreArchivo,
      nombreArchivo2: raw.nombreArchivo2,
      usuarioIngreso: raw.usuarioIngreso,
      fechaIngreso: raw.fechaIngreso,
      usuarioModificacion: raw.usuarioModificacion,
      fechaModificacion: raw.fechaModificacion,
    };
  }

  static toListResponse(raw: any): ContratoPlantillaPageResponse {
    return {
      content: (raw.content || []).map((item: any) => this.toResponse(item)),
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 0,
    };
  }

  static toCreatePayload(request: CreateContratoPlantillaRequest): any {
    return {
      descripcion: request.descripcion,
      nombreArchivo: request.nombreArchivo,
      nombreArchivo2: request.nombreArchivo2,
    };
  }

  static toUpdatePayload(request: UpdateContratoPlantillaRequest): any {
    return {
      descripcion: request.descripcion,
      nombreArchivo: request.nombreArchivo,
      nombreArchivo2: request.nombreArchivo2,
    };
  }
}
