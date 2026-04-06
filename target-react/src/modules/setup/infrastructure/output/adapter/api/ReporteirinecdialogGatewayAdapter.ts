import { ReporteirinecdialogGatewayPort } from '../../../../application/port/output/ReporteirinecdialogGatewayPort';
import { ReporteirinecdialogResponse, ReporteirinecdialogListResponse, CreateReporteirinecdialogRequest, UpdateReporteirinecdialogRequest, ReporteirinecdialogFilterParams } from '../../../input/adapter/dto/ReporteirinecdialogDto';
import { ReporteirinecdialogApiMapper } from '../mapper/ReporteirinecdialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/reportes-ir-inec';

/**
 * API Gateway Adapter: ReporteIRINECDialog.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 */
export class ReporteirinecdialogGatewayAdapter implements ReporteirinecdialogGatewayPort {

  async findById(id: string): Promise<ReporteirinecdialogResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return ReporteirinecdialogApiMapper.toResponse(data);
  }

  async findAll(params?: ReporteirinecdialogFilterParams): Promise<ReporteirinecdialogListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return ReporteirinecdialogApiMapper.toListResponse(data);
  }

  async create(request: CreateReporteirinecdialogRequest): Promise<ReporteirinecdialogResponse> {
    const payload = ReporteirinecdialogApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return ReporteirinecdialogApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdateReporteirinecdialogRequest): Promise<ReporteirinecdialogResponse> {
    const payload = ReporteirinecdialogApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return ReporteirinecdialogApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }

  // TODO: Implementar métodos adicionales según los endpoints de la API
}
