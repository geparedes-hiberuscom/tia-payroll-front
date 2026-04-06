import { Gastospersonalesdialog, CreateGastospersonalesdialog, UpdateGastospersonalesdialog, GastospersonalesdialogFilter, GastospersonalesdialogPageResult } from '../../domain/model/Gastospersonalesdialog';

/**
 * Input Port (Use Case): GastosPersonalesDialog.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Config inicial
 *   - Tabla de IR
 *   - Mapeo contable
 *
 * Endpoints API relacionados:
 *   GET /api/v1/gastos-personales — Listar gastos personales
 *   GET /api/v1/gastos-personales/{id} — Obtener gasto personal por ID
 *   POST /api/v1/gastos-personales — Crear gasto personal
 *   PUT /api/v1/gastos-personales/{id} — Actualizar gasto personal
 *   DELETE /api/v1/gastos-personales/{id} — Eliminar gasto personal
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface GastospersonalesdialogUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<Gastospersonalesdialog>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: GastospersonalesdialogFilter): Promise<GastospersonalesdialogPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateGastospersonalesdialog): Promise<Gastospersonalesdialog>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateGastospersonalesdialog): Promise<Gastospersonalesdialog>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
