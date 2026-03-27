import { NominaxcolabprelistNominaxcolabpredialogGatewayPort } from '../port/output/NominaxcolabprelistNominaxcolabpredialogGatewayPort';
import { NominaxcolabprelistNominaxcolabpredialogResponse, NominaxcolabprelistNominaxcolabpredialogListResponse, CreateNominaxcolabprelistNominaxcolabpredialogRequest, NominaxcolabprelistNominaxcolabpredialogFilterParams, RubroPreLiquidadoDTO, ExportResponseDTO, DeleteResponseDTO, DetallePreColabResponseDTO } from '../../infrastructure/input/adapter/dto/NominaxcolabprelistNominaxcolabpredialogDto';

export class NominaxcolabprelistNominaxcolabpredialogService {
  constructor(private readonly gateway: NominaxcolabprelistNominaxcolabpredialogGatewayPort) {}

  async listarNominaPreLiquidada(params: NominaxcolabprelistNominaxcolabpredialogFilterParams): Promise<NominaxcolabprelistNominaxcolabpredialogListResponse> {
    if (!params.ejecucionId) throw new Error('ejecucionId requerido');
    return this.gateway.listarNominaPreLiquidada(params);
  }

  async obtenerNominaPreLiquidada(ejecucionId: number, colaboradorId: number): Promise<NominaxcolabprelistNominaxcolabpredialogResponse> {
    if (!ejecucionId || !colaboradorId) throw new Error('IDs requeridos');
    return this.gateway.obtenerNominaPreLiquidada(ejecucionId, colaboradorId);
  }

  async listarRubrosPreLiquidados(ejecucionId: number, colaboradorId: number): Promise<RubroPreLiquidadoDTO[]> {
    if (!ejecucionId || !colaboradorId) throw new Error('IDs requeridos');
    return this.gateway.listarRubrosPreLiquidados(ejecucionId, colaboradorId);
  }

  async obtenerDetallePreColaborador(ejecucionId: number, colaboradorId: number): Promise<DetallePreColabResponseDTO> {
    if (!ejecucionId || !colaboradorId) throw new Error('IDs requeridos');
    return this.gateway.obtenerDetallePreColaborador(ejecucionId, colaboradorId);
  }

  async exportarNominaPreLiquidada(params: CreateNominaxcolabprelistNominaxcolabpredialogRequest): Promise<ExportResponseDTO> {
    if (!params.ejecucionId) throw new Error('ejecucionId requerido');
    return this.gateway.exportarNominaPreLiquidada(params);
  }

  async eliminarNominaPreLiquidada(ejecucionId: number, colaboradorId: number): Promise<DeleteResponseDTO> {
    if (!ejecucionId || !colaboradorId) throw new Error('IDs requeridos');
    return this.gateway.eliminarNominaPreLiquidada(ejecucionId, colaboradorId);
  }
}
