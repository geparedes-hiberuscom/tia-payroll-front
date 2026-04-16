import { Rubroplantillacontabledialog, CreateRubroplantillacontabledialog, UpdateRubroplantillacontabledialog, RubroplantillacontabledialogFilter, RubroplantillacontabledialogPageResult } from '../../domain/model/Rubroplantillacontabledialog';
import { RubroplantillacontabledialogUseCase } from '../port/input/RubroplantillacontabledialogUseCase';
import { RubroplantillacontabledialogGatewayPort } from '../port/output/RubroplantillacontabledialogGatewayPort';
import { RubroplantillacontabledialogNotFoundError, RubroplantillacontabledialogValidationError } from '../../domain/exception/RubroplantillacontabledialogError';
import { RubroplantillacontabledialogApiMapper } from '../../infrastructure/output/adapter/mapper/RubroplantillacontabledialogApiMapper';
import { RubroplantillacontabledialogViewMapper } from '../../infrastructure/input/adapter/mapper/RubroplantillacontabledialogViewMapper';

/**
 * Application Service: rubroplantillaContableDialog.zul (rubroplantillaContableDialog)
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
export class RubroplantillacontabledialogApplicationService implements RubroplantillacontabledialogUseCase {

  constructor(private readonly gatewayPort: RubroplantillacontabledialogGatewayPort) {}

  // Origen controlador: GET /api/v1/plantillas-contables/{plantillaId}/rubros — GET /api/v1/plantillas-contables/{plantillaId}/rubros — Listar rubros de plantilla contable
  // Origen controlador: GET /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — GET /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — Obtener rubro de plantilla por ID
  // Origen controlador: POST /api/v1/plantillas-contables/{plantillaId}/rubros — POST /api/v1/plantillas-contables/{plantillaId}/rubros — Agregar rubro a plantilla
  // Origen controlador: PUT /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — PUT /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — Actualizar rubro en plantilla
  // Origen controlador: DELETE /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — DELETE /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — Quitar rubro de plantilla

  async findById(id: string): Promise<Rubroplantillacontabledialog> {
    if (!id) {
      throw new RubroplantillacontabledialogValidationError('El ID es requerido');
    }
    const response = await this.gatewayPort.findById(id);
    return RubroplantillacontabledialogViewMapper.toDomain(response);
  }

  async findAll(filter?: RubroplantillacontabledialogFilter): Promise<RubroplantillacontabledialogPageResult> {
    const params = filter ? RubroplantillacontabledialogViewMapper.toFilterParams(filter) : undefined;
    const response = await this.gatewayPort.findAll(params);
    return RubroplantillacontabledialogViewMapper.toPageResult(response);
  }

  async create(model: CreateRubroplantillacontabledialog): Promise<Rubroplantillacontabledialog> {
    this.validateRubroplantillacontabledialog(model);
    const request = RubroplantillacontabledialogViewMapper.toCreateRequest(model);
    const response = await this.gatewayPort.create(request);
    return RubroplantillacontabledialogViewMapper.toDomain(response);
  }

  async update(id: string, model: UpdateRubroplantillacontabledialog): Promise<Rubroplantillacontabledialog> {
    if (!id) {
      throw new RubroplantillacontabledialogValidationError('El ID es requerido para actualizar');
    }
    const request = RubroplantillacontabledialogViewMapper.toUpdateRequest(model);
    const response = await this.gatewayPort.update(id, request);
    return RubroplantillacontabledialogViewMapper.toDomain(response);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new RubroplantillacontabledialogValidationError('El ID es requerido para eliminar');
    }
    await this.gatewayPort.remove(id);
  }

  // ─── Validaciones de negocio ───

  private validateRubroplantillacontabledialog(model: Partial<Rubroplantillacontabledialog>): void {
    // Ejemplo:
    // if (!model.nombre || model.nombre.trim().length === 0) {
    //   throw new RubroplantillacontabledialogValidationError('El nombre es obligatorio', 'nombre');
    // }
  }

  // Ejemplo: procesar lotes, cálculos, orquestación de múltiples llamadas al gateway
}
