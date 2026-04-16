import { NominaxcolablistResponse, NominaxcolablistListResponse, CreateNominaxcolablistRequest, RubroHistoricoDTO } from '../../../input/adapter/dto/NominaxcolablistDto';

/**
 * API Mapper: nominaxColabList.zul
 * Transforma: raw API responses ↔ typed DTOs
 */
export class NominaxcolablistApiMapper {

  static toResponse(raw: any): NominaxcolablistResponse {
    return {
      ejecucionId: raw.ejecucionId,
      colaboradorId: raw.colaboradorId,
      cedula: raw.cedula,
      apellidosNombres: raw.apellidosNombres,
      empresaId: raw.empresaId,
      totalIngresos: raw.totalIngresos,
      totalEgresos: raw.totalEgresos,
      totalNeto: raw.totalNeto,
      totalRubros: raw.totalRubros,
      totalNoDeducible: raw.totalNoDeducible,
    };
  }

  static toListResponse(raw: any): NominaxcolablistListResponse {
    return {
      data: (raw.content || raw.data || []).map((item: any) => NominaxcolablistApiMapper.toResponse(item)),
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 20,
    };
  }

  static toRubroHistoricoList(raw: any): RubroHistoricoDTO[] {
    const items = raw.items || raw.content || raw || [];
    return items.map((item: any) => ({
      ejecucionId: item.ejecucionId,
      colaboradorId: item.colaboradorId,
      rubroId: item.rubroId,
      rubroNombre: item.rubroNombre,
      efecto: item.efecto,
      valorSalida01: item.valorSalida01,
      valorSalida02: item.valorSalida02,
      valorSalida03: item.valorSalida03,
      valorSalida04: item.valorSalida04,
      valorSalida05: item.valorSalida05,
      fechaInicioSalida: item.fechaInicioSalida,
      fechaFinSalida: item.fechaFinSalida,
      rubrosIdoUplId: item.rubrosIdoUplId,
      usuarioIngreso: item.usuarioIngreso,
      fechaIngreso: item.fechaIngreso,
    }));
  }

  static toExportPayload(request: CreateNominaxcolablistRequest): Record<string, unknown> {
    return {
      ejecucionId: request.ejecucionId,
      empresaId: request.empresaId,
      formato: request.formato || 'XLSX',
    };
  }
}
