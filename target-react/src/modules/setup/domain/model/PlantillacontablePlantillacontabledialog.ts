/**
 * Modelo de Dominio: plantillaContable.zul / plantillaContableDialog.zul (plantillaContable_plantillaContableDialog)
 * Vertical Slice: 🔧 Setup y Configuración
 * Entidades fuente: 5
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 */

// Fuente: PlantillaContablePageResponseDTO — Lista paginada de plantillas contables
// Fuente: PlantillaContableResponseDTO — Detalle de una plantilla contable
// Fuente: PlantillaContableCreateDTO — Datos para crear una nueva plantilla contable
// Fuente: PlantillaContableUpdateDTO — Datos para actualizar una plantilla contable
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface PlantillacontablePlantillacontabledialog {
  id: number;
  procesoId: number;
  procesoNombre?: string;
  rubroId: string;
  rubroNombre?: string;
  cuenta: string;
  subcuenta?: string;
  auxiliar?: string;
  debeHaber: string;
  distribucionCosto?: string;
  rpt?: string;
  tcDmCentroCosto?: string;
  tcDmLocalidad?: string;
  agrupacionCC?: string;
  agrupacionLoc?: string;
  dimensionId?: number;
  dimensionNombre?: string;
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreatePlantillacontablePlantillacontabledialog = Omit<PlantillacontablePlantillacontabledialog, 'id' | 'procesoNombre' | 'rubroNombre' | 'dimensionNombre'>;

/**
 * Tipo para actualización parcial
 */
export type UpdatePlantillacontablePlantillacontabledialog = Partial<Omit<PlantillacontablePlantillacontabledialog, 'id' | 'procesoId' | 'rubroId' | 'procesoNombre' | 'rubroNombre' | 'dimensionNombre'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface PlantillacontablePlantillacontabledialogFilter {
  page?: number;
  size?: number;
  procesoId?: number;
  rubroId?: string;
  cuenta?: string;
  localidadId?: number;
}

/**
 * Resultado paginado del dominio
 */
export interface PlantillacontablePlantillacontabledialogPageResult {
  content: PlantillacontablePlantillacontabledialog[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
