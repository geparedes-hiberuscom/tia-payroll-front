/**
 * Application Service para Ingresos Proyectados
 * Implementa la lógica de negocio y delega al Gateway Port
 */

import { IngresoProyectadoGatewayPort } from '../port/output/IngresoProyectadoGatewayPort';
import {
  CreateIngresoProyectadoRequest,
  UpdateIngresoProyectadoRequest,
  GenerarIngresosProyectadosRequest,
  IngresoProyectadoResponse,
  IngresoProyectadoFilterParams,
  IngresoProyectadoListResponse,
  ProcesoResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/IngresoProyectadoDto';

export class IngresoProyectadoService {
  constructor(private readonly gateway: IngresoProyectadoGatewayPort) {}

  async findAll(filters?: IngresoProyectadoFilterParams): Promise<IngresoProyectadoListResponse> {
    return this.gateway.findAll(filters);
  }

  async findById(id: number): Promise<IngresoProyectadoResponse> {
    if (!id) {
      throw new Error('ID de ingreso proyectado es requerido');
    }
    return this.gateway.findById(id);
  }

  async create(request: CreateIngresoProyectadoRequest): Promise<IngresoProyectadoResponse> {
    this.validateCreateRequest(request);
    return this.gateway.create(request);
  }

  async generar(request: GenerarIngresosProyectadosRequest): Promise<ProcesoResponse> {
    this.validateGenerarRequest(request);
    return this.gateway.generar(request);
  }

  async update(id: number, request: UpdateIngresoProyectadoRequest): Promise<IngresoProyectadoResponse> {
    if (!id) {
      throw new Error('ID de ingreso proyectado es requerido');
    }
    return this.gateway.update(id, request);
  }

  async remove(id: number): Promise<DeleteResponse> {
    if (!id) {
      throw new Error('ID de ingreso proyectado es requerido');
    }
    return this.gateway.remove(id);
  }

  private validateCreateRequest(request: CreateIngresoProyectadoRequest): void {
    if (!request.empresaId) throw new Error('ID de empresa es requerido');
    if (!request.anio) throw new Error('Año fiscal es requerido');
    if (request.montoProyectado === undefined || request.montoProyectado === null) {
      throw new Error('Monto proyectado es requerido');
    }
  }

  private validateGenerarRequest(request: GenerarIngresosProyectadosRequest): void {
    if (!request.empresaId) throw new Error('ID de empresa es requerido');
    if (!request.anio) throw new Error('Año fiscal es requerido');
  }
}
