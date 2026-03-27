import { ConsueldoGatewayPort } from '../port/output/ConsueldoGatewayPort';
import { ConsueldoResponse, ConsueldoListResponse, CreateConsueldoRequest, UpdateConsueldoRequest, ConsueldoFilterParams } from '../../infrastructure/input/adapter/dto/ConsueldoDto';

/**
 * Application Service: conSueldo.zul (conSueldo)
 * Implementa la lógica de aplicación invocando el Gateway Port (puerto de salida).
 * Controladores fuente: 5
 * Servicios fuente: 0
 *
 * TODO: Copilot — Implementa lógica de negocio adicional (validaciones, transformaciones).
 */
export class ConsueldoService {
  constructor(private readonly gateway: ConsueldoGatewayPort) {}

  // Origen controlador: GET /api/v1/consulta-sueldos — GET /api/v1/consulta-sueldos — Consultar sueldos de colaboradores
  // Origen controlador: GET /api/v1/consulta-sueldos/{empresaId}/{colaboradorId} — GET /api/v1/consulta-sueldos/{empresaId}/{colaboradorId} — Obtener sueldo de un colaborador
  // Origen controlador: GET /api/v1/consulta-sueldos/estructura-organizacional — GET /api/v1/consulta-sueldos/estructura-organizacional — Obtener estructura organizacional para filtro
  // Origen controlador: POST /api/v1/consulta-sueldos/exportar — POST /api/v1/consulta-sueldos/exportar — Exportar consulta de sueldos
  // Origen controlador: DELETE /api/v1/consulta-sueldos/{empresaId}/{colaboradorId} — DELETE /api/v1/consulta-sueldos/{empresaId}/{colaboradorId} — Eliminar registro de sueldo

  async findById(id: string): Promise<ConsueldoResponse> {
    return this.gateway.findById(id);
  }

  async findAll(params?: ConsueldoFilterParams): Promise<ConsueldoListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateConsueldoRequest): Promise<ConsueldoResponse> {
    // TODO: Validaciones de negocio antes de crear
    return this.gateway.create(request);
  }

  async update(id: string, request: UpdateConsueldoRequest): Promise<ConsueldoResponse> {
    // TODO: Validaciones de negocio antes de actualizar
    return this.gateway.update(id, request);
  }

  async remove(id: string): Promise<void> {
    return this.gateway.remove(id);
  }

  // TODO: Agregar métodos de negocio adicionales que combinen llamadas al gateway
}
