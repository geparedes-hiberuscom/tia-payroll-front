import { NominaxcolabprelistNominaxcolabpredialogResponse, NominaxcolabprelistNominaxcolabpredialogListResponse, CreateNominaxcolabprelistNominaxcolabpredialogRequest, RubroPreLiquidadoDTO, DetallePreColabResponseDTO, ExportResponseDTO } from '../../../input/adapter/dto/NominaxcolabprelistNominaxcolabpredialogDto';

export class NominaxcolabprelistNominaxcolabpredialogApiMapper {

  static toResponse(raw: any): NominaxcolabprelistNominaxcolabpredialogResponse {
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

  static toListResponse(raw: any): NominaxcolabprelistNominaxcolabpredialogListResponse {
    return {
      data: (raw.content || raw.data || []).map((item: any) => NominaxcolabprelistNominaxcolabpredialogApiMapper.toResponse(item)),
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 20,
    };
  }

  static toRubroPreLiquidadoList(raw: any): RubroPreLiquidadoDTO[] {
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
      flagEnvio: item.flagEnvio,
      usuarioIngreso: item.usuarioIngreso,
      fechaIngreso: item.fechaIngreso,
    }));
  }

  static toDetallePreColabResponse(raw: any): DetallePreColabResponseDTO {
    return {
      ejecucionId: raw.ejecucionId,
      colaboradorId: raw.colaboradorId,
      cedula: raw.cedula,
      apellidosNombres: raw.apellidosNombres,
      empresaId: raw.empresaId,
      sueldo: raw.sueldo,
      fechaIngreso: raw.fechaIngreso,
      cargo: raw.cargo,
      localidad: raw.localidad,
      centroCosto: raw.centroCosto,
      totalesPre: raw.totalesPre,
      totalesHis: raw.totalesHis,
      rubrosPre: raw.rubrosPre || [],
      rubrosHis: raw.rubrosHis || [],
    };
  }

  static toExportPayload(request: CreateNominaxcolabprelistNominaxcolabpredialogRequest): Record<string, unknown> {
    return {
      ejecucionId: request.ejecucionId,
      empresaId: request.empresaId,
      formato: request.formato || 'XLSX',
    };
  }
}
