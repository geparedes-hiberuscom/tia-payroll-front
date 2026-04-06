import { ParametrosParametrosdialogResponse, ParametrosParametrosdialogListResponse, CreateParametrosParametrosdialogRequest, UpdateParametrosParametrosdialogRequest, ParametrosParametrosdialogFilterParams } from '../../infrastructure/input/adapter/dto/ParametrosParametrosdialogDto';

/**
 * Gateway Port (Output Port): parametros.zul / parametrosDialog.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
 */
export interface ParametrosParametrosdialogGatewayPort {
  findById(id: string): Promise<ParametrosParametrosdialogResponse>;
  findAll(params?: ParametrosParametrosdialogFilterParams): Promise<ParametrosParametrosdialogListResponse>;
  create(request: CreateParametrosParametrosdialogRequest): Promise<ParametrosParametrosdialogResponse>;
  update(id: string, request: UpdateParametrosParametrosdialogRequest): Promise<ParametrosParametrosdialogResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
