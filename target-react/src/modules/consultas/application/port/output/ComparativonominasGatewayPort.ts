import { ComparativonominasResponse, ComparativonominasListResponse, CreateComparativonominasRequest, UpdateComparativonominasRequest, ComparativonominasFilterParams } from '../../infrastructure/input/adapter/dto/ComparativonominasDto';

/**
 * Gateway Port (Output Port): comparativoNominas.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
  // GET /api/v1/comparativo-nominas — Listar comparativos de nóminas
  // GET /api/v1/comparativo-nominas/{id} — Obtener comparativo de nómina por ID
  // POST /api/v1/comparativo-nominas — Crear comparativo de nóminas
  // PUT /api/v1/comparativo-nominas/{id} — Actualizar comparativo de nóminas
  // DELETE /api/v1/comparativo-nominas/{id} — Eliminar comparativo de nóminas
 */
export interface ComparativonominasGatewayPort {
  // GET /api/v1/comparativo-nominas
  listarComparativos(params?: ComparativonominasFilterParams): Promise<ComparativonominasListResponse>;
  
  // GET /api/v1/comparativo-nominas/{id}
  obtenerComparativo(id: string): Promise<ComparativonominasResponse>;
  
  // POST /api/v1/comparativo-nominas
  crearComparativo(request: CreateComparativonominasRequest): Promise<ComparativonominasResponse>;
  
  // PUT /api/v1/comparativo-nominas/{id}
  actualizarComparativo(id: string, request: UpdateComparativonominasRequest): Promise<ComparativonominasResponse>;
  
  // DELETE /api/v1/comparativo-nominas/{id}
  eliminarComparativo(id: string): Promise<void>;
}
