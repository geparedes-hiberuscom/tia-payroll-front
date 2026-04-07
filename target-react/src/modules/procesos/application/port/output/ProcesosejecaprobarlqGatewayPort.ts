import {
  CreateProcesosejecaprobarlqRequest,
  ProcesoResultadoResponse,
  ProcesosejecaprobarlqFilterParams,
  ProcesosejecaprobarlqListResponse,
  ProcesosejecaprobarlqResponse,
  RechazarLiquidacionRequest,
  UpdateProcesosejecaprobarlqRequest,
} from '../../../infrastructure/input/adapter/dto/ProcesosejecaprobarlqDto';

export interface ProcesosejecaprobarlqGatewayPort {
  findById(id: string): Promise<ProcesosejecaprobarlqResponse>;
  findAll(params?: ProcesosejecaprobarlqFilterParams): Promise<ProcesosejecaprobarlqListResponse>;
  create(request: CreateProcesosejecaprobarlqRequest): Promise<ProcesoResultadoResponse>;
  update(id: string, request: UpdateProcesosejecaprobarlqRequest): Promise<ProcesosejecaprobarlqResponse>;
  remove(id: string): Promise<void>;
  rechazar(request: RechazarLiquidacionRequest): Promise<ProcesoResultadoResponse>;
}
