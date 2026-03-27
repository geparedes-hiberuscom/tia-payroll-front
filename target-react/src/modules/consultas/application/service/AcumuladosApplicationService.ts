import { Acumulados, CreateAcumulados, UpdateAcumulados, AcumuladosFilter, AcumuladosPageResult } from '../../domain/model/Acumulados';
import { AcumuladosUseCase } from '../port/input/AcumuladosUseCase';
import { AcumuladosGatewayPort } from '../port/output/AcumuladosGatewayPort';
import { AcumuladosNotFoundError, AcumuladosValidationError } from '../../domain/exception/AcumuladosError';
import { AcumuladosApiMapper } from '../../infrastructure/output/adapter/mapper/AcumuladosApiMapper';
import { AcumuladosViewMapper } from '../../infrastructure/input/adapter/mapper/AcumuladosViewMapper';

/**
 * Application Service: acumulados.zul (acumulados)
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
export class AcumuladosApplicationService implements AcumuladosUseCase {

  constructor(private readonly gatewayPort: AcumuladosGatewayPort) {}

  // Origen controlador: GET /api/v1/acumulados — GET /api/v1/acumulados — Listar acumulados de nómina
  // Origen controlador: GET /api/v1/acumulados/{id} — GET /api/v1/acumulados/{id} — Obtener acumulado por ID
  // Origen controlador: POST /api/v1/acumulados — POST /api/v1/acumulados — Crear acumulado de nómina
  // Origen controlador: PUT /api/v1/acumulados/{id} — PUT /api/v1/acumulados/{id} — Actualizar acumulado de nómina
  // Origen controlador: DELETE /api/v1/acumulados/{id} — DELETE /api/v1/acumulados/{id} — Eliminar acumulado de nómina

  async findById(id: string): Promise<Acumulados> {
    if (!id) {
      throw new AcumuladosValidationError('El ID es requerido');
    }
    const response = await this.gatewayPort.findById(id);
    return AcumuladosViewMapper.toDomain(response);
  }

  async findAll(filter?: AcumuladosFilter): Promise<AcumuladosPageResult> {
    const params = filter ? AcumuladosViewMapper.toFilterParams(filter) : undefined;
    const response = await this.gatewayPort.findAll(params);
    return AcumuladosViewMapper.toPageResult(response);
  }

  async create(model: CreateAcumulados): Promise<Acumulados> {
    // TODO: Validaciones de negocio antes de crear
    this.validateAcumulados(model);
    const request = AcumuladosViewMapper.toCreateRequest(model);
    const response = await this.gatewayPort.create(request);
    return AcumuladosViewMapper.toDomain(response);
  }

  async update(id: string, model: UpdateAcumulados): Promise<Acumulados> {
    if (!id) {
      throw new AcumuladosValidationError('El ID es requerido para actualizar');
    }
    // TODO: Validaciones de negocio antes de actualizar
    const request = AcumuladosViewMapper.toUpdateRequest(model);
    const response = await this.gatewayPort.update(id, request);
    return AcumuladosViewMapper.toDomain(response);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new AcumuladosValidationError('El ID es requerido para eliminar');
    }
    await this.gatewayPort.remove(id);
  }

  // ─── Validaciones de negocio ───

  private validateAcumulados(model: Partial<Acumulados>): void {
    // TODO: Implementar validaciones de negocio
    // Ejemplo:
    // if (!model.nombre || model.nombre.trim().length === 0) {
    //   throw new AcumuladosValidationError('El nombre es obligatorio', 'nombre');
    // }
  }

  // TODO: Agregar métodos de negocio adicionales
  // Ejemplo: procesar lotes, cálculos, orquestación de múltiples llamadas al gateway
}
