import { Comparativonominas, CreateComparativonominas, UpdateComparativonominas, ComparativonominasFilter, ComparativonominasPageResult } from '../../domain/model/Comparativonominas';
import { ComparativonominasUseCase } from '../port/input/ComparativonominasUseCase';
import { ComparativonominasGatewayPort } from '../port/output/ComparativonominasGatewayPort';
import { ComparativonominasNotFoundError, ComparativonominasValidationError } from '../../domain/exception/ComparativonominasError';
import { ComparativonominasApiMapper } from '../../infrastructure/output/adapter/mapper/ComparativonominasApiMapper';
import { ComparativonominasViewMapper } from '../../infrastructure/input/adapter/mapper/ComparativonominasViewMapper';

/**
 * Application Service: comparativoNominas.zul (comparativoNominas)
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
export class ComparativonominasApplicationService implements ComparativonominasUseCase {

  constructor(private readonly gatewayPort: ComparativonominasGatewayPort) {}

  // Origen controlador: GET /api/v1/comparativo-nominas — GET /api/v1/comparativo-nominas — Listar comparativos de nóminas
  // Origen controlador: GET /api/v1/comparativo-nominas/{id} — GET /api/v1/comparativo-nominas/{id} — Obtener comparativo de nómina por ID
  // Origen controlador: POST /api/v1/comparativo-nominas — POST /api/v1/comparativo-nominas — Crear comparativo de nóminas
  // Origen controlador: PUT /api/v1/comparativo-nominas/{id} — PUT /api/v1/comparativo-nominas/{id} — Actualizar comparativo de nóminas
  // Origen controlador: DELETE /api/v1/comparativo-nominas/{id} — DELETE /api/v1/comparativo-nominas/{id} — Eliminar comparativo de nóminas

  async findById(id: string): Promise<Comparativonominas> {
    if (!id) {
      throw new ComparativonominasValidationError('El ID es requerido');
    }
    const response = await this.gatewayPort.findById(id);
    return ComparativonominasViewMapper.toDomain(response);
  }

  async findAll(filter?: ComparativonominasFilter): Promise<ComparativonominasPageResult> {
    const params = filter ? ComparativonominasViewMapper.toFilterParams(filter) : undefined;
    const response = await this.gatewayPort.findAll(params);
    return ComparativonominasViewMapper.toPageResult(response);
  }

  async create(model: CreateComparativonominas): Promise<Comparativonominas> {
    // TODO: Validaciones de negocio antes de crear
    this.validateComparativonominas(model);
    const request = ComparativonominasViewMapper.toCreateRequest(model);
    const response = await this.gatewayPort.create(request);
    return ComparativonominasViewMapper.toDomain(response);
  }

  async update(id: string, model: UpdateComparativonominas): Promise<Comparativonominas> {
    if (!id) {
      throw new ComparativonominasValidationError('El ID es requerido para actualizar');
    }
    // TODO: Validaciones de negocio antes de actualizar
    const request = ComparativonominasViewMapper.toUpdateRequest(model);
    const response = await this.gatewayPort.update(id, request);
    return ComparativonominasViewMapper.toDomain(response);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new ComparativonominasValidationError('El ID es requerido para eliminar');
    }
    await this.gatewayPort.remove(id);
  }

  // ─── Validaciones de negocio ───

  private validateComparativonominas(model: Partial<Comparativonominas>): void {
    // TODO: Implementar validaciones de negocio
    // Ejemplo:
    // if (!model.nombre || model.nombre.trim().length === 0) {
    //   throw new ComparativonominasValidationError('El nombre es obligatorio', 'nombre');
    // }
  }

  // TODO: Agregar métodos de negocio adicionales
  // Ejemplo: procesar lotes, cálculos, orquestación de múltiples llamadas al gateway
}
