import { Nominaxcolablist, CreateNominaxcolablist, UpdateNominaxcolablist, NominaxcolablistFilter, NominaxcolablistPageResult } from '../../domain/model/Nominaxcolablist';

/**
 * Input Port (Use Case): nominaxColabList.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Ver nómina
 *   - Acumulados
 *   - Comparativas
 *
 * Endpoints API relacionados:
 *   GET /api/v1/nomina-colaborador/historico — Listar nómina histórica por colaborador
 *   GET /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId} — Obtener nómina histórica de un colaborador
 *   GET /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId}/rubros — Listar rubros históricos de un colaborador
 *   POST /api/v1/nomina-colaborador/historico/exportar — Exportar nómina histórica por colaborador
 *   DELETE /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId} — Eliminar nómina histórica de colaborador
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface NominaxcolablistUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<Nominaxcolablist>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: NominaxcolablistFilter): Promise<NominaxcolablistPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateNominaxcolablist): Promise<Nominaxcolablist>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateNominaxcolablist): Promise<Nominaxcolablist>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
