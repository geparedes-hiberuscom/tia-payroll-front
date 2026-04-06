import { ParametrosParametrosdialog, CreateParametrosParametrosdialog, UpdateParametrosParametrosdialog, ParametrosParametrosdialogFilter, ParametrosParametrosdialogPageResult } from '../../domain/model/ParametrosParametrosdialog';

/**
 * Input Port (Use Case): parametros.zul / parametrosDialog.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Config inicial
 *   - Tabla de IR
 *   - Mapeo contable
 *
 * Endpoints API relacionados:
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface ParametrosParametrosdialogUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<ParametrosParametrosdialog>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: ParametrosParametrosdialogFilter): Promise<ParametrosParametrosdialogPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateParametrosParametrosdialog): Promise<ParametrosParametrosdialog>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateParametrosParametrosdialog): Promise<ParametrosParametrosdialog>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
