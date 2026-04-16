import { GastospersonalesdialogGatewayPort } from '../port/output/GastospersonalesdialogGatewayPort';
import { GastospersonalesdialogResponse, GastospersonalesdialogListResponse, CreateGastospersonalesdialogRequest, UpdateGastospersonalesdialogRequest, GastospersonalesdialogFilterParams } from '../../infrastructure/input/adapter/dto/GastospersonalesdialogDto';

/**
 * Application Service: GastosPersonalesDialog.zul (GastosPersonalesDialog)
 * Implementa la lógica de aplicación invocando el Gateway Port (puerto de salida).
 * Controladores fuente: 5
 * Servicios fuente: 0
 */
export class GastospersonalesdialogService {
  constructor(private readonly gateway: GastospersonalesdialogGatewayPort) {}

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

  async exportarExcel(empresaId: number, anio: number): Promise<Blob> {
    return this.gateway.exportarExcel(empresaId, anio);
  }
}
