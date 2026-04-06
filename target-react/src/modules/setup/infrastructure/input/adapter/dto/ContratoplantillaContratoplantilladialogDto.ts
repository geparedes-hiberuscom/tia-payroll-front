/**
 * DTOs para funcionalidad: contratoPlantilla.zul / contratoPlantillaDialog.zul (contratoPlantilla_contratoPlantillaDialog)
 * Entidades fuente: 7
 * Controladores fuente: 6
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: ContratoPlantillaPageResponseDTO — Lista paginada de plantillas por contrato
// Fuente: ContratoPlantillaResponseDTO — Detalle de una plantilla de contrato
// Fuente: ContratoPlantillaCreateDTO — Datos para crear una nueva plantilla de contrato
// Fuente: ContratoPlantillaUpdateDTO — Datos para actualizar una plantilla de contrato
// Fuente: DeleteResponseDTO — Confirmación de eliminación
// Fuente: ArchivoPlantillaUploadDTO — Archivo de plantilla para subir (multipart)
// Fuente: ArchivoPlantillaResponseDTO — Resultado de la subida del archivo

// ─── Request DTOs ───

export interface CreateContratoplantillaContratoplantilladialogRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdateContratoplantillaContratoplantilladialogRequest {
  // TODO: Campos del formulario de actualización
}

export interface ContratoplantillaContratoplantilladialogFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface ContratoplantillaContratoplantilladialogResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface ContratoplantillaContratoplantilladialogListResponse {
  data: ContratoplantillaContratoplantilladialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface ContratoplantillaContratoplantilladialogErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
