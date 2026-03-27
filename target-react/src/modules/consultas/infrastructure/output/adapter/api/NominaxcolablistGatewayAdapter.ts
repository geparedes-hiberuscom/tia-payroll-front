import { NominaxcolablistGatewayPort } from '../../../../application/port/output/NominaxcolablistGatewayPort';
import { NominaxcolablistResponse, NominaxcolablistListResponse, CreateNominaxcolablistRequest, NominaxcolablistFilterParams, RubroHistoricoDTO, ExportResponseDTO, DeleteResponseDTO } from '../../../input/adapter/dto/NominaxcolablistDto';
import { NominaxcolablistApiMapper } from '../mapper/NominaxcolablistApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/nomina-colaborador/historico';

/**
 * API Gateway Adapter: nominaxColabList.zul
 * Implementa el Gateway Port usando httpClient (axios).
 */
export class NominaxcolablistGatewayAdapter implements NominaxcolablistGatewayPort {

  async listarNominaHistorico(params: NominaxcolablistFilterParams): Promise<NominaxcolablistListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return NominaxcolablistApiMapper.toListResponse(data);
  }

  async obtenerNominaHistorico(ejecucionId: number, colaboradorId: number): Promise<NominaxcolablistResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${ejecucionId}/${colaboradorId}`);
    return NominaxcolablistApiMapper.toResponse(data);
  }

  async listarRubrosHistoricos(ejecucionId: number, colaboradorId: number): Promise<RubroHistoricoDTO[]> {
    const { data } = await httpClient.get(`${BASE_PATH}/${ejecucionId}/${colaboradorId}/rubros`);
    return NominaxcolablistApiMapper.toRubroHistoricoList(data);
  }

  async exportarNominaHistorico(params: CreateNominaxcolablistRequest): Promise<ExportResponseDTO> {
    const payload = NominaxcolablistApiMapper.toExportPayload(params);
    const { data } = await httpClient.post(`${BASE_PATH}/exportar`, payload);
    return data;
  }

  async eliminarNominaHistorico(ejecucionId: number, colaboradorId: number): Promise<DeleteResponseDTO> {
    const { data } = await httpClient.delete(`${BASE_PATH}/${ejecucionId}/${colaboradorId}`);
    return data;
  }
}
