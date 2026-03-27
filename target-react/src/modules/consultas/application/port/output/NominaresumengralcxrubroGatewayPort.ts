import { NominaresumengralcxrubroResponse, NominaresumengralcxrubroListResponse, CreateNominaresumengralcxrubroRequest, UpdateNominaresumengralcxrubroRequest, NominaresumengralcxrubroFilterParams } from '../../infrastructure/input/adapter/dto/NominaresumengralcxrubroDto';

/**
 * Gateway Port (Output Port): nominaresumenGralCxRubro.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
  // GET /api/v1/nomina-resumen/por-clasificacion — Listar resumen de nómina por clasificación de rubro
  // GET /api/v1/nomina-resumen/por-clasificacion/{ejecucionId}/{claseId} — Obtener resumen de una clasificación específica
  // GET /api/v1/nomina-resumen/por-clasificacion/{ejecucionId}/{claseId}/rubros — Listar rubros de una clasificación
  // POST /api/v1/nomina-resumen/por-clasificacion/exportar — Exportar resumen por clasificación de rubro
  // DELETE /api/v1/nomina-resumen/por-clasificacion/{ejecucionId}/{claseId} — Eliminar resumen de clasificación
 */
export interface NominaresumengralcxrubroGatewayPort {
  findById(id: string): Promise<NominaresumengralcxrubroResponse>;
  findAll(params?: NominaresumengralcxrubroFilterParams): Promise<NominaresumengralcxrubroListResponse>;
  create(request: CreateNominaresumengralcxrubroRequest): Promise<NominaresumengralcxrubroResponse>;
  update(id: string, request: UpdateNominaresumengralcxrubroRequest): Promise<NominaresumengralcxrubroResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
