import { Nominaxcolablist, CreateNominaxcolablist, UpdateNominaxcolablist, NominaxcolablistFilter, NominaxcolablistPageResult } from '../../domain/model/Nominaxcolablist';
import { NominaxcolablistUseCase } from '../port/input/NominaxcolablistUseCase';
import { NominaxcolablistGatewayPort } from '../port/output/NominaxcolablistGatewayPort';
import { NominaxcolablistNotFoundError, NominaxcolablistValidationError } from '../../domain/exception/NominaxcolablistError';
import { NominaxcolablistApiMapper } from '../../infrastructure/output/adapter/mapper/NominaxcolablistApiMapper';
import { NominaxcolablistViewMapper } from '../../infrastructure/input/adapter/mapper/NominaxcolablistViewMapper';

/**
 * Application Service: nominaxColabList.zul (nominaxColabList)
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
export class NominaxcolablistApplicationService implements NominaxcolablistUseCase {

  constructor(private readonly gatewayPort: NominaxcolablistGatewayPort) {}

  // Origen controlador: GET /api/v1/nomina-colaborador/historico — GET /api/v1/nomina-colaborador/historico — Listar nómina histórica por colaborador
  // Origen controlador: GET /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId} — GET /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId} — Obtener nómina histórica de un colaborador
  // Origen controlador: GET /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId}/rubros — GET /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId}/rubros — Listar rubros históricos de un colaborador
  // Origen controlador: POST /api/v1/nomina-colaborador/historico/exportar — POST /api/v1/nomina-colaborador/historico/exportar — Exportar nómina histórica por colaborador
  // Origen controlador: DELETE /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId} — DELETE /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId} — Eliminar nómina histórica de colaborador

  async findById(id: string): Promise<Nominaxcolablist> {
    if (!id) {
      throw new NominaxcolablistValidationError('El ID es requerido');
    }
    const response = await this.gatewayPort.findById(id);
    return NominaxcolablistViewMapper.toDomain(response);
  }

  async findAll(filter?: NominaxcolablistFilter): Promise<NominaxcolablistPageResult> {
    const params = filter ? NominaxcolablistViewMapper.toFilterParams(filter) : undefined;
    const response = await this.gatewayPort.findAll(params);
    return NominaxcolablistViewMapper.toPageResult(response);
  }

  async create(model: CreateNominaxcolablist): Promise<Nominaxcolablist> {
    // TODO: Validaciones de negocio antes de crear
    this.validateNominaxcolablist(model);
    const request = NominaxcolablistViewMapper.toCreateRequest(model);
    const response = await this.gatewayPort.create(request);
    return NominaxcolablistViewMapper.toDomain(response);
  }

  async update(id: string, model: UpdateNominaxcolablist): Promise<Nominaxcolablist> {
    if (!id) {
      throw new NominaxcolablistValidationError('El ID es requerido para actualizar');
    }
    // TODO: Validaciones de negocio antes de actualizar
    const request = NominaxcolablistViewMapper.toUpdateRequest(model);
    const response = await this.gatewayPort.update(id, request);
    return NominaxcolablistViewMapper.toDomain(response);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new NominaxcolablistValidationError('El ID es requerido para eliminar');
    }
    await this.gatewayPort.remove(id);
  }

  // ─── Validaciones de negocio ───

  private validateNominaxcolablist(model: Partial<Nominaxcolablist>): void {
    if (!model.ejecucionId) {
      throw new NominaxcolablistValidationError('El ejecucionId es obligatorio', 'ejecucionId');
    }
    if (!model.colaboradorId) {
      throw new NominaxcolablistValidationError('El colaboradorId es obligatorio', 'colaboradorId');
    }
    if (model.totalIngresos !== undefined && model.totalIngresos < 0) {
      throw new NominaxcolablistValidationError('totalIngresos no puede ser negativo', 'totalIngresos');
    }
    if (model.totalEgresos !== undefined && model.totalEgresos < 0) {
      throw new NominaxcolablistValidationError('totalEgresos no puede ser negativo', 'totalEgresos');
    }
  }

  // TODO: Agregar métodos de negocio adicionales
  // Ejemplo: consultar rubros por colaborador, exportar nómina, etc.
}
