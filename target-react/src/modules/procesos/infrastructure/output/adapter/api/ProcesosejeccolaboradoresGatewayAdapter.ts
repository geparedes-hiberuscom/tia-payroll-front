import { ProcesosejeccolaboradoresGatewayPort } from '../../../../application/port/output/ProcesosejeccolaboradoresGatewayPort';
import {
  CreateProcesosejeccolaboradoresRequest,
  EjecutarColaboradorRequest,
  EjecucionResultadoResponse,
  ProcesosejeccolaboradoresFilterParams,
  ProcesosejeccolaboradoresListResponse,
  ProcesosejeccolaboradoresResponse,
  RubroPreliquidadoListResponse,
  UpdateProcesosejeccolaboradoresRequest,
} from '../../../input/adapter/dto/ProcesosejeccolaboradoresDto';
import { ProcesosejeccolaboradoresApiMapper } from '../mapper/ProcesosejeccolaboradoresApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/procesos-ejecucion';

export class ProcesosejeccolaboradoresGatewayAdapter implements ProcesosejeccolaboradoresGatewayPort {
  async findById(id: string): Promise<ProcesosejeccolaboradoresResponse> {
    const [ejecucionId, colaboradorId] = id.split('/');
    if (!ejecucionId || !colaboradorId) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    const { data } = await httpClient.get(BASE_PATH + '/' + ejecucionId + '/colaboradores/' + colaboradorId);
    return ProcesosejeccolaboradoresApiMapper.toResponse(data);
  }

  async findAll(params: ProcesosejeccolaboradoresFilterParams): Promise<ProcesosejeccolaboradoresListResponse> {
    const scoped = params as ProcesosejeccolaboradoresFilterParams & { ejecucionId?: number };
    if (scoped.ejecucionId === undefined) throw new Error('ejecucionId es requerido');
    const { ejecucionId, ...query } = scoped;
    const { data } = await httpClient.get(BASE_PATH + '/' + ejecucionId + '/colaboradores', { params: query });
    return ProcesosejeccolaboradoresApiMapper.toListResponse(data);
  }

  async create(request: CreateProcesosejeccolaboradoresRequest): Promise<ProcesosejeccolaboradoresResponse> {
    const { ejecucionId } = request;
    const { data } = await httpClient.post(BASE_PATH + '/' + ejecucionId + '/ejecutar-colaborador', ProcesosejeccolaboradoresApiMapper.toCreatePayload(request));
    return ProcesosejeccolaboradoresApiMapper.toResponse(data);
  }

  async update(_: string, __: UpdateProcesosejeccolaboradoresRequest): Promise<ProcesosejeccolaboradoresResponse> {
    throw new Error('No existe endpoint PUT para colaboradores en ejecucion');
  }

  async remove(id: string): Promise<void> {
    const [ejecucionId, colaboradorId] = id.split('/');
    if (!ejecucionId || !colaboradorId) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId');
    await httpClient.delete(BASE_PATH + '/' + ejecucionId + '/colaboradores/' + colaboradorId);
  }

  async listRubros(ejecucionId: string, colaboradorId: string): Promise<RubroPreliquidadoListResponse> {
    if (!ejecucionId.trim() || !colaboradorId.trim()) throw new Error('ejecucionId y colaboradorId son requeridos');
    const { data } = await httpClient.get(BASE_PATH + '/' + ejecucionId + '/colaboradores/' + colaboradorId + '/rubros');
    return ProcesosejeccolaboradoresApiMapper.toRubroPreliquidadoListResponse(data);
  }

  async ejecutarColaborador(ejecucionId: string, request: EjecutarColaboradorRequest): Promise<EjecucionResultadoResponse> {
    if (!ejecucionId.trim()) throw new Error('ejecucionId es requerido');
    const payload: CreateProcesosejeccolaboradoresRequest = {
      ejecucionId: Number(ejecucionId),
      colaboradorId: request.colaboradorId,
      empresaId: request.empresaId,
    };
    const { data } = await httpClient.post(BASE_PATH + '/' + ejecucionId + '/ejecutar-colaborador', ProcesosejeccolaboradoresApiMapper.toCreatePayload(payload));
    return ProcesosejeccolaboradoresApiMapper.toExecutionResult(data);
  }
}
