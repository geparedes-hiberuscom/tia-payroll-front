import { AcumuladosResponse, AcumuladosListResponse, CreateAcumuladosRequest, UpdateAcumuladosRequest, AcumuladosFilterParams } from '../../infrastructure/input/adapter/dto/AcumuladosDto';

/**
 * Gateway Port (Output Port): acumulados.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
  // GET /api/v1/acumulados — Listar acumulados de nómina
  // GET /api/v1/acumulados/{id} — Obtener acumulado por ID
  // POST /api/v1/acumulados — Crear acumulado de nómina
  // PUT /api/v1/acumulados/{id} — Actualizar acumulado de nómina
  // DELETE /api/v1/acumulados/{id} — Eliminar acumulado de nómina
 */
export interface AcumuladosGatewayPort {
  findById(id: string): Promise<AcumuladosResponse>;
  findAll(params?: AcumuladosFilterParams): Promise<AcumuladosListResponse>;
  create(request: CreateAcumuladosRequest): Promise<AcumuladosResponse>;
  update(id: string, request: UpdateAcumuladosRequest): Promise<AcumuladosResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
