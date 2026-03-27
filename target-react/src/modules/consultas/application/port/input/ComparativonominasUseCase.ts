import { Comparativonominas, CreateComparativonominas, UpdateComparativonominas, ComparativonominasFilter, ComparativonominasPageResult } from '../../domain/model/Comparativonominas';

/**
 * Input Port (Use Case): comparativoNominas.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Ver nómina
 *   - Acumulados
 *   - Comparativas
 *
 * Endpoints API relacionados:
 *   GET /api/v1/comparativo-nominas — Listar comparativos de nóminas
 *   GET /api/v1/comparativo-nominas/{id} — Obtener comparativo de nómina por ID
 *   POST /api/v1/comparativo-nominas — Crear comparativo de nóminas
 *   PUT /api/v1/comparativo-nominas/{id} — Actualizar comparativo de nóminas
 *   DELETE /api/v1/comparativo-nominas/{id} — Eliminar comparativo de nóminas
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface ComparativonominasUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<Comparativonominas>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: ComparativonominasFilter): Promise<ComparativonominasPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateComparativonominas): Promise<Comparativonominas>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateComparativonominas): Promise<Comparativonominas>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
