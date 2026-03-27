/**
 * Modelo de Dominio: nominaresumenGeneral.zul / ResumenGralNominaDialog.zul (nominaresumenGeneral_ResumenGralNominaDialog)
 * Vertical Slice: 👤 Consultas
 * Entidades fuente: 6
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: ResumenGeneralNominaResponseDTO — Resumen general consolidado de nómina
// Fuente: ResumenDetalladoNominaResponseDTO — Resumen detallado de nómina con configuración de clases de rubros
// Fuente: GenerarResumenNominaDTO — Parámetros para generar el resumen de nómina
// Fuente: ExportarResumenNominaDTO — Parámetros para la exportación del resumen
// Fuente: ExportarResponseDTO — Resultado de la exportación
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface NominaresumengeneralResumengralnominadialog {
  id: string;
  // TODO: Agregar atributos del dominio de negocio
  // Basarse en las entidades fuente y los schemas del API
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateNominaresumengeneralResumengralnominadialog = Omit<NominaresumengeneralResumengralnominadialog, 'id'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateNominaresumengeneralResumengralnominadialog = Partial<Omit<NominaresumengeneralResumengralnominadialog, 'id'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface NominaresumengeneralResumengralnominadialogFilter {
  page?: number;
  size?: number;
  // TODO: Agregar filtros de búsqueda del dominio
}

/**
 * Resultado paginado del dominio
 */
export interface NominaresumengeneralResumengralnominadialogPageResult {
  items: NominaresumengeneralResumengralnominadialog[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
