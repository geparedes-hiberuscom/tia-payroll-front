import { ReporteirinecdialogResponse, ReporteirinecdialogListResponse, GenerarReporteirinecdialogRequest, ProcesoReporteirinecdialogResponse, UpdateReporteirinecdialogRequest, ReporteirinecdialogFilterParams } from '../../infrastructure/input/adapter/dto/ReporteirinecdialogDto';

/**
 * Gateway Port (Output Port): ReporteIRINECDialog.zul
 * Endpoints:
 *   GET    /api/v1/reportes-ir-inec
 *   GET    /api/v1/reportes-ir-inec/{id}
 *   POST   /api/v1/reportes-ir-inec/generar
 *   PUT    /api/v1/reportes-ir-inec/{id}
 *   DELETE /api/v1/reportes-ir-inec/{id}
 */
export interface ReporteirinecdialogGatewayPort {
  findById(id: number): Promise<ReporteirinecdialogResponse>;
  findAll(params?: ReporteirinecdialogFilterParams): Promise<ReporteirinecdialogListResponse>;
  generar(request: GenerarReporteirinecdialogRequest): Promise<ProcesoReporteirinecdialogResponse>;
  update(id: number, request: UpdateReporteirinecdialogRequest): Promise<ReporteirinecdialogResponse>;
  remove(id: number): Promise<void>;
}
