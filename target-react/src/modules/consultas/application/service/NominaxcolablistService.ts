import { NominaxcolablistGatewayPort } from '../port/output/NominaxcolablistGatewayPort';
import { NominaxcolablistResponse, NominaxcolablistListResponse, CreateNominaxcolablistRequest, NominaxcolablistFilterParams, RubroHistoricoDTO, ExportResponseDTO, DeleteResponseDTO } from '../../infrastructure/input/adapter/dto/NominaxcolablistDto';

/**
 * Application Service: nominaxColabList.zul
 * Implementa lógica de aplicación invocando el Gateway Port.
 */
export class NominaxcolablistService {
  constructor(private readonly gateway: NominaxcolablistGatewayPort) {}

  async listarNominaHistorico(params: NominaxcolablistFilterParams): Promise<NominaxcolablistListResponse> {
    if (!params.ejecucionId) throw new Error('ejecucionId requerido');
    return this.gateway.listarNominaHistorico(params);
  }

  async obtenerNominaHistorico(ejecucionId: number, colaboradorId: number): Promise<NominaxcolablistResponse> {
    if (!ejecucionId || !colaboradorId) throw new Error('IDs requeridos');
    return this.gateway.obtenerNominaHistorico(ejecucionId, colaboradorId);
  }

  async listarRubrosHistoricos(ejecucionId: number, colaboradorId: number): Promise<RubroHistoricoDTO[]> {
    if (!ejecucionId || !colaboradorId) throw new Error('IDs requeridos');
    return this.gateway.listarRubrosHistoricos(ejecucionId, colaboradorId);
  }

  async exportarNominaHistorico(params: CreateNominaxcolablistRequest): Promise<ExportResponseDTO> {
    if (!params.ejecucionId) throw new Error('ejecucionId requerido');
    return this.gateway.exportarNominaHistorico(params);
  }

  async eliminarNominaHistorico(ejecucionId: number, colaboradorId: number): Promise<DeleteResponseDTO> {
    if (!ejecucionId || !colaboradorId) throw new Error('IDs requeridos');
    return this.gateway.eliminarNominaHistorico(ejecucionId, colaboradorId);
  }
}

