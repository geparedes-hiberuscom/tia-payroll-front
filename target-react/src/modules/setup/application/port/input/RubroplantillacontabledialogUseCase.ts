import { Rubroplantillacontabledialog, CreateRubroplantillacontabledialog, UpdateRubroplantillacontabledialog, RubroplantillacontabledialogFilter, RubroplantillacontabledialogPageResult } from '../../domain/model/Rubroplantillacontabledialog';

/**
 * Input Port (Use Case): rubroplantillaContableDialog.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Config inicial
 *   - Tabla de IR
 *   - Mapeo contable
 *
 * Endpoints API relacionados:
 *   GET /api/v1/plantillas-contables/{plantillaId}/rubros — Listar rubros de plantilla contable
 *   GET /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — Obtener rubro de plantilla por ID
 *   POST /api/v1/plantillas-contables/{plantillaId}/rubros — Agregar rubro a plantilla
 *   PUT /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — Actualizar rubro en plantilla
 *   DELETE /api/v1/plantillas-contables/{plantillaId}/rubros/{rubroId} — Quitar rubro de plantilla
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface RubroplantillacontabledialogUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<Rubroplantillacontabledialog>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: RubroplantillacontabledialogFilter): Promise<RubroplantillacontabledialogPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateRubroplantillacontabledialog): Promise<Rubroplantillacontabledialog>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateRubroplantillacontabledialog): Promise<Rubroplantillacontabledialog>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
