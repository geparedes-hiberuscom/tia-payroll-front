import { GastospersonalesdialogGatewayPort } from '../port/output/GastospersonalesdialogGatewayPort';
import { GastospersonalesdialogResponse, GastospersonalesdialogListResponse, CreateGastospersonalesdialogRequest, UpdateGastospersonalesdialogRequest, GastospersonalesdialogFilterParams } from '../../infrastructure/input/adapter/dto/GastospersonalesdialogDto';

/**
 * Application Service: GastosPersonalesDialog.zul (GastosPersonalesDialog)
 * Implementa la lógica de aplicación invocando el Gateway Port (puerto de salida).
 * Controladores fuente: 5
 * Servicios fuente: 0
 *
 * TODO: Copilot — Implementa lógica de negocio adicional (validaciones, transformaciones).
 */
export class GastospersonalesdialogService {
  constructor(private readonly gateway: GastospersonalesdialogGatewayPort) {}

  // Origen controlador: GET /api/v1/gastos-personales — GET /api/v1/gastos-personales — Listar gastos personales
  // Origen controlador: GET /api/v1/gastos-personales/{id} — GET /api/v1/gastos-personales/{id} — Obtener gasto personal por ID
  // Origen controlador: POST /api/v1/gastos-personales — POST /api/v1/gastos-personales — Crear gasto personal
  // Origen controlador: PUT /api/v1/gastos-personales/{id} — PUT /api/v1/gastos-personales/{id} — Actualizar gasto personal
  // Origen controlador: DELETE /api/v1/gastos-personales/{id} — DELETE /api/v1/gastos-personales/{id} — Eliminar gasto personal

  async findById(id: number): Promise<GastospersonalesdialogResponse> {
    return this.gateway.findById(id);
  }

  async findAll(params?: GastospersonalesdialogFilterParams): Promise<GastospersonalesdialogListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreateGastospersonalesdialogRequest): Promise<GastospersonalesdialogResponse> {
    return this.gateway.create(request);
  }

  async update(id: number, request: UpdateGastospersonalesdialogRequest): Promise<GastospersonalesdialogResponse> {
    return this.gateway.update(id, request);
  }

  async remove(id: number): Promise<void> {
    return this.gateway.remove(id);
  }

}
