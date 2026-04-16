import { RubroplantillacontabledialogGatewayPort } from '../port/output/RubroplantillacontabledialogGatewayPort';
import { RubroplantillacontabledialogResponse, RubroplantillacontabledialogListResponse, CreateRubroplantillacontabledialogRequest, UpdateRubroplantillacontabledialogRequest, RubroplantillacontabledialogFilterParams } from '../../infrastructure/input/adapter/dto/RubroplantillacontabledialogDto';

/**
 * Application Service: rubroplantillaContableDialog.zul (rubroplantillaContableDialog)
 * Implementa la lógica de aplicación invocando el Gateway Port (puerto de salida).
 * Controladores fuente: 5
 * Servicios fuente: 0
 *
 * TODO: Copilot — Implementa lógica de negocio adicional (validaciones, transformaciones).
 */
export class RubroplantillacontabledialogService {
  constructor(private readonly gateway: RubroplantillacontabledialogGatewayPort) {}

  // Origen controlador: GET /api/v1/plantillas-contables/{plantillaId}/rubros — GET /api/v1/plantillas-contables/{plantillaId}/rubros — Listar rubros de plantilla contable
  // Origen controlador: GET /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — GET /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — Obtener rubro de plantilla por ID
  // Origen controlador: POST /api/v1/plantillas-contables/{plantillaId}/rubros — POST /api/v1/plantillas-contables/{plantillaId}/rubros — Agregar rubro a plantilla
  // Origen controlador: PUT /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — PUT /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — Actualizar rubro en plantilla
  // Origen controlador: DELETE /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — DELETE /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — Quitar rubro de plantilla

  async findById(id: number): Promise<RubroplantillacontabledialogResponse> {
    return this.gateway.findById(id);
  }

  async findAll(params?: RubroplantillacontabledialogFilterParams): Promise<RubroplantillacontabledialogListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateRubroplantillacontabledialogRequest): Promise<RubroplantillacontabledialogResponse> {
    return this.gateway.create(request);
  }

  async update(id: number, request: UpdateRubroplantillacontabledialogRequest): Promise<RubroplantillacontabledialogResponse> {
    return this.gateway.update(id, request);
  }

  async remove(id: number): Promise<void> {
    return this.gateway.remove(id);
  }

}
