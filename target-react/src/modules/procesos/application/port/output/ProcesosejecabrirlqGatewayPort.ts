import {
  CreateProcesosejecabrirlqRequest,
  ProcesoResultadoResponse,
  ProcesosejecabrirlqFilterParams,
  ProcesosejecabrirlqListResponse,
  ProcesosejecabrirlqResponse,
  UpdateProcesosejecabrirlqRequest,
} from '../../../infrastructure/input/adapter/dto/ProcesosejecabrirlqDto';

export interface ProcesosejecabrirlqGatewayPort {
  findById(id: string): Promise<ProcesosejecabrirlqResponse>;
  findAll(params?: ProcesosejecabrirlqFilterParams): Promise<ProcesosejecabrirlqListResponse>;
  create(request: CreateProcesosejecabrirlqRequest): Promise<ProcesoResultadoResponse>;
  update(id: string, request: UpdateProcesosejecabrirlqRequest): Promise<ProcesosejecabrirlqResponse>;
  remove(id: string): Promise<void>;
}
