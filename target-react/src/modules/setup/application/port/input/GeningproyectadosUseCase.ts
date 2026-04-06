import { Geningproyectados, CreateGeningproyectados, UpdateGeningproyectados, GeningproyectadosFilter, GeningproyectadosPageResult } from '../../domain/model/Geningproyectados';

/**
 * Input Port (Use Case): genIngProyectados.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Config inicial
 *   - Tabla de IR
 *   - Mapeo contable
 *
 * Endpoints API relacionados:
 *   GET /api/v1/ingresos-proyectados — Listar ingresos proyectados
 *   GET /api/v1/ingresos-proyectados/{id} — Obtener ingreso proyectado por ID
 *   POST /api/v1/ingresos-proyectados/generar — Generar ingresos proyectados
 *   PUT /api/v1/ingresos-proyectados/{id} — Actualizar ingreso proyectado
 *   DELETE /api/v1/ingresos-proyectados/{id} — Eliminar ingreso proyectado
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface GeningproyectadosUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<Geningproyectados>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: GeningproyectadosFilter): Promise<GeningproyectadosPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateGeningproyectados): Promise<Geningproyectados>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateGeningproyectados): Promise<Geningproyectados>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
