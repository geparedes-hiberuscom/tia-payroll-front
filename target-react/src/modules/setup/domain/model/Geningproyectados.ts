/**
 * Modelo de Dominio: genIngProyectados.zul (genIngProyectados)
 * Vertical Slice: 🔧 Setup y Configuración
 * Entidades fuente: 6
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 */

// Fuente: IngresosProyectadosListResponseDTO — Lista de ingresos proyectados
// Fuente: IngresoProyectadoResponseDTO — Detalle de ingreso proyectado
// Fuente: GenerarIngresosProyectadosDTO — Datos para generar ingresos proyectados
// Fuente: ProcesoResponseDTO — Resultado de la ejecución del proceso de generación
// Fuente: IngresoProyectadoUpdateDTO — Datos para actualizar ingreso proyectado
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface Geningproyectados {
  id: number;
  empresaId: number;
  empresaNombre?: string;
  anio: number;
  mes?: number;
  montoProyectado: number;
  estado?: string;
  fechaGeneracion?: Date;
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateGeningproyectados = Omit<Geningproyectados, 'id' | 'empresaNombre' | 'fechaGeneracion'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateGeningproyectados = Partial<Omit<Geningproyectados, 'id' | 'empresaId' | 'anio' | 'empresaNombre' | 'fechaGeneracion'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface GeningproyectadosFilter {
  page?: number;
  size?: number;
  empresaId?: number;
  anio?: number;
}

/**
 * Resultado paginado del dominio
 */
export interface GeningproyectadosPageResult {
  content: Geningproyectados[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
