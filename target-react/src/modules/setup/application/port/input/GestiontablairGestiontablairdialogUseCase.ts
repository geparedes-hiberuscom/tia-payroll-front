import { GestiontablairGestiontablairdialog, CreateGestiontablairGestiontablairdialog, UpdateGestiontablairGestiontablairdialog, GestiontablairGestiontablairdialogFilter, GestiontablairGestiontablairdialogPageResult } from '../../domain/model/GestiontablairGestiontablairdialog';

/**
 * Input Port (Use Case): gestionTablaIR.zul / gestionTablaIRDialog.zul
 * Define las operaciones que la capa de aplicación expone a la UI.
 *
 * Casos de uso del slice:
 *   - Config inicial
 *   - Tabla de IR
 *   - Mapeo contable
 *
 * Endpoints API relacionados:
 *
 * TODO: Copilot — Agrega métodos específicos de negocio basándote en los casos de uso y endpoints.
 */
export interface GestiontablairGestiontablairdialogUseCase {

  /**
   * Buscar por ID
   */
  findById(id: string): Promise<GestiontablairGestiontablairdialog>;

  /**
   * Listar con filtros y paginación
   */
  findAll(filter?: GestiontablairGestiontablairdialogFilter): Promise<GestiontablairGestiontablairdialogPageResult>;

  /**
   * Crear nuevo
   */
  create(model: CreateGestiontablairGestiontablairdialog): Promise<GestiontablairGestiontablairdialog>;

  /**
   * Actualizar existente
   */
  update(id: string, model: UpdateGestiontablairGestiontablairdialog): Promise<GestiontablairGestiontablairdialog>;

  /**
   * Eliminar por ID
   */
  remove(id: string): Promise<void>;

  // TODO: Agregar métodos específicos del caso de uso
  // Ejemplo: activar, desactivar, aprobar, rechazar, procesar, etc.
}
