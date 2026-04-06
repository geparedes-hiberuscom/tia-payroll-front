import { ReporteirinecdialogGatewayPort } from '../port/output/ReporteirinecdialogGatewayPort';
import { ReporteirinecdialogResponse, ReporteirinecdialogListResponse, CreateReporteirinecdialogRequest, UpdateReporteirinecdialogRequest, ReporteirinecdialogFilterParams } from '../../infrastructure/input/adapter/dto/ReporteirinecdialogDto';

/**
 * Application Service: ReporteIRINECDialog.zul (ReporteIRINECDialog)
 * Implementa la lógica de aplicación invocando el Gateway Port (puerto de salida).
 * Controladores fuente: 5
 * Servicios fuente: 0
 *
 * TODO: Copilot — Implementa lógica de negocio adicional (validaciones, transformaciones).
 */
export class ReporteirinecdialogService {
  constructor(private readonly gateway: ReporteirinecdialogGatewayPort) {}

  // Origen controlador: GET /api/v1/reportes-ir-inec — GET /api/v1/reportes-ir-inec — Listar reportes IR/INEC disponibles
  // Origen controlador: GET /api/v1/reportes-ir-inec/{id} — GET /api/v1/reportes-ir-inec/{id} — Obtener reporte IR/INEC por ID
  // Origen controlador: POST /api/v1/reportes-ir-inec/generar — POST /api/v1/reportes-ir-inec/generar — Generar reporte IR/INEC
  // Origen controlador: PUT /api/v1/reportes-ir-inec/{id} — PUT /api/v1/reportes-ir-inec/{id} — Actualizar reporte IR/INEC
  // Origen controlador: DELETE /api/v1/reportes-ir-inec/{id} — DELETE /api/v1/reportes-ir-inec/{id} — Eliminar reporte IR/INEC

  async findById(id: string): Promise<ReporteirinecdialogResponse> {
    return this.gateway.findById(id);
  }

  async findAll(params?: ReporteirinecdialogFilterParams): Promise<ReporteirinecdialogListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateReporteirinecdialogRequest): Promise<ReporteirinecdialogResponse> {
    // TODO: Validaciones de negocio antes de crear
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateReporteirinecdialogRequest): Promise<ReporteirinecdialogResponse> {
    // TODO: Validaciones de negocio antes de actualizar
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    return this.gateway.remove(id);
  }

  // TODO: Agregar métodos de negocio adicionales que combinen llamadas al gateway
}
