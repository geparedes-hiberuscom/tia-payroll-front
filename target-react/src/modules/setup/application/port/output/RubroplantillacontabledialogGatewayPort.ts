import { RubroplantillacontabledialogResponse, RubroplantillacontabledialogListResponse, CreateRubroplantillacontabledialogRequest, UpdateRubroplantillacontabledialogRequest, RubroplantillacontabledialogFilterParams } from '../../infrastructure/input/adapter/dto/RubroplantillacontabledialogDto';

/**
 * Gateway Port (Output Port): rubroplantillaContableDialog.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
  // GET /api/v1/plantillas-contables/{plantillaId}/rubros — Listar rubros de plantilla contable
  // GET /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — Obtener rubro de plantilla por ID
  // POST /api/v1/plantillas-contables/{plantillaId}/rubros — Agregar rubro a plantilla
  // PUT /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — Actualizar rubro en plantilla
  // DELETE /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — Quitar rubro de plantilla
 */
export interface RubroplantillacontabledialogGatewayPort {
  findById(id: string): Promise<RubroplantillacontabledialogResponse>;
  findAll(params?: RubroplantillacontabledialogFilterParams): Promise<RubroplantillacontabledialogListResponse>;
  create(request: CreateRubroplantillacontabledialogRequest): Promise<RubroplantillacontabledialogResponse>;
  update(id: string, request: UpdateRubroplantillacontabledialogRequest): Promise<RubroplantillacontabledialogResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
