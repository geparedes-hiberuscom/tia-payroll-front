import { ConsueldoResponse, ConsueldoListResponse, CreateConsueldoRequest, UpdateConsueldoRequest, ConsueldoFilterParams } from '../../infrastructure/input/adapter/dto/ConsueldoDto';

/**
 * Gateway Port (Output Port): conSueldo.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
  // GET /api/v1/consulta-sueldos — Consultar sueldos de colaboradores
  // GET /api/v1/consulta-sueldos/{empresaId}/{colaboradorId} — Obtener sueldo de un colaborador
  // GET /api/v1/consulta-sueldos/estructura-organizacional — Obtener estructura organizacional para filtro
  // POST /api/v1/consulta-sueldos/exportar — Exportar consulta de sueldos
  // DELETE /api/v1/consulta-sueldos/{empresaId}/{colaboradorId} — Eliminar registro de sueldo
 */
export interface ConsueldoGatewayPort {
  findById(id: string): Promise<ConsueldoResponse>;
  findAll(params?: ConsueldoFilterParams): Promise<ConsueldoListResponse>;
  create(request: CreateConsueldoRequest): Promise<ConsueldoResponse>;
  update(id: string, request: UpdateConsueldoRequest): Promise<ConsueldoResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
