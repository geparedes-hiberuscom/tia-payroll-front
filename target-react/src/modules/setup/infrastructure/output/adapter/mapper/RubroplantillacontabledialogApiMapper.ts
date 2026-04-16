import { RubroplantillacontabledialogResponse, RubroplantillacontabledialogListResponse, CreateRubroplantillacontabledialogRequest, UpdateRubroplantillacontabledialogRequest } from '../../../input/adapter/dto/RubroplantillacontabledialogDto';

/**
 * API Mapper: rubroplantillaContableDialog.zul
 */
export class RubroplantillacontabledialogApiMapper {

  static toResponse(raw: any): RubroplantillacontabledialogResponse {
    return {
      id: raw.id,
      procesoId: raw.procesoId,
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

  static toListResponse(raw: any): RubroplantillacontabledialogListResponse {
    return {
      content: Array.isArray(raw.content) ? raw.content.map(RubroplantillacontabledialogApiMapper.toResponse) : [],
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 10,
    };
  }

  static toCreatePayload(request: CreateRubroplantillacontabledialogRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateRubroplantillacontabledialogRequest): Record<string, unknown> {
    return { ...request };
  }
}
