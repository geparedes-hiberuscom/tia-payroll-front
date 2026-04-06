import { GeningproyectadosResponse, GeningproyectadosListResponse, CreateGeningproyectadosRequest, UpdateGeningproyectadosRequest, GeningproyectadosFilterParams } from '../../infrastructure/input/adapter/dto/GeningproyectadosDto';

/**
 * Gateway Port (Output Port): genIngProyectados.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
  // GET /api/v1/ingresos-proyectados — Listar ingresos proyectados
  // GET /api/v1/ingresos-proyectados/{id} — Obtener ingreso proyectado por ID
  // POST /api/v1/ingresos-proyectados/generar — Generar ingresos proyectados
  // PUT /api/v1/ingresos-proyectados/{id} — Actualizar ingreso proyectado
  // DELETE /api/v1/ingresos-proyectados/{id} — Eliminar ingreso proyectado
 */
export interface GeningproyectadosGatewayPort {
  findById(id: string): Promise<GeningproyectadosResponse>;
  findAll(params?: GeningproyectadosFilterParams): Promise<GeningproyectadosListResponse>;
  create(request: CreateGeningproyectadosRequest): Promise<GeningproyectadosResponse>;
  update(id: string, request: UpdateGeningproyectadosRequest): Promise<GeningproyectadosResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
