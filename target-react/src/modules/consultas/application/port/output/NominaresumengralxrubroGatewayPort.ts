import { NominaresumengralxrubroResponse, NominaresumengralxrubroListResponse, CreateNominaresumengralxrubroRequest, UpdateNominaresumengralxrubroRequest, NominaresumengralxrubroFilterParams } from '../../infrastructure/input/adapter/dto/NominaresumengralxrubroDto';

/**
 * Gateway Port (Output Port): nominaresumenGralxRubro.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
  // GET /api/v1/nomina-resumen/por-rubro — Listar resumen de nómina por rubro
  // GET /api/v1/nomina-resumen/por-rubro/{ejecucionId}/{rubroId} — Obtener resumen de un rubro específico
  // GET /api/v1/nomina-resumen/por-rubro/{ejecucionId}/{rubroId}/colaboradores — Listar colaboradores de un rubro
  // POST /api/v1/nomina-resumen/por-rubro/exportar — Exportar resumen por rubro
  // DELETE /api/v1/nomina-resumen/por-rubro/{ejecucionId}/{rubroId} — Eliminar resumen de rubro
 */
export interface NominaresumengralxrubroGatewayPort {
  findById(id: string): Promise<NominaresumengralxrubroResponse>;
  findAll(params?: NominaresumengralxrubroFilterParams): Promise<NominaresumengralxrubroListResponse>;
  create(request: CreateNominaresumengralxrubroRequest): Promise<NominaresumengralxrubroResponse>;
  update(id: string, request: UpdateNominaresumengralxrubroRequest): Promise<NominaresumengralxrubroResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
