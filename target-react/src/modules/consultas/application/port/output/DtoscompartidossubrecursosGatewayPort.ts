import { DtoscompartidossubrecursosResponse, DtoscompartidossubrecursosListResponse, CreateDtoscompartidossubrecursosRequest, UpdateDtoscompartidossubrecursosRequest, DtoscompartidossubrecursosFilterParams } from '../../infrastructure/input/adapter/dto/DtoscompartidossubrecursosDto';

/**
 * Gateway Port (Output Port): DTOs compartidos (subrecursos)
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
 */
export interface DtoscompartidossubrecursosGatewayPort {
  findById(id: string): Promise<DtoscompartidossubrecursosResponse>;
  findAll(params?: DtoscompartidossubrecursosFilterParams): Promise<DtoscompartidossubrecursosListResponse>;
  create(request: CreateDtoscompartidossubrecursosRequest): Promise<DtoscompartidossubrecursosResponse>;
  update(id: string, request: UpdateDtoscompartidossubrecursosRequest): Promise<DtoscompartidossubrecursosResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
