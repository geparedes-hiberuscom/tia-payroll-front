import { ParametrosParametrosdialogResponse, ParametrosParametrosdialogListResponse, CreateParametrosParametrosdialogRequest, UpdateParametrosParametrosdialogRequest, ParametrosParametrosdialogFilterParams } from '../../infrastructure/input/adapter/dto/ParametrosParametrosdialogDto';

/**
 * Gateway Port (Output Port): parametros.zul / parametrosDialog.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
 */
export interface ParametrosParametrosdialogGatewayPort {
  findById(entorno: string, idParametro: string): Promise<ParametrosParametrosdialogResponse>;
  findAll(params?: ParametrosParametrosdialogFilterParams): Promise<ParametrosParametrosdialogListResponse>;
  create(request: CreateParametrosParametrosdialogRequest): Promise<ParametrosParametrosdialogResponse>;
  update(entorno: string, idParametro: string, request: UpdateParametrosParametrosdialogRequest): Promise<ParametrosParametrosdialogResponse>;
  remove(entorno: string, idParametro: string): Promise<void>;
}
