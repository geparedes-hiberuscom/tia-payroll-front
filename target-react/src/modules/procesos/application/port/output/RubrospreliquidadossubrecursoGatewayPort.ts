import {
  CreateRubrospreliquidadossubrecursoRequest,
  RubrospreliquidadossubrecursoFilterParams,
  RubrospreliquidadossubrecursoListResponse,
  RubrospreliquidadossubrecursoResponse,
  UpdateRubrospreliquidadossubrecursoRequest,
} from '../../../infrastructure/input/adapter/dto/RubrospreliquidadossubrecursoDto';

export interface RubrospreliquidadossubrecursoGatewayPort {
  findById(id: string): Promise<RubrospreliquidadossubrecursoResponse>;
  findAll(params?: RubrospreliquidadossubrecursoFilterParams): Promise<RubrospreliquidadossubrecursoListResponse>;
  create(request: CreateRubrospreliquidadossubrecursoRequest): Promise<RubrospreliquidadossubrecursoResponse>;
  update(id: string, request: UpdateRubrospreliquidadossubrecursoRequest): Promise<RubrospreliquidadossubrecursoResponse>;
  remove(id: string): Promise<void>;
}
