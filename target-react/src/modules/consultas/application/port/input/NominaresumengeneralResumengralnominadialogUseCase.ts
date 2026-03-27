import { NominaresumengeneralResumengralnominadialog, CreateNominaresumengeneralResumengralnominadialog, UpdateNominaresumengeneralResumengralnominadialog, NominaresumengeneralResumengralnominadialogFilter, NominaresumengeneralResumengralnominadialogPageResult } from '../../domain/model/NominaresumengeneralResumengralnominadialog';

/**
 * Input Port (Use Case): nominaresumenGeneral.zul / ResumenGralNominaDialog.zul
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
export interface NominaresumengeneralResumengralnominadialogUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<NominaresumengeneralResumengralnominadialog>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: NominaresumengeneralResumengralnominadialogFilter): Promise<NominaresumengeneralResumengralnominadialogPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateNominaresumengeneralResumengralnominadialog): Promise<NominaresumengeneralResumengralnominadialog>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateNominaresumengeneralResumengralnominadialog): Promise<NominaresumengeneralResumengralnominadialog>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
