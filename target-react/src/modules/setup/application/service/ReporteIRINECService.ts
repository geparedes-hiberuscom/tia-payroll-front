/**
 * Application Service para Reportes IR/INEC
 * Implementa la lógica de negocio y delega al Gateway Port
 */

import { ReporteIRINECGatewayPort } from '../port/output/ReporteIRINECGatewayPort';
import {
  CreateReporteIRINECRequest,
  UpdateReporteIRINECRequest,
  GenerarReporteIRINECRequest,
  ReporteIRINECResponse,
  ReporteIRINECFilterParams,
  ReporteIRINECListResponse,
  ProcesoResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/ReporteIRINECDto';

export class ReporteIRINECService {
  constructor(private readonly gateway: ReporteIRINECGatewayPort) {}

  async findAll(filters?: ReporteIRINECFilterParams): Promise<ReporteIRINECListResponse> {
    return this.gateway.findAll(filters);
  }

  async findById(id: number): Promise<ReporteIRINECResponse> {
    if (!id) {
      throw new Error('ID de reporte es requerido');
    }
    return this.gateway.findById(id);
  }

  async create(request: CreateReporteIRINECRequest): Promise<ReporteIRINECResponse> {
    this.validateCreateRequest(request);
    return this.gateway.create(request);
  }

  async generar(request: GenerarReporteIRINECRequest): Promise<ProcesoResponse> {
    this.validateGenerarRequest(request);
    return this.gateway.generar(request);
  }

  async update(id: number, request: UpdateReporteIRINECRequest): Promise<ReporteIRINECResponse> {
    if (!id) {
      throw new Error('ID de reporte es requerido');
    }
    return this.gateway.update(id, request);
  }

  async remove(id: number): Promise<DeleteResponse> {
    if (!id) {
      throw new Error('ID de reporte es requerido');
    }
    return this.gateway.remove(id);
  }

  private validateCreateRequest(request: CreateReporteIRINECRequest): void {
    if (!request.empresaId) throw new Error('ID de empresa es requerido');
    if (!request.tipo) throw new Error('Tipo de reporte (IR/INEC) es requerido');
    if (!request.anio) throw new Error('Año fiscal es requerido');
  }

  private validateGenerarRequest(request: GenerarReporteIRINECRequest): void {
    if (!request.empresaId) throw new Error('ID de empresa es requerido');
    if (!request.tipo) throw new Error('Tipo de reporte es requerido');
    if (!request.anio) throw new Error('Año fiscal es requerido');
  }
}
