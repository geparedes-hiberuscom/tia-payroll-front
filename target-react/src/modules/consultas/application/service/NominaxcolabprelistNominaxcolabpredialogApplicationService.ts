import { NominaxcolabprelistNominaxcolabpredialog, CreateNominaxcolabprelistNominaxcolabpredialog, UpdateNominaxcolabprelistNominaxcolabpredialog, NominaxcolabprelistNominaxcolabpredialogFilter, NominaxcolabprelistNominaxcolabpredialogPageResult } from '../../domain/model/NominaxcolabprelistNominaxcolabpredialog';
import { NominaxcolabprelistNominaxcolabpredialogUseCase } from '../port/input/NominaxcolabprelistNominaxcolabpredialogUseCase';
import { NominaxcolabprelistNominaxcolabpredialogGatewayPort } from '../port/output/NominaxcolabprelistNominaxcolabpredialogGatewayPort';
import { NominaxcolabprelistNominaxcolabpredialogNotFoundError, NominaxcolabprelistNominaxcolabpredialogValidationError } from '../../domain/exception/NominaxcolabprelistNominaxcolabpredialogError';
import { NominaxcolabprelistNominaxcolabpredialogApiMapper } from '../../infrastructure/output/adapter/mapper/NominaxcolabprelistNominaxcolabpredialogApiMapper';
import { NominaxcolabprelistNominaxcolabpredialogViewMapper } from '../../infrastructure/input/adapter/mapper/NominaxcolabprelistNominaxcolabpredialogViewMapper';

/**
 * Application Service: nominaxColabPreList.zul / nominaxColabPreDialog.zul (nominaxColabPreList_nominaxColabPreDialog)
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
export class NominaxcolabprelistNominaxcolabpredialogApplicationService implements NominaxcolabprelistNominaxcolabpredialogUseCase {

  constructor(private readonly gatewayPort: NominaxcolabprelistNominaxcolabpredialogGatewayPort) {}

  // Origen controlador: GET /api/v1/nomina-colaborador/preliquidacion — GET /api/v1/nomina-colaborador/preliquidacion — Listar nómina preliquidada por colaborador
  // Origen controlador: GET /api/v1/nomina-colaborador/preliquidacion/{ejecucionId}/{colaboradorId} — GET /api/v1/nomina-colaborador/preliquidacion/{ejecucionId}/{colaboradorId} — Obtener nómina preliquidada de un colaborador
  // Origen controlador: GET /api/v1/nomina-colaborador/preliquidacion/{ejecucionId}/{colaboradorId}/rubros — GET /api/v1/nomina-colaborador/preliquidacion/{ejecucionId}/{colaboradorId}/rubros — Listar rubros preliquidados de un colaborador
  // Origen controlador: GET /api/v1/nomina-colaborador/preliquidacion/{ejecucionId}/{colaboradorId}/detalle — GET /api/v1/nomina-colaborador/preliquidacion/{ejecucionId}/{colaboradorId}/detalle — Obtener detalle completo del colaborador en preliquidación
  // Origen controlador: DELETE /api/v1/nomina-colaborador/preliquidacion/{ejecucionId}/{colaboradorId} — DELETE /api/v1/nomina-colaborador/preliquidacion/{ejecucionId}/{colaboradorId} — Eliminar nómina preliquidada de colaborador

  async findById(id: string): Promise<NominaxcolabprelistNominaxcolabpredialog> {
    if (!id) {
      throw new NominaxcolabprelistNominaxcolabpredialogValidationError('El ID es requerido');
    }
    const response = await this.gatewayPort.findById(id);
    return NominaxcolabprelistNominaxcolabpredialogViewMapper.toDomain(response);
  }

  async findAll(filter?: NominaxcolabprelistNominaxcolabpredialogFilter): Promise<NominaxcolabprelistNominaxcolabpredialogPageResult> {
    const params = filter ? NominaxcolabprelistNominaxcolabpredialogViewMapper.toFilterParams(filter) : undefined;
    const response = await this.gatewayPort.findAll(params);
    return NominaxcolabprelistNominaxcolabpredialogViewMapper.toPageResult(response);
  }

  async create(model: CreateNominaxcolabprelistNominaxcolabpredialog): Promise<NominaxcolabprelistNominaxcolabpredialog> {
    // TODO: Validaciones de negocio antes de crear
    this.validateNominaxcolabprelistNominaxcolabpredialog(model);
    const request = NominaxcolabprelistNominaxcolabpredialogViewMapper.toCreateRequest(model);
    const response = await this.gatewayPort.create(request);
    return NominaxcolabprelistNominaxcolabpredialogViewMapper.toDomain(response);
  }

  async update(id: string, model: UpdateNominaxcolabprelistNominaxcolabpredialog): Promise<NominaxcolabprelistNominaxcolabpredialog> {
    if (!id) {
      throw new NominaxcolabprelistNominaxcolabpredialogValidationError('El ID es requerido para actualizar');
    }
    // TODO: Validaciones de negocio antes de actualizar
    const request = NominaxcolabprelistNominaxcolabpredialogViewMapper.toUpdateRequest(model);
    const response = await this.gatewayPort.update(id, request);
    return NominaxcolabprelistNominaxcolabpredialogViewMapper.toDomain(response);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new NominaxcolabprelistNominaxcolabpredialogValidationError('El ID es requerido para eliminar');
    }
    await this.gatewayPort.remove(id);
  }

  // ─── Validaciones de negocio ───

  private validateNominaxcolabprelistNominaxcolabpredialog(model: Partial<NominaxcolabprelistNominaxcolabpredialog>): void {
    if (!model.ejecucionId) {
      throw new NominaxcolabprelistNominaxcolabpredialogValidationError('El ejecucionId es obligatorio', 'ejecucionId');
    }
    if (!model.colaboradorId) {
      throw new NominaxcolabprelistNominaxcolabpredialogValidationError('El colaboradorId es obligatorio', 'colaboradorId');
    }
    if (model.totalIngresos !== undefined && model.totalIngresos < 0) {
      throw new NominaxcolabprelistNominaxcolabpredialogValidationError('totalIngresos no puede ser negativo', 'totalIngresos');
    }
    if (model.totalEgresos !== undefined && model.totalEgresos < 0) {
      throw new NominaxcolabprelistNominaxcolabpredialogValidationError('totalEgresos no puede ser negativo', 'totalEgresos');
    }
  }

  // TODO: Agregar métodos de negocio adicionales para preliquidación
}
