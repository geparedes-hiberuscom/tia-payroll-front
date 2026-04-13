import { LogderegistrosdeprocesosubrecursoGatewayPort } from '../../../../application/port/output/LogderegistrosdeprocesosubrecursoGatewayPort';
import {
  CreateLogderegistrosdeprocesosubrecursoRequest,
  LogderegistrosdeprocesosubrecursoFilterParams,
  LogderegistrosdeprocesosubrecursoListResponse,
  LogderegistrosdeprocesosubrecursoResponse,
  UpdateLogderegistrosdeprocesosubrecursoRequest,
} from '../../../input/adapter/dto/LogderegistrosdeprocesosubrecursoDto';
import { LogderegistrosdeprocesosubrecursoApiMapper } from '../mapper/LogderegistrosdeprocesosubrecursoApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/procesos-ejecucion';

export class LogderegistrosdeprocesosubrecursoGatewayAdapter implements LogderegistrosdeprocesosubrecursoGatewayPort {
  async findById(id: string): Promise<LogderegistrosdeprocesosubrecursoResponse> {
    const [ejecucionId, logId] = id.split('/');
    if (!ejecucionId || !logId) throw new Error('id compuesto invalido: se esperaba ejecucionId/logId');
    const { data } = await httpClient.get(BASE_PATH + '/' + ejecucionId + '/log/' + logId);
    return LogderegistrosdeprocesosubrecursoApiMapper.toResponse(data);
  }

  async findAll(params: LogderegistrosdeprocesosubrecursoFilterParams): Promise<LogderegistrosdeprocesosubrecursoListResponse> {
    const { ejecucionId, ...query } = params;
    if (ejecucionId === undefined) throw new Error('ejecucionId es requerido');
    const { data } = await httpClient.get(BASE_PATH + '/' + ejecucionId + '/log', { params: query });
    return LogderegistrosdeprocesosubrecursoApiMapper.toListResponse(data);
  }

  async create(_: CreateLogderegistrosdeprocesosubrecursoRequest): Promise<LogderegistrosdeprocesosubrecursoResponse> {
    throw new Error('No existe endpoint POST para log de proceso');
  }

  async update(_: string, __: UpdateLogderegistrosdeprocesosubrecursoRequest): Promise<LogderegistrosdeprocesosubrecursoResponse> {
    throw new Error('No existe endpoint PUT para log de proceso');
  }

  async remove(id: string): Promise<void> {
    const [ejecucionId] = id.split('/');
    if (!ejecucionId) throw new Error('ejecucionId es requerido');
    await this.clear(ejecucionId);
  }

  async clear(ejecucionId: string): Promise<void> {
    await httpClient.delete(BASE_PATH + '/' + ejecucionId + '/log');
  }
}
