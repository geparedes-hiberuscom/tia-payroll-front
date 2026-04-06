/**
 * DTOs para Ingresos Proyectados
 * Screen: genIngProyectados.zul
 */

export interface CreateIngresoProyectadoRequest {
  empresaId: number;
  anio: number;
  mes?: number;
  montoProyectado: number;
  estado?: string;
}

export interface UpdateIngresoProyectadoRequest {
  montoProyectado?: number;
  estado?: string;
}

export interface GenerarIngresosProyectadosRequest {
  empresaId: number;
  anio: number;
  mesDesde?: number;
  mesHasta?: number;
}

export interface IngresoProyectadoResponse {
  id: number;
  empresaId: number;
  empresaNombre?: string;
  anio: number;
  mes?: number;
  montoProyectado: number;
  estado?: string;
  fechaGeneracion?: string;
}

export interface IngresoProyectadoFilterParams {
  empresaId?: number;
  anio?: number;
}

export interface IngresoProyectadoListResponse {
  items: IngresoProyectadoResponse[];
  total: number;
}

export interface ProcesoResponse {
  success: boolean;
  message: string;
  registrosGenerados?: number;
  archivoUrl?: string;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}
