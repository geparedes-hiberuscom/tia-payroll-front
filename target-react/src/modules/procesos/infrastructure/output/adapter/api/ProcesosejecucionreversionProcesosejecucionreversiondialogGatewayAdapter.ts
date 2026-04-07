import { ProcesosejecucionreversionProcesosejecucionreversiondialogGatewayPort } from '../../../../application/port/output/ProcesosejecucionreversionProcesosejecucionreversiondialogGatewayPort';
import {
  CreateProcesosejecucionreversionProcesosejecucionreversiondialogRequest,
  ProcesosejecucionreversionProcesosejecucionreversiondialogFilterParams,
  ProcesosejecucionreversionProcesosejecucionreversiondialogListResponse,
  ProcesosejecucionreversionProcesosejecucionreversiondialogResponse,
  ReversionResultadoResponse,
  RevertirProcesoRequest,
  SobreGiroListResponse,
  UpdateProcesosejecucionreversionProcesosejecucionreversiondialogRequest,
} from '../../../input/adapter/dto/ProcesosejecucionreversionProcesosejecucionreversiondialogDto';
import { ProcesosejecucionreversionProcesosejecucionreversiondialogApiMapper } from '../mapper/ProcesosejecucionreversionProcesosejecucionreversiondialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/procesos-reversion';

export class ProcesosejecucionreversionProcesosejecucionreversiondialogGatewayAdapter implements ProcesosejecucionreversionProcesosejecucionreversiondialogGatewayPort {
  async findById(id: string): Promise<ProcesosejecucionreversionProcesosejecucionreversiondialogResponse> {
    const { data } = await httpClient.get(BASE_PATH + '/' + id);
    return ProcesosejecucionreversionProcesosejecucionreversiondialogApiMapper.toResponse(data);
  }

  async findAll(params?: ProcesosejecucionreversionProcesosejecucionreversiondialogFilterParams): Promise<ProcesosejecucionreversionProcesosejecucionreversiondialogListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return ProcesosejecucionreversionProcesosejecucionreversiondialogApiMapper.toListResponse(data);
  }

  async create(_: CreateProcesosejecucionreversionProcesosejecucionreversiondialogRequest): Promise<ProcesosejecucionreversionProcesosejecucionreversiondialogResponse> {
    throw new Error('No existe endpoint POST /api/v1/procesos-reversion');
  }

  async update(_: string, __: UpdateProcesosejecucionreversionProcesosejecucionreversiondialogRequest): Promise<ProcesosejecucionreversionProcesosejecucionreversiondialogResponse> {
    throw new Error('No existe endpoint PUT /api/v1/procesos-reversion/{id}');
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(BASE_PATH + '/' + id);
  }

  async revertir(id: string, request: RevertirProcesoRequest): Promise<ReversionResultadoResponse> {
    const { data } = await httpClient.post(BASE_PATH + '/' + id + '/revertir', ProcesosejecucionreversionProcesosejecucionreversiondialogApiMapper.toCreatePayload(request));
    return ProcesosejecucionreversionProcesosejecucionreversiondialogApiMapper.toReversionResult(data);
  }

  async listSobregiros(id: string, colaboradorId?: number, rubroId?: string): Promise<SobreGiroListResponse> {
    const { data } = await httpClient.get(BASE_PATH + '/' + id + '/sobregiros', { params: { colaboradorId, rubroId } });
    return ProcesosejecucionreversionProcesosejecucionreversiondialogApiMapper.toSobreGiroListResponse(data);
  }
}
