import { NominaxcolablistResponse, NominaxcolablistListResponse, CreateNominaxcolablistRequest, UpdateNominaxcolablistRequest, NominaxcolablistFilterParams, RubroHistoricoDTO, ExportResponseDTO, DeleteResponseDTO } from '../../infrastructure/input/adapter/dto/NominaxcolablistDto';

/**
 * Gateway Port (Output Port): nominaxColabList.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints:
 * - GET /api/v1/nomina-colaborador/historico
 * - GET /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId}
 * - GET /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId}/rubros
 * - POST /api/v1/nomina-colaborador/historico/exportar
 * - DELETE /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId}
 */
export interface NominaxcolablistGatewayPort {
  // GET /api/v1/nomina-colaborador/historico
  listarNominaHistorico(params: NominaxcolablistFilterParams): Promise<NominaxcolablistListResponse>;

  // GET /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId}
  obtenerNominaHistorico(ejecucionId: number, colaboradorId: number): Promise<NominaxcolablistResponse>;

  // GET /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId}/rubros
  listarRubrosHistoricos(ejecucionId: number, colaboradorId: number): Promise<RubroHistoricoDTO[]>;

  // POST /api/v1/nomina-colaborador/historico/exportar
  exportarNominaHistorico(params: CreateNominaxcolablistRequest): Promise<ExportResponseDTO>;

  // DELETE /api/v1/nomina-colaborador/historico/{ejecucionId}/{colaboradorId}
  eliminarNominaHistorico(ejecucionId: number, colaboradorId: number): Promise<DeleteResponseDTO>;
}
