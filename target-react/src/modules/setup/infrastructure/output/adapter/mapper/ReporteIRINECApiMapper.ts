/**
 * API Mapper para Reportes IR/INEC
 * Transforma JSON del backend ↔ DTOs tipados
 */

import {
  CreateReporteIRINECRequest,
  UpdateReporteIRINECRequest,
  GenerarReporteIRINECRequest,
  ReporteIRINECResponse,
  ReporteIRINECListResponse,
} from '../../../input/adapter/dto/ReporteIRINECDto';

export class ReporteIRINECApiMapper {
  static toResponse(raw: any): ReporteIRINECResponse {
    return {
      id: raw.id,
      empresaId: raw.empresaId,
      empresaNombre: raw.empresaNombre,
      tipo: raw.tipo,
      anio: raw.anio,
      estado: raw.estado,
      fechaGeneracion: raw.fechaGeneracion,
    };
  }

  static toListResponse(raw: any): ReporteIRINECListResponse {
    return {
      items: (raw.items || []).map((item: any) => this.toResponse(item)),
      total: raw.total || 0,
    };
  }

  static toCreatePayload(request: CreateReporteIRINECRequest): any {
    return {
      empresaId: request.empresaId,
      tipo: request.tipo,
      anio: request.anio,
      estado: request.estado,
    };
  }

  static toUpdatePayload(request: UpdateReporteIRINECRequest): any {
    return {
      estado: request.estado,
      observaciones: request.observaciones,
    };
  }

  static toGenerarPayload(request: GenerarReporteIRINECRequest): any {
    return {
      empresaId: request.empresaId,
      tipo: request.tipo,
      anio: request.anio,
      formato: request.formato,
    };
  }
}
