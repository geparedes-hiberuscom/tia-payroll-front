import { PlantillacontablePlantillacontabledialog, CreatePlantillacontablePlantillacontabledialog, UpdatePlantillacontablePlantillacontabledialog, PlantillacontablePlantillacontabledialogFilter, PlantillacontablePlantillacontabledialogPageResult } from '../../domain/model/PlantillacontablePlantillacontabledialog';

/**
 * Input Port (Use Case): plantillaContable.zul / plantillaContableDialog.zul
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
export interface PlantillacontablePlantillacontabledialogUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<PlantillacontablePlantillacontabledialog>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: PlantillacontablePlantillacontabledialogFilter): Promise<PlantillacontablePlantillacontabledialogPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreatePlantillacontablePlantillacontabledialog): Promise<PlantillacontablePlantillacontabledialog>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdatePlantillacontablePlantillacontabledialog): Promise<PlantillacontablePlantillacontabledialog>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
