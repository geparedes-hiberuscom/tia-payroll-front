import { PlantillacontablePlantillacontabledialog, CreatePlantillacontablePlantillacontabledialog, UpdatePlantillacontablePlantillacontabledialog, PlantillacontablePlantillacontabledialogFilter, PlantillacontablePlantillacontabledialogPageResult } from '../../../../domain/model/PlantillacontablePlantillacontabledialog';
import { PlantillacontablePlantillacontabledialogResponse, PlantillacontablePlantillacontabledialogListResponse, CreatePlantillacontablePlantillacontabledialogRequest, UpdatePlantillacontablePlantillacontabledialogRequest, PlantillacontablePlantillacontabledialogFilterParams } from '../dto/PlantillacontablePlantillacontabledialogDto';

export class PlantillacontablePlantillacontabledialogViewMapper {

  static toDomain(response: PlantillacontablePlantillacontabledialogResponse): PlantillacontablePlantillacontabledialog {
    return {
      id: response.id,
      procesoId: response.procesoId,
      procesoNombre: response.procesoNombre,
      rubroId: response.rubroId,
      rubroNombre: response.rubroNombre,
      cuenta: response.cuenta,
      subcuenta: response.subcuenta,
      auxiliar: response.auxiliar,
      debeHaber: response.debeHaber,
      distribucionCosto: response.distribucionCosto,
      rpt: response.rpt,
      tcDmCentroCosto: response.tcDmCentroCosto,
      tcDmLocalidad: response.tcDmLocalidad,
      agrupacionCC: response.agrupacionCC,
      agrupacionLoc: response.agrupacionLoc,
      dimensionId: response.dimensionId,
      dimensionNombre: response.dimensionNombre,
    };
  }

  static toPageResult(listResponse: PlantillacontablePlantillacontabledialogListResponse): PlantillacontablePlantillacontabledialogPageResult {
    return {
      content: listResponse.content.map(PlantillacontablePlantillacontabledialogViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  static toCreateRequest(model: CreatePlantillacontablePlantillacontabledialog): CreatePlantillacontablePlantillacontabledialogRequest {
    return {
      rubroId: model.rubroId,
      procesoId: model.procesoId,
      cuenta: model.cuenta,
      debeHaber: model.debeHaber,
      subcuenta: model.subcuenta,
      auxiliar: model.auxiliar,
      distribucionCosto: model.distribucionCosto,
      rpt: model.rpt,
      tcDmCentroCosto: model.tcDmCentroCosto,
      tcDmLocalidad: model.tcDmLocalidad,
      agrupacionCC: model.agrupacionCC,
      agrupacionLoc: model.agrupacionLoc,
      dimensionId: model.dimensionId,
    };
  }

  static toUpdateRequest(model: UpdatePlantillacontablePlantillacontabledialog): UpdatePlantillacontablePlantillacontabledialogRequest {
    return {
      cuenta: model.cuenta,
      subcuenta: model.subcuenta,
      auxiliar: model.auxiliar,
      debeHaber: model.debeHaber,
      distribucionCosto: model.distribucionCosto,
      rpt: model.rpt,
      tcDmCentroCosto: model.tcDmCentroCosto,
      tcDmLocalidad: model.tcDmLocalidad,
      agrupacionCC: model.agrupacionCC,
      agrupacionLoc: model.agrupacionLoc,
      dimensionId: model.dimensionId,
    };
  }

  static toFilterParams(filter: PlantillacontablePlantillacontabledialogFilter): PlantillacontablePlantillacontabledialogFilterParams {
    return {
      page: filter.page,
      size: filter.size,
      procesoId: filter.procesoId,
      rubroId: filter.rubroId,
      cuenta: filter.cuenta,
    };
  }
}
