import { Acumulados, CreateAcumulados, UpdateAcumulados, AcumuladosFilter, AcumuladosPageResult } from '../../domain/model/Acumulados';

/**
 * Input Port (Use Case): acumulados.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Ver nómina
 *   - Acumulados
 *   - Comparativas
 *
 * Endpoints API relacionados:
 *   GET /api/v1/acumulados — Listar acumulados de nómina
 *   GET /api/v1/acumulados/{id} — Obtener acumulado por ID
 *   POST /api/v1/acumulados — Crear acumulado de nómina
 *   PUT /api/v1/acumulados/{id} — Actualizar acumulado de nómina
 *   DELETE /api/v1/acumulados/{id} — Eliminar acumulado de nómina
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface AcumuladosUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<Acumulados>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: AcumuladosFilter): Promise<AcumuladosPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateAcumulados): Promise<Acumulados>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateAcumulados): Promise<Acumulados>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
