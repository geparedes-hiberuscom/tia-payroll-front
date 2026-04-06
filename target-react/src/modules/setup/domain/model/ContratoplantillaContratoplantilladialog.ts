/**
 * Modelo de Dominio: contratoPlantilla.zul / contratoPlantillaDialog.zul (contratoPlantilla_contratoPlantillaDialog)
 * Vertical Slice: 🔧 Setup y Configuración
 * Entidades fuente: 7
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: ContratoPlantillaPageResponseDTO — Lista paginada de plantillas por contrato
// Fuente: ContratoPlantillaResponseDTO — Detalle de una plantilla de contrato
// Fuente: ContratoPlantillaCreateDTO — Datos para crear una nueva plantilla de contrato
// Fuente: ContratoPlantillaUpdateDTO — Datos para actualizar una plantilla de contrato
// Fuente: DeleteResponseDTO — Confirmación de eliminación
// Fuente: ArchivoPlantillaUploadDTO — Archivo de plantilla para subir (multipart)
// Fuente: ArchivoPlantillaResponseDTO — Resultado de la subida del archivo

export interface ContratoplantillaContratoplantilladialog {
  id: number;
  descripcion: string;
  nombreArchivo?: string;
  nombreArchivo2?: string;
  usuarioIngreso?: string;
  fechaIngreso?: Date;
  usuarioModificacion?: string;
  fechaModificacion?: Date;
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateContratoplantillaContratoplantilladialog = Omit<ContratoplantillaContratoplantilladialog, 'id' | 'usuarioIngreso' | 'fechaIngreso' | 'usuarioModificacion' | 'fechaModificacion'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateContratoplantillaContratoplantilladialog = Partial<Omit<ContratoplantillaContratoplantilladialog, 'id' | 'usuarioIngreso' | 'fechaIngreso' | 'usuarioModificacion' | 'fechaModificacion'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface ContratoplantillaContratoplantilladialogFilter {
  page?: number;
  size?: number;
  nombre?: string;
  descripcion?: string;
}

/**
 * Resultado paginado del dominio
 */
export interface ContratoplantillaContratoplantilladialogPageResult {
  data: ContratoplantillaContratoplantilladialog[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
