/**
 * Gateway Port para Ingresos Proyectados
 * Define el contrato de comunicación con el backend
 */

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

export interface IngresoProyectadoGatewayPort {
  findAll(filters?: IngresoProyectadoFilterParams): Promise<IngresoProyectadoListResponse>;
  findById(id: number): Promise<IngresoProyectadoResponse>;
  create(request: CreateIngresoProyectadoRequest): Promise<IngresoProyectadoResponse>;
  generar(request: GenerarIngresosProyectadosRequest): Promise<ProcesoResponse>;
  update(id: number, request: UpdateIngresoProyectadoRequest): Promise<IngresoProyectadoResponse>;
  remove(id: number): Promise<DeleteResponse>;
}
