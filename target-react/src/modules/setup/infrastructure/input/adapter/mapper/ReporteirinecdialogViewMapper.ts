import { Reporteirinecdialog, UpdateReporteirinecdialog, ReporteirinecdialogFilter, ReporteirinecdialogPageResult } from '../../../../domain/model/Reporteirinecdialog';
import { ReporteirinecdialogResponse, ReporteirinecdialogListResponse, UpdateReporteirinecdialogRequest, ReporteirinecdialogFilterParams } from '../dto/ReporteirinecdialogDto';

export class ReporteirinecdialogViewMapper {

  static toDomain(response: ReporteirinecdialogResponse): Reporteirinecdialog {
    return {
      id: response.id,
      empresaId: response.empresaId,
      empresaNombre: response.empresaNombre,
      tipo: response.tipo,
      anio: response.anio,
      estado: response.estado,
      fechaGeneracion: response.fechaGeneracion ? new Date(response.fechaGeneracion) : undefined,
      formato: response.formato,
      archivoUrl: response.archivoUrl,
    };
  }

  static toPageResult(listResponse: ReporteirinecdialogListResponse): ReporteirinecdialogPageResult {
    return {
      content: listResponse.content.map(ReporteirinecdialogViewMapper.toDomain),
      totalElements: listResponse.totalElements,
      totalPages: listResponse.totalPages,
      page: listResponse.page,
      size: listResponse.size,
    };
  }

  static toUpdateRequest(model: UpdateReporteirinecdialog): UpdateReporteirinecdialogRequest {
    return {
      estado: model.estado,
      formato: model.formato,
    };
  }

  static toFilterParams(filter: ReporteirinecdialogFilter): ReporteirinecdialogFilterParams {
    return {
      page: filter.page,
      size: filter.size,
      empresaId: filter.empresaId,
      tipo: filter.tipo,
    };
  }
}
