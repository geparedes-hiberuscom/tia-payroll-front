import { NominaxcolabprelistNominaxcolabpredialog, CreateNominaxcolabprelistNominaxcolabpredialog, UpdateNominaxcolabprelistNominaxcolabpredialog, NominaxcolabprelistNominaxcolabpredialogFilter, NominaxcolabprelistNominaxcolabpredialogPageResult } from '../../domain/model/NominaxcolabprelistNominaxcolabpredialog';

/**
 * Input Port (Use Case): nominaxColabPreList.zul / nominaxColabPreDialog.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Ver nómina
 *   - Acumulados
 *   - Comparativas
 *
 * Endpoints API relacionados:
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface NominaxcolabprelistNominaxcolabpredialogUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<NominaxcolabprelistNominaxcolabpredialog>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: NominaxcolabprelistNominaxcolabpredialogFilter): Promise<NominaxcolabprelistNominaxcolabpredialogPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateNominaxcolabprelistNominaxcolabpredialog): Promise<NominaxcolabprelistNominaxcolabpredialog>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateNominaxcolabprelistNominaxcolabpredialog): Promise<NominaxcolabprelistNominaxcolabpredialog>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
