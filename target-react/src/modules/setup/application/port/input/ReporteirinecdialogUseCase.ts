import { Reporteirinecdialog, CreateReporteirinecdialog, UpdateReporteirinecdialog, ReporteirinecdialogFilter, ReporteirinecdialogPageResult } from '../../domain/model/Reporteirinecdialog';

/**
 * Input Port (Use Case): ReporteIRINECDialog.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Config inicial
 *   - Tabla de IR
 *   - Mapeo contable
 *
 * Endpoints API relacionados:
 *   GET /api/v1/reportes-ir-inec — Listar reportes IR/INEC disponibles
 *   GET /api/v1/reportes-ir-inec/{id} — Obtener reporte IR/INEC por ID
 *   POST /api/v1/reportes-ir-inec/generar — Generar reporte IR/INEC
 *   PUT /api/v1/reportes-ir-inec/{id} — Actualizar reporte IR/INEC
 *   DELETE /api/v1/reportes-ir-inec/{id} — Eliminar reporte IR/INEC
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface ReporteirinecdialogUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<Reporteirinecdialog>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: ReporteirinecdialogFilter): Promise<ReporteirinecdialogPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateReporteirinecdialog): Promise<Reporteirinecdialog>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateReporteirinecdialog): Promise<Reporteirinecdialog>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
