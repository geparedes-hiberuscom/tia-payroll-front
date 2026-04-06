/**
 * Gateway Port para Gastos Personales deducibles
 * Define el contrato de comunicación con el backend
 */

import {
  CreateGastosPersonalesRequest,
  UpdateGastosPersonalesRequest,
  GastosPersonalesResponse,
  GastosPersonalesFilterParams,
  GastosPersonalesListResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/GastosPersonalesDto';

export interface GastosPersonalesGatewayPort {
  findAll(filters?: GastosPersonalesFilterParams): Promise<GastosPersonalesListResponse>;
  findById(id: number): Promise<GastosPersonalesResponse>;
  create(request: CreateGastosPersonalesRequest): Promise<GastosPersonalesResponse>;
  update(id: number, request: UpdateGastosPersonalesRequest): Promise<GastosPersonalesResponse>;
  remove(id: number): Promise<DeleteResponse>;
}
