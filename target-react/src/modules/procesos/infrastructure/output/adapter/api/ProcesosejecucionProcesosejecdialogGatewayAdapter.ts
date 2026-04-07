import { ProcesosejecucionProcesosejecdialogGatewayPort } from '../../../../application/port/output/ProcesosejecucionProcesosejecdialogGatewayPort';
import { CreateProcesosejecucionProcesosejecdialogRequest, EjecutarCalculoRequest, EjecucionResultadoResponse, ProcesosejecucionProcesosejecdialogFilterParams, ProcesosejecucionProcesosejecdialogListResponse, ProcesosejecucionProcesosejecdialogResponse, UpdateProcesosejecucionProcesosejecdialogRequest } from '../../../input/adapter/dto/ProcesosejecucionProcesosejecdialogDto';
import { ProcesosejecucionProcesosejecdialogApiMapper } from '../mapper/ProcesosejecucionProcesosejecdialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';
const BASE_PATH = '/api/v1/procesos-ejecucion';
export class ProcesosejecucionProcesosejecdialogGatewayAdapter implements ProcesosejecucionProcesosejecdialogGatewayPort {
  async findById(id: string): Promise<ProcesosejecucionProcesosejecdialogResponse> { const { data } = await httpClient.get(BASE_PATH + '/' + id); return ProcesosejecucionProcesosejecdialogApiMapper.toResponse(data); }
  async findAll(params?: ProcesosejecucionProcesosejecdialogFilterParams): Promise<ProcesosejecucionProcesosejecdialogListResponse> { const { data } = await httpClient.get(BASE_PATH, { params }); return ProcesosejecucionProcesosejecdialogApiMapper.toListResponse(data); }
  async create(request: CreateProcesosejecucionProcesosejecdialogRequest): Promise<ProcesosejecucionProcesosejecdialogResponse> { const { data } = await httpClient.post(BASE_PATH, ProcesosejecucionProcesosejecdialogApiMapper.toCreatePayload(request)); return ProcesosejecucionProcesosejecdialogApiMapper.toResponse(data); }
  async update(id: string, request: UpdateProcesosejecucionProcesosejecdialogRequest): Promise<ProcesosejecucionProcesosejecdialogResponse> { const { data } = await httpClient.put(BASE_PATH + '/' + id, ProcesosejecucionProcesosejecdialogApiMapper.toUpdatePayload(request)); return ProcesosejecucionProcesosejecdialogApiMapper.toResponse(data); }
  async remove(id: string): Promise<void> { await httpClient.delete(BASE_PATH + '/' + id); }
  async ejecutar(id: string, request: EjecutarCalculoRequest): Promise<EjecucionResultadoResponse> {
    const payload: CreateProcesosejecucionProcesosejecdialogRequest = {
      procesoId: Number(id) || 0,
      entornoEjecucionId: request.entornoEjecucionId,
    };
    const { data } = await httpClient.post(BASE_PATH + '/' + id + '/ejecutar', ProcesosejecucionProcesosejecdialogApiMapper.toCreatePayload(payload));
    return ProcesosejecucionProcesosejecdialogApiMapper.toExecutionResult(data);
  }
}
