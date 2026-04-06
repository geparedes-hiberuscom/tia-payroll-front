import { GastospersonalesdialogResponse, GastospersonalesdialogListResponse, CreateGastospersonalesdialogRequest, UpdateGastospersonalesdialogRequest, GastospersonalesdialogFilterParams } from '../../infrastructure/input/adapter/dto/GastospersonalesdialogDto';

/**
 * Gateway Port (Output Port): GastosPersonalesDialog.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
  // GET /api/v1/gastos-personales — Listar gastos personales
  // GET /api/v1/gastos-personales/{id} — Obtener gasto personal por ID
  // POST /api/v1/gastos-personales — Crear gasto personal
  // PUT /api/v1/gastos-personales/{id} — Actualizar gasto personal
  // DELETE /api/v1/gastos-personales/{id} — Eliminar gasto personal
 */
export interface GastospersonalesdialogGatewayPort {
  findById(id: string): Promise<GastospersonalesdialogResponse>;
  findAll(params?: GastospersonalesdialogFilterParams): Promise<GastospersonalesdialogListResponse>;
  create(request: CreateGastospersonalesdialogRequest): Promise<GastospersonalesdialogResponse>;
  update(id: string, request: UpdateGastospersonalesdialogRequest): Promise<GastospersonalesdialogResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
