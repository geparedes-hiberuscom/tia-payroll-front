import { ContratoplantillaContratoplantilladialog, CreateContratoplantillaContratoplantilladialog, UpdateContratoplantillaContratoplantilladialog, ContratoplantillaContratoplantilladialogFilter, ContratoplantillaContratoplantilladialogPageResult } from '../../domain/model/ContratoplantillaContratoplantilladialog';

/**
 * Input Port (Use Case): contratoPlantilla.zul / contratoPlantillaDialog.zul
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
export interface ContratoplantillaContratoplantilladialogUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<ContratoplantillaContratoplantilladialog>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: ContratoplantillaContratoplantilladialogFilter): Promise<ContratoplantillaContratoplantilladialogPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateContratoplantillaContratoplantilladialog): Promise<ContratoplantillaContratoplantilladialog>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateContratoplantillaContratoplantilladialog): Promise<ContratoplantillaContratoplantilladialog>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
