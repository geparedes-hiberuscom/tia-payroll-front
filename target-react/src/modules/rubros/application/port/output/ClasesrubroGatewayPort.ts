import {
  ClasesrubroFilterParams,
  ClasesrubroListResponse,
  ClasesrubroResponse,
} from "@modules/rubros/infrastructure/input/adapter/dto/ClasesrubroDto";

/**
 * Gateway Port (Output Port): clases-rubro
 * Endpoints:
 *   GET /api/v1/nomina-colaborador/clases-rubro
 *   GET /api/v1/nomina-colaborador/clases-rubro/{claseId}
 */
export interface ClasesrubroGatewayPort {
  findAll(params?: ClasesrubroFilterParams): Promise<ClasesrubroListResponse>;
  findById(claseId: string): Promise<ClasesrubroResponse>;
}
