import {
  CierreResultadoResponse,
  CreateEjecucionproccierreRequest,
  EjecucionproccierreFilterParams,
  EjecucionproccierreListResponse,
  EjecucionproccierreResponse,
  ProcesoResultadoResponse,
  UpdateEjecucionproccierreRequest,
} from '../../../infrastructure/input/adapter/dto/EjecucionproccierreDto';

export interface EjecucionproccierreGatewayPort {
  findById(id: string): Promise<EjecucionproccierreResponse>;
  findAll(params?: EjecucionproccierreFilterParams): Promise<EjecucionproccierreListResponse>;
  create(request: CreateEjecucionproccierreRequest): Promise<EjecucionproccierreResponse>;
  update(id: string, request: UpdateEjecucionproccierreRequest): Promise<EjecucionproccierreResponse>;
  remove(id: string): Promise<void>;
  cerrar(id: string, request: CreateEjecucionproccierreRequest): Promise<CierreResultadoResponse>;
  reabrir(id: string, request: UpdateEjecucionproccierreRequest): Promise<ProcesoResultadoResponse>;
}
