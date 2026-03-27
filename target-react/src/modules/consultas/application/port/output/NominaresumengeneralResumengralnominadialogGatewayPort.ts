import { NominaresumengeneralResumengralnominadialogResponse, NominaresumengeneralResumengralnominadialogListResponse, CreateNominaresumengeneralResumengralnominadialogRequest, UpdateNominaresumengeneralResumengralnominadialogRequest, NominaresumengeneralResumengralnominadialogFilterParams } from '../../infrastructure/input/adapter/dto/NominaresumengeneralResumengralnominadialogDto';

/**
 * Gateway Port (Output Port): nominaresumenGeneral.zul / ResumenGralNominaDialog.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
 */
export interface NominaresumengeneralResumengralnominadialogGatewayPort {
  findById(id: string): Promise<NominaresumengeneralResumengralnominadialogResponse>;
  findAll(params?: NominaresumengeneralResumengralnominadialogFilterParams): Promise<NominaresumengeneralResumengralnominadialogListResponse>;
  create(request: CreateNominaresumengeneralResumengralnominadialogRequest): Promise<NominaresumengeneralResumengralnominadialogResponse>;
  update(id: string, request: UpdateNominaresumengeneralResumengralnominadialogRequest): Promise<NominaresumengeneralResumengralnominadialogResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
