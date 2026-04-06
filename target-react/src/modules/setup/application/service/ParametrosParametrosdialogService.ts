import { ParametrosParametrosdialogGatewayPort } from '../port/output/ParametrosParametrosdialogGatewayPort';
import { ParametrosParametrosdialogResponse, ParametrosParametrosdialogListResponse, CreateParametrosParametrosdialogRequest, UpdateParametrosParametrosdialogRequest, ParametrosParametrosdialogFilterParams } from '../../infrastructure/input/adapter/dto/ParametrosParametrosdialogDto';

/**
 * Application Service: parametros.zul / parametrosDialog.zul (parametros_parametrosDialog)
 * Implementa la lógica de aplicación invocando el Gateway Port (puerto de salida).
 * Controladores fuente: 5
 * Servicios fuente: 0
 *
 * TODO: Copilot — Implementa lógica de negocio adicional (validaciones, transformaciones).
 */
export class ParametrosParametrosdialogService {
  constructor(private readonly gateway: ParametrosParametrosdialogGatewayPort) {}

  // Origen controlador: GET /api/v1/parametros — GET /api/v1/parametros — Listar parámetros
  // Origen controlador: GET /api/v1/parametros/{entorno}/{idParametro} — GET /api/v1/parametros/{entorno}/{idParametro} — Obtener parámetro por ID
  // Origen controlador: POST /api/v1/parametros — POST /api/v1/parametros — Crear parámetro
  // Origen controlador: PUT /api/v1/parametros/{entorno}/{idParametro} — PUT /api/v1/parametros/{entorno}/{idParametro} — Actualizar parámetro
  // Origen controlador: DELETE /api/v1/parametros/{entorno}/{idParametro} — DELETE /api/v1/parametros/{entorno}/{idParametro} — Eliminar parámetro

  async findById(entorno: string, idParametro: string): Promise<ParametrosParametrosdialogResponse> {
    return this.gateway.findById(entorno, idParametro);
  }

  async findAll(params?: ParametrosParametrosdialogFilterParams): Promise<ParametrosParametrosdialogListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateParametrosParametrosdialogRequest): Promise<ParametrosParametrosdialogResponse> {
    return this.gateway.create(request);
  }

  async update(entorno: string, idParametro: string, request: UpdateParametrosParametrosdialogRequest): Promise<ParametrosParametrosdialogResponse> {
    return this.gateway.update(entorno, idParametro, request);
  }

  async remove(entorno: string, idParametro: string): Promise<void> {
    return this.gateway.remove(entorno, idParametro);
  }

}
