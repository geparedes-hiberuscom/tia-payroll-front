import { ReporteirinecdialogGatewayPort } from '../../../../application/port/output/ReporteirinecdialogGatewayPort';
import { ReporteirinecdialogResponse, ReporteirinecdialogListResponse, GenerarReporteirinecdialogRequest, ProcesoReporteirinecdialogResponse, UpdateReporteirinecdialogRequest, ReporteirinecdialogFilterParams } from '../../../input/adapter/dto/ReporteirinecdialogDto';
import { ReporteirinecdialogApiMapper } from '../mapper/ReporteirinecdialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/reportes-ir-inec';

/**
 * API Gateway Adapter: ReporteIRINECDialog.zul
 */
export class ReporteirinecdialogGatewayAdapter implements ReporteirinecdialogGatewayPort {

  async findById(id: number): Promise<ReporteirinecdialogResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return ReporteirinecdialogApiMapper.toResponse(data);
  }

  async findAll(params?: ReporteirinecdialogFilterParams): Promise<ReporteirinecdialogListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return ReporteirinecdialogApiMapper.toListResponse(data);
  }

  async generar(request: GenerarReporteirinecdialogRequest): Promise<ProcesoReporteirinecdialogResponse> {
    const { data } = await httpClient.post(`${BASE_PATH}/generar`, request);
    return data as ProcesoReporteirinecdialogResponse;
  }

  async update(id: number, request: UpdateReporteirinecdialogRequest): Promise<ReporteirinecdialogResponse> {
    const payload = ReporteirinecdialogApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return ReporteirinecdialogApiMapper.toResponse(data);
  }

  async remove(id: number): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
