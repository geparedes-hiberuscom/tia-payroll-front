import { ReporteirinecdialogResponse, ReporteirinecdialogListResponse, CreateReporteirinecdialogRequest, UpdateReporteirinecdialogRequest, ReporteirinecdialogFilterParams } from '../../infrastructure/input/adapter/dto/ReporteirinecdialogDto';

/**
 * Gateway Port (Output Port): ReporteIRINECDialog.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
  // GET /api/v1/reportes-ir-inec — Listar reportes IR/INEC disponibles
  // GET /api/v1/reportes-ir-inec/{id} — Obtener reporte IR/INEC por ID
  // POST /api/v1/reportes-ir-inec/generar — Generar reporte IR/INEC
  // PUT /api/v1/reportes-ir-inec/{id} — Actualizar reporte IR/INEC
  // DELETE /api/v1/reportes-ir-inec/{id} — Eliminar reporte IR/INEC
 */
export interface ReporteirinecdialogGatewayPort {
  findById(id: string): Promise<ReporteirinecdialogResponse>;
  findAll(params?: ReporteirinecdialogFilterParams): Promise<ReporteirinecdialogListResponse>;
  create(request: CreateReporteirinecdialogRequest): Promise<ReporteirinecdialogResponse>;
  update(id: string, request: UpdateReporteirinecdialogRequest): Promise<ReporteirinecdialogResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
