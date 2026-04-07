import {
  CreateLogderegistrosdeprocesosubrecursoRequest,
  LogderegistrosdeprocesosubrecursoFilterParams,
  LogderegistrosdeprocesosubrecursoListResponse,
  LogderegistrosdeprocesosubrecursoResponse,
  UpdateLogderegistrosdeprocesosubrecursoRequest,
} from '../../../infrastructure/input/adapter/dto/LogderegistrosdeprocesosubrecursoDto';

export interface LogderegistrosdeprocesosubrecursoGatewayPort {
  findById(id: string): Promise<LogderegistrosdeprocesosubrecursoResponse>;
  findAll(params: LogderegistrosdeprocesosubrecursoFilterParams): Promise<LogderegistrosdeprocesosubrecursoListResponse>;
  create(request: CreateLogderegistrosdeprocesosubrecursoRequest): Promise<LogderegistrosdeprocesosubrecursoResponse>;
  update(id: string, request: UpdateLogderegistrosdeprocesosubrecursoRequest): Promise<LogderegistrosdeprocesosubrecursoResponse>;
  remove(id: string): Promise<void>;
  clear(ejecucionId: string): Promise<void>;
}
