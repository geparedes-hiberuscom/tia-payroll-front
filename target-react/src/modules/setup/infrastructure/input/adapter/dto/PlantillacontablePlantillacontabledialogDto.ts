/**
 * DTOs para funcionalidad: plantillaContable.zul / plantillaContableDialog.zul (plantillaContable_plantillaContableDialog)
 * Entidades fuente: 5
 * Controladores fuente: 5
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: PlantillaContablePageResponseDTO — Lista paginada de plantillas contables
// Fuente: PlantillaContableResponseDTO — Detalle de una plantilla contable
// Fuente: PlantillaContableCreateDTO — Datos para crear una nueva plantilla contable
// Fuente: PlantillaContableUpdateDTO — Datos para actualizar una plantilla contable
// Fuente: DeleteResponseDTO — Confirmación de eliminación

// ─── Request DTOs ───

export interface CreatePlantillacontablePlantillacontabledialogRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdatePlantillacontablePlantillacontabledialogRequest {
  // TODO: Campos del formulario de actualización
}

export interface PlantillacontablePlantillacontabledialogFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface PlantillacontablePlantillacontabledialogResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface PlantillacontablePlantillacontabledialogListResponse {
  data: PlantillacontablePlantillacontabledialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface PlantillacontablePlantillacontabledialogErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
