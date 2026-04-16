import { ReporteirinecdialogResponse, ReporteirinecdialogListResponse, UpdateReporteirinecdialogRequest } from '../../../input/adapter/dto/ReporteirinecdialogDto';

/**
 * API Mapper: ReporteIRINECDialog.zul
 */
export class ReporteirinecdialogApiMapper {

  static toResponse(raw: any): ReporteirinecdialogResponse {
    return {
      id: raw.id,
      empresaId: raw.empresaId,
      empresaNombre: raw.empresaNombre,
      tipo: raw.tipo,
      anio: raw.anio,
      estado: raw.estado,
      fechaGeneracion: raw.fechaGeneracion,
      formato: raw.formato,
      archivoUrl: raw.archivoUrl,
    };
  }

  static toListResponse(raw: any): ReporteirinecdialogListResponse {
    return {
      content: Array.isArray(raw.content) ? raw.content.map(ReporteirinecdialogApiMapper.toResponse) : [],
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 10,
    };
  }

  static toUpdatePayload(request: UpdateReporteirinecdialogRequest): Record<string, unknown> {
    return { ...request };
  }
}
