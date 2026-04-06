/**
 * Gateway Port para Parámetros del sistema
 * Define el contrato de comunicación con el backend
 */

import {
  CreateParametroRequest,
  UpdateParametroRequest,
  ParametroResponse,
  ParametroFilterParams,
  ParametroPageResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/ParametroDto';

export interface ParametroGatewayPort {
  findAll(filters?: ParametroFilterParams): Promise<ParametroPageResponse>;
  findById(entorno: string, idParametro: string): Promise<ParametroResponse>;
  create(request: CreateParametroRequest): Promise<ParametroResponse>;
  update(entorno: string, idParametro: string, request: UpdateParametroRequest): Promise<ParametroResponse>;
  remove(entorno: string, idParametro: string): Promise<DeleteResponse>;
}
