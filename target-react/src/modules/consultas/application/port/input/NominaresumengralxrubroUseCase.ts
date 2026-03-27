import { Nominaresumengralxrubro, CreateNominaresumengralxrubro, UpdateNominaresumengralxrubro, NominaresumengralxrubroFilter, NominaresumengralxrubroPageResult } from '../../domain/model/Nominaresumengralxrubro';

/**
 * Input Port (Use Case): nominaresumenGralxRubro.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Ver nómina
 *   - Acumulados
 *   - Comparativas
 *
 * Endpoints API relacionados:
 *   GET /api/v1/nomina-resumen/por-rubro — Listar resumen de nómina por rubro
 *   GET /api/v1/nomina-resumen/por-rubro/{ejecucionId}/{rubroId} — Obtener resumen de un rubro específico
 *   GET /api/v1/nomina-resumen/por-rubro/{ejecucionId}/{rubroId}/colaboradores — Listar colaboradores de un rubro
 *   POST /api/v1/nomina-resumen/por-rubro/exportar — Exportar resumen por rubro
 *   DELETE /api/v1/nomina-resumen/por-rubro/{ejecucionId}/{rubroId} — Eliminar resumen de rubro
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface NominaresumengralxrubroUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<Nominaresumengralxrubro>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: NominaresumengralxrubroFilter): Promise<NominaresumengralxrubroPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateNominaresumengralxrubro): Promise<Nominaresumengralxrubro>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateNominaresumengralxrubro): Promise<Nominaresumengralxrubro>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
