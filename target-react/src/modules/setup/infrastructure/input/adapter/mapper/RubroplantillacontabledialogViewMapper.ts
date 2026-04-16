import { Rubroplantillacontabledialog, CreateRubroplantillacontabledialog, UpdateRubroplantillacontabledialog, RubroplantillacontabledialogFilter, RubroplantillacontabledialogPageResult } from '../../../../domain/model/Rubroplantillacontabledialog';
import { RubroplantillacontabledialogResponse, RubroplantillacontabledialogListResponse, CreateRubroplantillacontabledialogRequest, UpdateRubroplantillacontabledialogRequest, RubroplantillacontabledialogFilterParams } from '../dto/RubroplantillacontabledialogDto';

export class RubroplantillacontabledialogViewMapper {

  static toDomain(response: RubroplantillacontabledialogResponse): Rubroplantillacontabledialog {
    return {
      plantillaId: response.procesoId,
      rubroId: response.rubroId,
      rubroNombre: response.rubroNombre,
      cuenta: response.cuenta,
      subcuenta: response.subcuenta,
      debeHaber: response.debeHaber,
      auxiliar: response.auxiliar,
      distribucionCosto: response.distribucionCosto,
      dimensionId: response.dimensionId,
      dimensionNombre: response.dimensionNombre,
    };
  }

  static toPageResult(listResponse: RubroplantillacontabledialogListResponse): RubroplantillacontabledialogPageResult {
    return {
      content: listResponse.content.map(RubroplantillacontabledialogViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  static toCreateRequest(model: CreateRubroplantillacontabledialog): CreateRubroplantillacontabledialogRequest {
    return {
      procesoId: model.plantillaId,
      rubroId: model.rubroId,
      cuenta: model.cuenta,
      debeHaber: model.debeHaber,
      subcuenta: model.subcuenta,
      auxiliar: model.auxiliar,
      distribucionCosto: model.distribucionCosto,
      dimensionId: model.dimensionId,
    };
  }

  static toUpdateRequest(model: UpdateRubroplantillacontabledialog): UpdateRubroplantillacontabledialogRequest {
    return {
      cuenta: model.cuenta,
      subcuenta: model.subcuenta,
      auxiliar: model.auxiliar,
      debeHaber: model.debeHaber,
      distribucionCosto: model.distribucionCosto,
      dimensionId: model.dimensionId,
    };
  }

  static toFilterParams(filter: RubroplantillacontabledialogFilter): RubroplantillacontabledialogFilterParams {
    return {
      page: filter.page,
      size: filter.size,
      procesoId: filter.plantillaId,
      rubroId: filter.rubroId,
    };
  }
}
