import { PlantillacontablePlantillacontabledialogResponse, PlantillacontablePlantillacontabledialogListResponse, CreatePlantillacontablePlantillacontabledialogRequest, UpdatePlantillacontablePlantillacontabledialogRequest } from '../../../input/adapter/dto/PlantillacontablePlantillacontabledialogDto';

/**
 * API Mapper: plantillaContable.zul / plantillaContableDialog.zul
 */
export class PlantillacontablePlantillacontabledialogApiMapper {

  static toResponse(raw: any): PlantillacontablePlantillacontabledialogResponse {
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

  static toListResponse(raw: any): PlantillacontablePlantillacontabledialogListResponse {
    return {
      content: Array.isArray(raw.content) ? raw.content.map(PlantillacontablePlantillacontabledialogApiMapper.toResponse) : [],
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 10,
    };
  }

  static toCreatePayload(request: CreatePlantillacontablePlantillacontabledialogRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdatePlantillacontablePlantillacontabledialogRequest): Record<string, unknown> {
    return { ...request };
  }
}
