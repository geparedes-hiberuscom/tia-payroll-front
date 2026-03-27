import { ComparativonominasGatewayPort } from '../port/output/ComparativonominasGatewayPort';
import { ComparativonominasResponse, ComparativonominasListResponse, CreateComparativonominasRequest, UpdateComparativonominasRequest, ComparativonominasFilterParams } from '../../infrastructure/input/adapter/dto/ComparativonominasDto';

export class ComparativonominasService {
  constructor(private readonly gateway: ComparativonominasGatewayPort) {}

  async listarComparativos(params?: ComparativonominasFilterParams): Promise<ComparativonominasListResponse> {
    return this.gateway.listarComparativos(params);
  }

  async obtenerComparativo(id: string): Promise<ComparativonominasResponse> {
    if (!id) throw new Error('ID requerido');
    return this.gateway.obtenerComparativo(id);
  }

  async crearComparativo(request: CreateComparativonominasRequest): Promise<ComparativonominasResponse> {
    return this.gateway.crearComparativo(request);
  }

  async actualizarComparativo(id: string, request: UpdateComparativonominasRequest): Promise<ComparativonominasResponse> {
    if (!id) throw new Error('ID requerido');
    return this.gateway.actualizarComparativo(id, request);
  }

  async eliminarComparativo(id: string): Promise<void> {
    if (!id) throw new Error('ID requerido');
    return this.gateway.eliminarComparativo(id);
  }
}
