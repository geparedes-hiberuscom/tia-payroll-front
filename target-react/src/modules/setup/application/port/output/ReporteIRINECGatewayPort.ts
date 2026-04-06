/**
 * Gateway Port para Reportes IR/INEC
 * Define el contrato de comunicación con el backend
 */

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

export interface ReporteIRINECGatewayPort {
  findAll(filters?: ReporteIRINECFilterParams): Promise<ReporteIRINECListResponse>;
  findById(id: number): Promise<ReporteIRINECResponse>;
  create(request: CreateReporteIRINECRequest): Promise<ReporteIRINECResponse>;
  generar(request: GenerarReporteIRINECRequest): Promise<ProcesoResponse>;
  update(id: number, request: UpdateReporteIRINECRequest): Promise<ReporteIRINECResponse>;
  remove(id: number): Promise<DeleteResponse>;
}
