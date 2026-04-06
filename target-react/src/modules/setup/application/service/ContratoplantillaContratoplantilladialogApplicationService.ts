import { ContratoplantillaContratoplantilladialog, CreateContratoplantillaContratoplantilladialog, UpdateContratoplantillaContratoplantilladialog, ContratoplantillaContratoplantilladialogFilter, ContratoplantillaContratoplantilladialogPageResult } from '../../domain/model/ContratoplantillaContratoplantilladialog';
import { ContratoplantillaContratoplantilladialogUseCase } from '../port/input/ContratoplantillaContratoplantilladialogUseCase';
import { ContratoplantillaContratoplantilladialogGatewayPort } from '../port/output/ContratoplantillaContratoplantilladialogGatewayPort';
import { ContratoplantillaContratoplantilladialogNotFoundError, ContratoplantillaContratoplantilladialogValidationError } from '../../domain/exception/ContratoplantillaContratoplantilladialogError';
import { ContratoplantillaContratoplantilladialogApiMapper } from '../../infrastructure/output/adapter/mapper/ContratoplantillaContratoplantilladialogApiMapper';
import { ContratoplantillaContratoplantilladialogViewMapper } from '../../infrastructure/input/adapter/mapper/ContratoplantillaContratoplantilladialogViewMapper';

/**
 * Application Service: contratoPlantilla.zul / contratoPlantillaDialog.zul (contratoPlantilla_contratoPlantillaDialog)
 *
 * Implementa el Use Case (Input Port).
 * Usa el Gateway Port (Output Port) para comunicación con el backend.
 * Usa los Mappers para transformar entre Domain ↔ DTOs.
 * Contiene la lógica de negocio del frontend: validaciones, transformaciones, orquestación.
 *
 * Controladores fuente: 6
 * Servicios fuente: 0
 *
 * TODO: Copilot — Migra la lógica de negocio desde los controladores/servicios fuente.
 */
export class ContratoplantillaContratoplantilladialogApplicationService implements ContratoplantillaContratoplantilladialogUseCase {

  constructor(private readonly gatewayPort: ContratoplantillaContratoplantilladialogGatewayPort) {}

  // Origen controlador: GET /api/v1/contratos-plantilla — GET /api/v1/contratos-plantilla — Listar plantillas por contrato
  // Origen controlador: GET /api/v1/contratos-plantilla/{id} — GET /api/v1/contratos-plantilla/{id} — Obtener plantilla de contrato por ID
  // Origen controlador: POST /api/v1/contratos-plantilla — POST /api/v1/contratos-plantilla — Crear plantilla de contrato
  // Origen controlador: PUT /api/v1/contratos-plantilla/{id} — PUT /api/v1/contratos-plantilla/{id} — Actualizar plantilla de contrato
  // Origen controlador: DELETE /api/v1/contratos-plantilla/{id} — DELETE /api/v1/contratos-plantilla/{id} — Eliminar plantilla de contrato
  // Origen controlador: POST /api/v1/contratos-plantilla/{id}/archivo — POST /api/v1/contratos-plantilla/{id}/archivo — Subir archivo de plantilla

  async findById(id: string): Promise<ContratoplantillaContratoplantilladialog> {
    if (!id) {
      throw new ContratoplantillaContratoplantilladialogValidationError('El ID es requerido');
    }
    const response = await this.gatewayPort.findById(id);
    return ContratoplantillaContratoplantilladialogViewMapper.toDomain(response);
  }

  async findAll(filter?: ContratoplantillaContratoplantilladialogFilter): Promise<ContratoplantillaContratoplantilladialogPageResult> {
    const params = filter ? ContratoplantillaContratoplantilladialogViewMapper.toFilterParams(filter) : undefined;
    const response = await this.gatewayPort.findAll(params);
    return ContratoplantillaContratoplantilladialogViewMapper.toPageResult(response);
  }

  async create(model: CreateContratoplantillaContratoplantilladialog): Promise<ContratoplantillaContratoplantilladialog> {
    // TODO: Validaciones de negocio antes de crear
    this.validateContratoplantillaContratoplantilladialog(model);
    const request = ContratoplantillaContratoplantilladialogViewMapper.toCreateRequest(model);
    const response = await this.gatewayPort.create(request);
    return ContratoplantillaContratoplantilladialogViewMapper.toDomain(response);
  }

  async update(id: string, model: UpdateContratoplantillaContratoplantilladialog): Promise<ContratoplantillaContratoplantilladialog> {
    if (!id) {
      throw new ContratoplantillaContratoplantilladialogValidationError('El ID es requerido para actualizar');
    }
    // TODO: Validaciones de negocio antes de actualizar
    const request = ContratoplantillaContratoplantilladialogViewMapper.toUpdateRequest(model);
    const response = await this.gatewayPort.update(id, request);
    return ContratoplantillaContratoplantilladialogViewMapper.toDomain(response);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new ContratoplantillaContratoplantilladialogValidationError('El ID es requerido para eliminar');
    }
    await this.gatewayPort.remove(id);
  }

  // ─── Validaciones de negocio ───

  private validateContratoplantillaContratoplantilladialog(model: Partial<ContratoplantillaContratoplantilladialog>): void {
    // TODO: Implementar validaciones de negocio
    // Ejemplo:
    // if (!model.nombre || model.nombre.trim().length === 0) {
    //   throw new ContratoplantillaContratoplantilladialogValidationError('El nombre es obligatorio', 'nombre');
    // }
  }

  // TODO: Agregar métodos de negocio adicionales
  // Ejemplo: procesar lotes, cálculos, orquestación de múltiples llamadas al gateway
}
