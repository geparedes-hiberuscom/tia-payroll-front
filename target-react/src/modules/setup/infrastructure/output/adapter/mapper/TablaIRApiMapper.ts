/**
 * API Mapper para Tabla IR
 * Transforma JSON del backend ↔ DTOs tipados
 */

import {
  CreateTablaIRRequest,
  UpdateTablaIRRequest,
  TablaIRResponse,
  TablaIRPageResponse,
} from '../../../input/adapter/dto/TablaIRDto';

export class TablaIRApiMapper {
  static toResponse(raw: any): TablaIRResponse {
    return {
      id: raw.id,
      anio: raw.anio,
      nivel: raw.nivel,
      tipo: raw.tipo,
      valorMinimo: raw.valorMinimo,
      valorMaximo: raw.valorMaximo,
      fraccionBasica: raw.fraccionBasica,
      porcentajeExcedente: raw.porcentajeExcedente,
    };
  }

  static toListResponse(raw: any): TablaIRPageResponse {
    return {
      content: (raw.content || []).map((item: any) => this.toResponse(item)),
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 0,
    };
  }

  static toCreatePayload(request: CreateTablaIRRequest): any {
    return {
      anio: request.anio,
      nivel: request.nivel,
      tipo: request.tipo,
      valorMinimo: request.valorMinimo,
      valorMaximo: request.valorMaximo,
      fraccionBasica: request.fraccionBasica,
      porcentajeExcedente: request.porcentajeExcedente,
    };
  }

  static toUpdatePayload(request: UpdateTablaIRRequest): any {
    return {
      anio: request.anio,
      nivel: request.nivel,
      tipo: request.tipo,
      valorMinimo: request.valorMinimo,
      valorMaximo: request.valorMaximo,
      fraccionBasica: request.fraccionBasica,
      porcentajeExcedente: request.porcentajeExcedente,
    };
  }
}
