import { Gastospersonalesdialog, CreateGastospersonalesdialog, UpdateGastospersonalesdialog, GastospersonalesdialogFilter, GastospersonalesdialogPageResult } from '../../domain/model/Gastospersonalesdialog';
import { GastospersonalesdialogUseCase } from '../port/input/GastospersonalesdialogUseCase';
import { GastospersonalesdialogGatewayPort } from '../port/output/GastospersonalesdialogGatewayPort';
import { GastospersonalesdialogNotFoundError, GastospersonalesdialogValidationError } from '../../domain/exception/GastospersonalesdialogError';
import { GastospersonalesdialogApiMapper } from '../../infrastructure/output/adapter/mapper/GastospersonalesdialogApiMapper';
import { GastospersonalesdialogViewMapper } from '../../infrastructure/input/adapter/mapper/GastospersonalesdialogViewMapper';

/**
 * Application Service: GastosPersonalesDialog.zul (GastosPersonalesDialog)
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
export class GastospersonalesdialogApplicationService implements GastospersonalesdialogUseCase {

  constructor(private readonly gatewayPort: GastospersonalesdialogGatewayPort) {}

  // Origen controlador: GET /api/v1/gastos-personales — GET /api/v1/gastos-personales — Listar gastos personales
  // Origen controlador: GET /api/v1/gastos-personales/{id} — GET /api/v1/gastos-personales/{id} — Obtener gasto personal por ID
  // Origen controlador: POST /api/v1/gastos-personales — POST /api/v1/gastos-personales — Crear gasto personal
  // Origen controlador: PUT /api/v1/gastos-personales/{id} — PUT /api/v1/gastos-personales/{id} — Actualizar gasto personal
  // Origen controlador: DELETE /api/v1/gastos-personales/{id} — DELETE /api/v1/gastos-personales/{id} — Eliminar gasto personal

  async findById(id: string): Promise<Gastospersonalesdialog> {
    if (!id) {
      throw new GastospersonalesdialogValidationError('El ID es requerido');
    }
    const response = await this.gatewayPort.findById(id);
    return GastospersonalesdialogViewMapper.toDomain(response);
  }

  async findAll(filter?: GastospersonalesdialogFilter): Promise<GastospersonalesdialogPageResult> {
    const params = filter ? GastospersonalesdialogViewMapper.toFilterParams(filter) : undefined;
    const response = await this.gatewayPort.findAll(params);
    return GastospersonalesdialogViewMapper.toPageResult(response);
  }

  async create(model: CreateGastospersonalesdialog): Promise<Gastospersonalesdialog> {
    // TODO: Validaciones de negocio antes de crear
    this.validateGastospersonalesdialog(model);
    const request = GastospersonalesdialogViewMapper.toCreateRequest(model);
    const response = await this.gatewayPort.create(request);
    return GastospersonalesdialogViewMapper.toDomain(response);
  }

  async update(id: string, model: UpdateGastospersonalesdialog): Promise<Gastospersonalesdialog> {
    if (!id) {
      throw new GastospersonalesdialogValidationError('El ID es requerido para actualizar');
    }
    // TODO: Validaciones de negocio antes de actualizar
    const request = GastospersonalesdialogViewMapper.toUpdateRequest(model);
    const response = await this.gatewayPort.update(id, request);
    return GastospersonalesdialogViewMapper.toDomain(response);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new GastospersonalesdialogValidationError('El ID es requerido para eliminar');
    }
    await this.gatewayPort.remove(id);
  }

  // ─── Validaciones de negocio ───

  private validateGastospersonalesdialog(model: Partial<Gastospersonalesdialog>): void {
    // TODO: Implementar validaciones de negocio
    // Ejemplo:
    // if (!model.nombre || model.nombre.trim().length === 0) {
    //   throw new GastospersonalesdialogValidationError('El nombre es obligatorio', 'nombre');
    // }
  }

  // TODO: Agregar métodos de negocio adicionales
  // Ejemplo: procesar lotes, cálculos, orquestación de múltiples llamadas al gateway
}
