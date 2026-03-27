import { Consueldo, CreateConsueldo, UpdateConsueldo, ConsueldoFilter, ConsueldoPageResult } from '../../domain/model/Consueldo';

/**
 * Input Port (Use Case): conSueldo.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Ver nómina
 *   - Acumulados
 *   - Comparativas
 *
 * Endpoints API relacionados:
 *   GET /api/v1/consulta-sueldos — Consultar sueldos de colaboradores
 *   GET /api/v1/consulta-sueldos/{empresaId}/{colaboradorId} — Obtener sueldo de un colaborador
 *   GET /api/v1/consulta-sueldos/estructura-organizacional — Obtener estructura organizacional para filtro
 *   POST /api/v1/consulta-sueldos/exportar — Exportar consulta de sueldos
 *   DELETE /api/v1/consulta-sueldos/{empresaId}/{colaboradorId} — Eliminar registro de sueldo
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface ConsueldoUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<Consueldo>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: ConsueldoFilter): Promise<ConsueldoPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateConsueldo): Promise<Consueldo>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateConsueldo): Promise<Consueldo>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
