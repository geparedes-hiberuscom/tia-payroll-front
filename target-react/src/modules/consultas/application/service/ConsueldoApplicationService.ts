import { Consueldo, CreateConsueldo, UpdateConsueldo, ConsueldoFilter, ConsueldoPageResult } from '../../domain/model/Consueldo';
import { ConsueldoUseCase } from '../port/input/ConsueldoUseCase';
import { ConsueldoGatewayPort } from '../port/output/ConsueldoGatewayPort';
import { ConsueldoNotFoundError, ConsueldoValidationError } from '../../domain/exception/ConsueldoError';
import { ConsueldoApiMapper } from '../../infrastructure/output/adapter/mapper/ConsueldoApiMapper';
import { ConsueldoViewMapper } from '../../infrastructure/input/adapter/mapper/ConsueldoViewMapper';

/**
 * Application Service: conSueldo.zul (conSueldo)
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
export class ConsueldoApplicationService implements ConsueldoUseCase {

  constructor(private readonly gatewayPort: ConsueldoGatewayPort) {}

  // Origen controlador: GET /api/v1/consulta-sueldos — GET /api/v1/consulta-sueldos — Consultar sueldos de colaboradores
  // Origen controlador: GET /api/v1/consulta-sueldos/{empresaId}/{colaboradorId} — GET /api/v1/consulta-sueldos/{empresaId}/{colaboradorId} — Obtener sueldo de un colaborador
  // Origen controlador: GET /api/v1/consulta-sueldos/estructura-organizacional — GET /api/v1/consulta-sueldos/estructura-organizacional — Obtener estructura organizacional para filtro
  // Origen controlador: POST /api/v1/consulta-sueldos/exportar — POST /api/v1/consulta-sueldos/exportar — Exportar consulta de sueldos
  // Origen controlador: DELETE /api/v1/consulta-sueldos/{empresaId}/{colaboradorId} — DELETE /api/v1/consulta-sueldos/{empresaId}/{colaboradorId} — Eliminar registro de sueldo

  async findById(id: string): Promise<Consueldo> {
    if (!id) {
      throw new ConsueldoValidationError('El ID es requerido');
    }
    const response = await this.gatewayPort.findById(id);
    return ConsueldoViewMapper.toDomain(response);
  }

  async findAll(filter?: ConsueldoFilter): Promise<ConsueldoPageResult> {
    const params = filter ? ConsueldoViewMapper.toFilterParams(filter) : undefined;
    const response = await this.gatewayPort.findAll(params);
    return ConsueldoViewMapper.toPageResult(response);
  }

  async create(model: CreateConsueldo): Promise<Consueldo> {
    // TODO: Validaciones de negocio antes de crear
    this.validateConsueldo(model);
    const request = ConsueldoViewMapper.toCreateRequest(model);
    const response = await this.gatewayPort.create(request);
    return ConsueldoViewMapper.toDomain(response);
  }

  async update(id: string, model: UpdateConsueldo): Promise<Consueldo> {
    if (!id) {
      throw new ConsueldoValidationError('El ID es requerido para actualizar');
    }
    // TODO: Validaciones de negocio antes de actualizar
    const request = ConsueldoViewMapper.toUpdateRequest(model);
    const response = await this.gatewayPort.update(id, request);
    return ConsueldoViewMapper.toDomain(response);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new ConsueldoValidationError('El ID es requerido para eliminar');
    }
    await this.gatewayPort.remove(id);
  }

  // ─── Validaciones de negocio ───

  private validateConsueldo(model: Partial<Consueldo>): void {
    // TODO: Implementar validaciones de negocio
    // Ejemplo:
    // if (!model.nombre || model.nombre.trim().length === 0) {
    //   throw new ConsueldoValidationError('El nombre es obligatorio', 'nombre');
    // }
  }

  // TODO: Agregar métodos de negocio adicionales
  // Ejemplo: procesar lotes, cálculos, orquestación de múltiples llamadas al gateway
}
