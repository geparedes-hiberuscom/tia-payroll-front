/**
 * API Mapper para Plantillas Contables
 * Transforma JSON del backend ↔ DTOs tipados
 */

import {
  CreatePlantillaContableRequest,
  UpdatePlantillaContableRequest,
  PlantillaContableResponse,
  PlantillaContablePageResponse,
} from '../../../input/adapter/dto/PlantillaContableDto';

export class PlantillaContableApiMapper {
  static toResponse(raw: any): PlantillaContableResponse {
    return {
      id: raw.id,
      procesoId: raw.procesoId,
      procesoNombre: raw.procesoNombre,
      rubroId: raw.rubroId,
      rubroNombre: raw.rubroNombre,
      cuenta: raw.cuenta,
      subcuenta: raw.subcuenta,
      auxiliar: raw.auxiliar,
      debeHaber: raw.debeHaber,
      distribucionCosto: raw.distribucionCosto,
      rpt: raw.rpt,
      tcDmCentroCosto: raw.tcDmCentroCosto,
      tcDmLocalidad: raw.tcDmLocalidad,
      agrupacionCC: raw.agrupacionCC,
      agrupacionLoc: raw.agrupacionLoc,
      dimensionId: raw.dimensionId,
      dimensionNombre: raw.dimensionNombre,
    };
  }

  static toListResponse(raw: any): PlantillaContablePageResponse {
    return {
      content: (raw.content || []).map((item: any) => this.toResponse(item)),
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 0,
    };
  }

  static toCreatePayload(request: CreatePlantillaContableRequest): any {
    return {
      procesoId: request.procesoId,
      rubroId: request.rubroId,
      cuenta: request.cuenta,
      subcuenta: request.subcuenta,
      auxiliar: request.auxiliar,
      debeHaber: request.debeHaber,
      distribucionCosto: request.distribucionCosto,
      rpt: request.rpt,
      tcDmCentroCosto: request.tcDmCentroCosto,
      tcDmLocalidad: request.tcDmLocalidad,
      agrupacionCC: request.agrupacionCC,
      agrupacionLoc: request.agrupacionLoc,
      dimensionId: request.dimensionId,
    };
  }

  static toUpdatePayload(request: UpdatePlantillaContableRequest): any {
    return {
      cuenta: request.cuenta,
      subcuenta: request.subcuenta,
      auxiliar: request.auxiliar,
      debeHaber: request.debeHaber,
      distribucionCosto: request.distribucionCosto,
      rpt: request.rpt,
      tcDmCentroCosto: request.tcDmCentroCosto,
      tcDmLocalidad: request.tcDmLocalidad,
      agrupacionCC: request.agrupacionCC,
      agrupacionLoc: request.agrupacionLoc,
      dimensionId: request.dimensionId,
    };
  }
}
