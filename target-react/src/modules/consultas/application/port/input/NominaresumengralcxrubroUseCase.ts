import { Nominaresumengralcxrubro, CreateNominaresumengralcxrubro, UpdateNominaresumengralcxrubro, NominaresumengralcxrubroFilter, NominaresumengralcxrubroPageResult } from '../../domain/model/Nominaresumengralcxrubro';

/**
 * Input Port (Use Case): nominaresumenGralCxRubro.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Ver nómina
 *   - Acumulados
 *   - Comparativas
 *
 * Endpoints API relacionados:
 *   GET /api/v1/nomina-resumen/por-clasificacion — Listar resumen de nómina por clasificación de rubro
 *   GET /api/v1/nomina-resumen/por-clasificacion/{ejecucionId}/{claseId} — Obtener resumen de una clasificación específica
 *   GET /api/v1/nomina-resumen/por-clasificacion/{ejecucionId}/{claseId}/rubros — Listar rubros de una clasificación
 *   POST /api/v1/nomina-resumen/por-clasificacion/exportar — Exportar resumen por clasificación de rubro
 *   DELETE /api/v1/nomina-resumen/por-clasificacion/{ejecucionId}/{claseId} — Eliminar resumen de clasificación
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface NominaresumengralcxrubroUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<Nominaresumengralcxrubro>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: NominaresumengralcxrubroFilter): Promise<NominaresumengralcxrubroPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateNominaresumengralcxrubro): Promise<Nominaresumengralcxrubro>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateNominaresumengralcxrubro): Promise<Nominaresumengralcxrubro>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
