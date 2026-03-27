import { Dtoscompartidossubrecursos, CreateDtoscompartidossubrecursos, UpdateDtoscompartidossubrecursos, DtoscompartidossubrecursosFilter, DtoscompartidossubrecursosPageResult } from '../../domain/model/Dtoscompartidossubrecursos';

/**
 * Input Port (Use Case): DTOs compartidos (subrecursos)
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
export interface DtoscompartidossubrecursosUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<Dtoscompartidossubrecursos>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: DtoscompartidossubrecursosFilter): Promise<DtoscompartidossubrecursosPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateDtoscompartidossubrecursos): Promise<Dtoscompartidossubrecursos>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateDtoscompartidossubrecursos): Promise<Dtoscompartidossubrecursos>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
