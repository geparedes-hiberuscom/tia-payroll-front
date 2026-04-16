import { GeningproyectadosResponse, GeningproyectadosListResponse, GenerarGeningproyectadosRequest, ProcesoGeningproyectadosResponse, UpdateGeningproyectadosRequest, GeningproyectadosFilterParams } from '../../infrastructure/input/adapter/dto/GeningproyectadosDto';

/**
 * Gateway Port (Output Port): genIngProyectados.zul
 * Endpoints:
 *   GET    /api/v1/ingresos-proyectados
 *   GET    /api/v1/ingresos-proyectados/{id}
 *   POST   /api/v1/ingresos-proyectados/generar
 *   PUT    /api/v1/ingresos-proyectados/{id}
 *   DELETE /api/v1/ingresos-proyectados/{id}
 */
export interface GeningproyectadosGatewayPort {
  findById(id: number): Promise<GeningproyectadosResponse>;
  findAll(params?: GeningproyectadosFilterParams): Promise<GeningproyectadosListResponse>;
  generar(request: GenerarGeningproyectadosRequest): Promise<ProcesoGeningproyectadosResponse>;
  update(id: number, request: UpdateGeningproyectadosRequest): Promise<GeningproyectadosResponse>;
  remove(id: number): Promise<void>;
}
