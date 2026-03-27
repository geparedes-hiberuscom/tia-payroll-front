import { NominaresumengeneralResumengralnominadialog, CreateNominaresumengeneralResumengralnominadialog, UpdateNominaresumengeneralResumengralnominadialog, NominaresumengeneralResumengralnominadialogFilter, NominaresumengeneralResumengralnominadialogPageResult } from '../../domain/model/NominaresumengeneralResumengralnominadialog';
import { NominaresumengeneralResumengralnominadialogUseCase } from '../port/input/NominaresumengeneralResumengralnominadialogUseCase';
import { NominaresumengeneralResumengralnominadialogGatewayPort } from '../port/output/NominaresumengeneralResumengralnominadialogGatewayPort';
import { NominaresumengeneralResumengralnominadialogNotFoundError, NominaresumengeneralResumengralnominadialogValidationError } from '../../domain/exception/NominaresumengeneralResumengralnominadialogError';
import { NominaresumengeneralResumengralnominadialogApiMapper } from '../../infrastructure/output/adapter/mapper/NominaresumengeneralResumengralnominadialogApiMapper';
import { NominaresumengeneralResumengralnominadialogViewMapper } from '../../infrastructure/input/adapter/mapper/NominaresumengeneralResumengralnominadialogViewMapper';

/**
 * Application Service: nominaresumenGeneral.zul / ResumenGralNominaDialog.zul (nominaresumenGeneral_ResumenGralNominaDialog)
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
export class NominaresumengeneralResumengralnominadialogApplicationService implements NominaresumengeneralResumengralnominadialogUseCase {

  constructor(private readonly gatewayPort: NominaresumengeneralResumengralnominadialogGatewayPort) {}

  // Origen controlador: GET /api/v1/nomina-resumen — GET /api/v1/nomina-resumen — Obtener resumen general de nómina
  // Origen controlador: GET /api/v1/nomina-resumen/{ejecucionId} — GET /api/v1/nomina-resumen/{ejecucionId} — Obtener resumen detallado de nómina
  // Origen controlador: POST /api/v1/nomina-resumen/generar — POST /api/v1/nomina-resumen/generar — Generar resumen de nómina
  // Origen controlador: POST /api/v1/nomina-resumen/exportar — POST /api/v1/nomina-resumen/exportar — Exportar resumen general de nómina
  // Origen controlador: DELETE /api/v1/nomina-resumen/{ejecucionId} — DELETE /api/v1/nomina-resumen/{ejecucionId} — Eliminar resumen de nómina

  async findById(id: string): Promise<NominaresumengeneralResumengralnominadialog> {
    if (!id) {
      throw new NominaresumengeneralResumengralnominadialogValidationError('El ID es requerido');
    }
    const response = await this.gatewayPort.findById(id);
    return NominaresumengeneralResumengralnominadialogViewMapper.toDomain(response);
  }

  async findAll(filter?: NominaresumengeneralResumengralnominadialogFilter): Promise<NominaresumengeneralResumengralnominadialogPageResult> {
    const params = filter ? NominaresumengeneralResumengralnominadialogViewMapper.toFilterParams(filter) : undefined;
    const response = await this.gatewayPort.findAll(params);
    return NominaresumengeneralResumengralnominadialogViewMapper.toPageResult(response);
  }

  async create(model: CreateNominaresumengeneralResumengralnominadialog): Promise<NominaresumengeneralResumengralnominadialog> {
    // TODO: Validaciones de negocio antes de crear
    this.validateNominaresumengeneralResumengralnominadialog(model);
    const request = NominaresumengeneralResumengralnominadialogViewMapper.toCreateRequest(model);
    const response = await this.gatewayPort.create(request);
    return NominaresumengeneralResumengralnominadialogViewMapper.toDomain(response);
  }

  async update(id: string, model: UpdateNominaresumengeneralResumengralnominadialog): Promise<NominaresumengeneralResumengralnominadialog> {
    if (!id) {
      throw new NominaresumengeneralResumengralnominadialogValidationError('El ID es requerido para actualizar');
    }
    // TODO: Validaciones de negocio antes de actualizar
    const request = NominaresumengeneralResumengralnominadialogViewMapper.toUpdateRequest(model);
    const response = await this.gatewayPort.update(id, request);
    return NominaresumengeneralResumengralnominadialogViewMapper.toDomain(response);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new NominaresumengeneralResumengralnominadialogValidationError('El ID es requerido para eliminar');
    }
    await this.gatewayPort.remove(id);
  }

  // ─── Validaciones de negocio ───

  private validateNominaresumengeneralResumengralnominadialog(model: Partial<NominaresumengeneralResumengralnominadialog>): void {
    if (!model.ejecucionId) {
      throw new NominaresumengeneralResumengralnominadialogValidationError('El ejecucionId es obligatorio', 'ejecucionId');
    }
    if (!model.empresaId) {
      throw new NominaresumengeneralResumengralnominadialogValidationError('El empresaId es obligatorio', 'empresaId');
    }
    if (model.totalIngresos !== undefined && model.totalIngresos < 0) {
      throw new NominaresumengeneralResumengralnominadialogValidationError('totalIngresos no puede ser negativo', 'totalIngresos');
    }
    if (model.totalEgresos !== undefined && model.totalEgresos < 0) {
      throw new NominaresumengeneralResumengralnominadialogValidationError('totalEgresos no puede ser negativo', 'totalEgresos');
    }
  }

  // TODO: Agregar métodos de negocio para resumen general
  // Ejemplo: procesar lotes, cálculos, orquestación de múltiples llamadas al gateway
}
