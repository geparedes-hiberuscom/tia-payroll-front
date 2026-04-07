import {
  CreateProcesosejeccolaboradoresRequest,
  EjecutarColaboradorRequest,
  EjecucionResultadoResponse,
  ProcesosejeccolaboradoresFilterParams,
  ProcesosejeccolaboradoresListResponse,
  ProcesosejeccolaboradoresResponse,
  RubroPreliquidadoListResponse,
  UpdateProcesosejeccolaboradoresRequest,
} from '../../../infrastructure/input/adapter/dto/ProcesosejeccolaboradoresDto';

export interface ProcesosejeccolaboradoresGatewayPort {
  findById(id: string): Promise<ProcesosejeccolaboradoresResponse>;
  findAll(params: ProcesosejeccolaboradoresFilterParams): Promise<ProcesosejeccolaboradoresListResponse>;
  create(request: CreateProcesosejeccolaboradoresRequest): Promise<ProcesosejeccolaboradoresResponse>;
  update(id: string, request: UpdateProcesosejeccolaboradoresRequest): Promise<ProcesosejeccolaboradoresResponse>;
  remove(id: string): Promise<void>;
  listRubros(ejecucionId: string, colaboradorId: string): Promise<RubroPreliquidadoListResponse>;
  ejecutarColaborador(ejecucionId: string, request: EjecutarColaboradorRequest): Promise<EjecucionResultadoResponse>;
}
