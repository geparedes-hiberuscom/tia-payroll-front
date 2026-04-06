import { GeningproyectadosGatewayPort } from '../port/output/GeningproyectadosGatewayPort';
import { GeningproyectadosResponse, GeningproyectadosListResponse, GenerarGeningproyectadosRequest, ProcesoGeningproyectadosResponse, UpdateGeningproyectadosRequest, GeningproyectadosFilterParams } from '../../infrastructure/input/adapter/dto/GeningproyectadosDto';

export class GeningproyectadosService {
  constructor(private readonly gateway: GeningproyectadosGatewayPort) {}

  async findById(id: number): Promise<GeningproyectadosResponse> {
    return this.gateway.findById(id);
  }

  async findAll(params?: GeningproyectadosFilterParams): Promise<GeningproyectadosListResponse> {
    return this.gateway.findAll(params);
  }

  async generar(request: GenerarGeningproyectadosRequest): Promise<ProcesoGeningproyectadosResponse> {
    return this.gateway.generar(request);
  }

  async update(id: number, request: UpdateGeningproyectadosRequest): Promise<GeningproyectadosResponse> {
    return this.gateway.update(id, request);
  }

  async remove(id: number): Promise<void> {
    return this.gateway.remove(id);
  }
}
