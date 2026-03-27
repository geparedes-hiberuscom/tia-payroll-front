import { NominaresumengeneralResumengralnominadialogGatewayPort } from '../../../../application/port/output/NominaresumengeneralResumengralnominadialogGatewayPort';
import { NominaresumengeneralResumengralnominadialogResponse, NominaresumengeneralResumengralnominadialogListResponse, CreateNominaresumengeneralResumengralnominadialogRequest, UpdateNominaresumengeneralResumengralnominadialogRequest, NominaresumengeneralResumengralnominadialogFilterParams } from '../../../input/adapter/dto/NominaresumengeneralResumengralnominadialogDto';
import { NominaresumengeneralResumengralnominadialogApiMapper } from '../mapper/NominaresumengeneralResumengralnominadialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/nomina-resumen';

export class NominaresumengeneralResumengralnominadialogGatewayAdapter implements NominaresumengeneralResumengralnominadialogGatewayPort {

  async obtenerResumenGeneral(params: { ejecucionId: number; empresaId?: number; tipo?: string }): Promise<NominaresumengeneralResumengralnominadialogResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return NominaresumengeneralResumengralnominadialogApiMapper.toResponse(data);
  }

  async obtenerResumenDetallado(ejecucionId: number): Promise<NominaresumengeneralResumengralnominadialogResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${ejecucionId}`);
    return NominaresumengeneralResumengralnominadialogApiMapper.toResponse(data);
  }

  async generarResumen(request: CreateNominaresumengeneralResumengralnominadialogRequest): Promise<NominaresumengeneralResumengralnominadialogResponse> {
    const payload = NominaresumengeneralResumengralnominadialogApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(`${BASE_PATH}/generar`, payload);
    return NominaresumengeneralResumengralnominadialogApiMapper.toResponse(data);
  }

  async exportarResumen(params: any): Promise<any> {
    const payload = NominaresumengeneralResumengralnominadialogApiMapper.toCreatePayload(params);
    const { data } = await httpClient.post(`${BASE_PATH}/exportar`, payload);
    return data;
  }

  async eliminarResumen(ejecucionId: number): Promise<any> {
    const { data } = await httpClient.delete(`${BASE_PATH}/${ejecucionId}`);
    return data;
  }
}
