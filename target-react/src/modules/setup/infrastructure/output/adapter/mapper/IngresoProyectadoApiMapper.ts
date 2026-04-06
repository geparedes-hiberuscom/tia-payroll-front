/**
 * API Mapper para Ingresos Proyectados
 * Transforma JSON del backend ↔ DTOs tipados
 */

import {
  CreateIngresoProyectadoRequest,
  UpdateIngresoProyectadoRequest,
  GenerarIngresosProyectadosRequest,
  IngresoProyectadoResponse,
  IngresoProyectadoListResponse,
} from '../../../input/adapter/dto/IngresoProyectadoDto';

export class IngresoProyectadoApiMapper {
  static toResponse(raw: any): IngresoProyectadoResponse {
    return {
      id: raw.id,
      empresaId: raw.empresaId,
      empresaNombre: raw.empresaNombre,
      anio: raw.anio,
      mes: raw.mes,
      montoProyectado: raw.montoProyectado,
      estado: raw.estado,
      fechaGeneracion: raw.fechaGeneracion,
    };
  }

  static toListResponse(raw: any): IngresoProyectadoListResponse {
    return {
      items: (raw.items || []).map((item: any) => this.toResponse(item)),
      total: raw.total || 0,
    };
  }

  static toCreatePayload(request: CreateIngresoProyectadoRequest): any {
    return {
      empresaId: request.empresaId,
      anio: request.anio,
      mes: request.mes,
      montoProyectado: request.montoProyectado,
      estado: request.estado,
    };
  }

  static toUpdatePayload(request: UpdateIngresoProyectadoRequest): any {
    return {
      montoProyectado: request.montoProyectado,
      estado: request.estado,
    };
  }

  static toGenerarPayload(request: GenerarIngresosProyectadosRequest): any {
    return {
      empresaId: request.empresaId,
      anio: request.anio,
      mesDesde: request.mesDesde,
      mesHasta: request.mesHasta,
    };
  }
}
