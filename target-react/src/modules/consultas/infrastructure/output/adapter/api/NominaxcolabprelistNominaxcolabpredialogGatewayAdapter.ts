import { NominaxcolabprelistNominaxcolabpredialogGatewayPort } from '../../../../application/port/output/NominaxcolabprelistNominaxcolabpredialogGatewayPort';
import { NominaxcolabprelistNominaxcolabpredialogResponse, NominaxcolabprelistNominaxcolabpredialogListResponse, CreateNominaxcolabprelistNominaxcolabpredialogRequest, NominaxcolabprelistNominaxcolabpredialogFilterParams, RubroPreLiquidadoDTO, ExportResponseDTO, DeleteResponseDTO, DetallePreColabResponseDTO } from '../../../input/adapter/dto/NominaxcolabprelistNominaxcolabpredialogDto';
import { NominaxcolabprelistNominaxcolabpredialogApiMapper } from '../mapper/NominaxcolabprelistNominaxcolabpredialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/nomina-colaborador/preliquidacion';

export class NominaxcolabprelistNominaxcolabpredialogGatewayAdapter implements NominaxcolabprelistNominaxcolabpredialogGatewayPort {

  async listarNominaPreLiquidada(params: NominaxcolabprelistNominaxcolabpredialogFilterParams): Promise<NominaxcolabprelistNominaxcolabpredialogListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return NominaxcolabprelistNominaxcolabpredialogApiMapper.toListResponse(data);
  }

  async obtenerNominaPreLiquidada(ejecucionId: number, colaboradorId: number): Promise<NominaxcolabprelistNominaxcolabpredialogResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${ejecucionId}/${colaboradorId}`);
    return NominaxcolabprelistNominaxcolabpredialogApiMapper.toResponse(data);
  }

  async listarRubrosPreLiquidados(ejecucionId: number, colaboradorId: number): Promise<RubroPreLiquidadoDTO[]> {
    const { data } = await httpClient.get(`${BASE_PATH}/${ejecucionId}/${colaboradorId}/rubros`);
    return NominaxcolabprelistNominaxcolabpredialogApiMapper.toRubroPreLiquidadoList(data);
  }

  async obtenerDetallePreColaborador(ejecucionId: number, colaboradorId: number): Promise<DetallePreColabResponseDTO> {
    const { data } = await httpClient.get(`${BASE_PATH}/${ejecucionId}/${colaboradorId}/detalle`);
    return NominaxcolabprelistNominaxcolabpredialogApiMapper.toDetallePreColabResponse(data);
  }

  async exportarNominaPreLiquidada(params: CreateNominaxcolabprelistNominaxcolabpredialogRequest): Promise<ExportResponseDTO> {
    const payload = NominaxcolabprelistNominaxcolabpredialogApiMapper.toExportPayload(params);
    const { data } = await httpClient.post(`${BASE_PATH}/exportar`, payload);
    return data;
  }

  async eliminarNominaPreLiquidada(ejecucionId: number, colaboradorId: number): Promise<DeleteResponseDTO> {
    const { data } = await httpClient.delete(`${BASE_PATH}/${ejecucionId}/${colaboradorId}`);
    return data;
  }
}
