/**
 * API Mapper para Rubros de Plantillas Contables
 * Transforma JSON del backend ↔ DTOs tipados
 */

import {
  CreateRubroPlantillaRequest,
  UpdateRubroPlantillaRequest,
  RubroPlantillaResponse,
  RubroPlantillaListResponse,
} from '../../../input/adapter/dto/RubroPlantillaDto';

export class RubroPlantillaApiMapper {
  static toResponse(raw: any): RubroPlantillaResponse {
    return {
      plantillaId: raw.plantillaId,
      rubroId: raw.rubroId,
      rubroNombre: raw.rubroNombre,
      cuenta: raw.cuenta,
      subcuenta: raw.subcuenta,
      debeHaber: raw.debeHaber,
      auxiliar: raw.auxiliar,
      distribucionCosto: raw.distribucionCosto,
      dimensionId: raw.dimensionId,
      dimensionNombre: raw.dimensionNombre,
    };
  }

  static toListResponse(raw: any): RubroPlantillaListResponse {
    return {
      items: (raw.items || []).map((item: any) => this.toResponse(item)),
      total: raw.total || 0,
    };
  }

  static toCreatePayload(request: CreateRubroPlantillaRequest): any {
    return {
      rubroId: request.rubroId,
      cuenta: request.cuenta,
      subcuenta: request.subcuenta,
      debeHaber: request.debeHaber,
      auxiliar: request.auxiliar,
      distribucionCosto: request.distribucionCosto,
      dimensionId: request.dimensionId,
    };
  }

  static toUpdatePayload(request: UpdateRubroPlantillaRequest): any {
    return {
      cuenta: request.cuenta,
      subcuenta: request.subcuenta,
      debeHaber: request.debeHaber,
      auxiliar: request.auxiliar,
      distribucionCosto: request.distribucionCosto,
      dimensionId: request.dimensionId,
    };
  }
}
