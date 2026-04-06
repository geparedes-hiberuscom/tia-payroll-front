import { Reporteirinecdialog, CreateReporteirinecdialog, UpdateReporteirinecdialog, ReporteirinecdialogFilter, ReporteirinecdialogPageResult } from '../../domain/model/Reporteirinecdialog';
import { ReporteirinecdialogUseCase } from '../port/input/ReporteirinecdialogUseCase';
import { ReporteirinecdialogGatewayPort } from '../port/output/ReporteirinecdialogGatewayPort';
import { ReporteirinecdialogNotFoundError, ReporteirinecdialogValidationError } from '../../domain/exception/ReporteirinecdialogError';
import { ReporteirinecdialogApiMapper } from '../../infrastructure/output/adapter/mapper/ReporteirinecdialogApiMapper';
import { ReporteirinecdialogViewMapper } from '../../infrastructure/input/adapter/mapper/ReporteirinecdialogViewMapper';

/**
 * Application Service: ReporteIRINECDialog.zul (ReporteIRINECDialog)
 *
 * Implementa el Use Case (Input Port).
 * Usa el Gateway Port (Output Port) para comunicación con el backend.
 * Usa los Mappers para transformar entre Domain ↔ DTOs.
 * Contiene la lógica de negocio del frontend: validaciones, transformaciones, orquestación.
 *
 * Controladores fuente: 5
 * Servicios fuente: 0
 *
 * TODO: Copilot — Migra la lógica de negocio desde los controladores/servicios fuente.
 */
export class ReporteirinecdialogApplicationService implements ReporteirinecdialogUseCase {

  constructor(private readonly gatewayPort: ReporteirinecdialogGatewayPort) {}

  // Origen controlador: GET /api/v1/reportes-ir-inec — GET /api/v1/reportes-ir-inec — Listar reportes IR/INEC disponibles
  // Origen controlador: GET /api/v1/reportes-ir-inec/{id} — GET /api/v1/reportes-ir-inec/{id} — Obtener reporte IR/INEC por ID
  // Origen controlador: POST /api/v1/reportes-ir-inec/generar — POST /api/v1/reportes-ir-inec/generar — Generar reporte IR/INEC
  // Origen controlador: PUT /api/v1/reportes-ir-inec/{id} — PUT /api/v1/reportes-ir-inec/{id} — Actualizar reporte IR/INEC
  // Origen controlador: DELETE /api/v1/reportes-ir-inec/{id} — DELETE /api/v1/reportes-ir-inec/{id} — Eliminar reporte IR/INEC

  async findById(id: string): Promise<Reporteirinecdialog> {
    if (!id) {
      throw new ReporteirinecdialogValidationError('El ID es requerido');
    }
    const response = await this.gatewayPort.findById(id);
    return ReporteirinecdialogViewMapper.toDomain(response);
  }

  async findAll(filter?: ReporteirinecdialogFilter): Promise<ReporteirinecdialogPageResult> {
    const params = filter ? ReporteirinecdialogViewMapper.toFilterParams(filter) : undefined;
    const response = await this.gatewayPort.findAll(params);
    return ReporteirinecdialogViewMapper.toPageResult(response);
  }

  async create(model: CreateReporteirinecdialog): Promise<Reporteirinecdialog> {
    this.validateReporteirinecdialog(model);
    const request = ReporteirinecdialogViewMapper.toCreateRequest(model);
    const response = await this.gatewayPort.create(request);
    return ReporteirinecdialogViewMapper.toDomain(response);
  }

  async update(id: string, model: UpdateReporteirinecdialog): Promise<Reporteirinecdialog> {
    if (!id) {
      throw new ReporteirinecdialogValidationError('El ID es requerido para actualizar');
    }
    const request = ReporteirinecdialogViewMapper.toUpdateRequest(model);
    const response = await this.gatewayPort.update(id, request);
    return ReporteirinecdialogViewMapper.toDomain(response);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new ReporteirinecdialogValidationError('El ID es requerido para eliminar');
    }
    await this.gatewayPort.remove(id);
  }

  // ─── Validaciones de negocio ───

  private validateReporteirinecdialog(model: Partial<Reporteirinecdialog>): void {
    // Ejemplo:
    // if (!model.nombre || model.nombre.trim().length === 0) {
    //   throw new ReporteirinecdialogValidationError('El nombre es obligatorio', 'nombre');
    // }
  }

  // Ejemplo: procesar lotes, cálculos, orquestación de múltiples llamadas al gateway
}
