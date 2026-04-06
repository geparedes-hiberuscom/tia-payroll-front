/**
 * API Mapper para Gastos Personales
 * Transforma JSON del backend ↔ DTOs tipados
 */

import {
  CreateGastosPersonalesRequest,
  UpdateGastosPersonalesRequest,
  GastosPersonalesResponse,
  GastosPersonalesListResponse,
} from '../../../input/adapter/dto/GastosPersonalesDto';

export class GastosPersonalesApiMapper {
  static toResponse(raw: any): GastosPersonalesResponse {
    return {
      id: raw.id,
      empresaId: raw.empresaId,
      empresaNombre: raw.empresaNombre,
      anio: raw.anio,
      descripcion: raw.descripcion,
      montoMaximo: raw.montoMaximo,
      porcentaje: raw.porcentaje,
      estado: raw.estado,
    };
  }

  static toListResponse(raw: any): GastosPersonalesListResponse {
    return {
      items: (raw.items || []).map((item: any) => this.toResponse(item)),
      total: raw.total || 0,
    };
  }

  static toCreatePayload(request: CreateGastosPersonalesRequest): any {
    return {
      empresaId: request.empresaId,
      anio: request.anio,
      descripcion: request.descripcion,
      montoMaximo: request.montoMaximo,
      porcentaje: request.porcentaje,
    };
  }

  static toUpdatePayload(request: UpdateGastosPersonalesRequest): any {
    return {
      descripcion: request.descripcion,
      montoMaximo: request.montoMaximo,
      porcentaje: request.porcentaje,
    };
  }
}
