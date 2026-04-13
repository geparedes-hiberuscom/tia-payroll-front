import { ProcesosProcesosdialogGatewayPort } from '../../../../application/port/output/ProcesosProcesosdialogGatewayPort';
import {
  CreateProcesosProcesosdialogRequest,
  ProcesosProcesosdialogFilterParams,
  ProcesosProcesosdialogListResponse,
  ProcesosProcesosdialogResponse,
  UpdateProcesosProcesosdialogRequest,
} from '../../../input/adapter/dto/ProcesosProcesosdialogDto';
import { ProcesosProcesosdialogApiMapper } from '../mapper/ProcesosProcesosdialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/procesos';

export class ProcesosProcesosdialogGatewayAdapter implements ProcesosProcesosdialogGatewayPort {
  async findById(id: string): Promise<ProcesosProcesosdialogResponse> {
    const { data } = await httpClient.get(BASE_PATH + '/' + id);
    return ProcesosProcesosdialogApiMapper.toResponse(data);
  }

  async findAll(params?: ProcesosProcesosdialogFilterParams): Promise<ProcesosProcesosdialogListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return ProcesosProcesosdialogApiMapper.toListResponse(data);
  }

  async create(request: CreateProcesosProcesosdialogRequest): Promise<ProcesosProcesosdialogResponse> {
    const { data } = await httpClient.post(BASE_PATH, ProcesosProcesosdialogApiMapper.toCreatePayload(request));
    return ProcesosProcesosdialogApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdateProcesosProcesosdialogRequest): Promise<ProcesosProcesosdialogResponse> {
    const { data } = await httpClient.put(BASE_PATH + '/' + id, ProcesosProcesosdialogApiMapper.toUpdatePayload(request));
    return ProcesosProcesosdialogApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(BASE_PATH + '/' + id);
  }
}
