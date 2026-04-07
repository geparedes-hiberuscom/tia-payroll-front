import {
  CreateProcesosProcesosdialogRequest,
  ProcesosProcesosdialogFilterParams,
  ProcesosProcesosdialogListResponse,
  ProcesosProcesosdialogResponse,
  UpdateProcesosProcesosdialogRequest,
} from '../../../infrastructure/input/adapter/dto/ProcesosProcesosdialogDto';

export interface ProcesosProcesosdialogGatewayPort {
  findById(id: string): Promise<ProcesosProcesosdialogResponse>;
  findAll(params?: ProcesosProcesosdialogFilterParams): Promise<ProcesosProcesosdialogListResponse>;
  create(request: CreateProcesosProcesosdialogRequest): Promise<ProcesosProcesosdialogResponse>;
  update(id: string, request: UpdateProcesosProcesosdialogRequest): Promise<ProcesosProcesosdialogResponse>;
  remove(id: string): Promise<void>;
}
