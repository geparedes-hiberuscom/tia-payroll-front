import { ReporteirinecdialogGatewayPort } from '../port/output/ReporteirinecdialogGatewayPort';
import { ReporteirinecdialogResponse, ReporteirinecdialogListResponse, GenerarReporteirinecdialogRequest, ProcesoReporteirinecdialogResponse, UpdateReporteirinecdialogRequest, ReporteirinecdialogFilterParams } from '../../infrastructure/input/adapter/dto/ReporteirinecdialogDto';

export class ReporteirinecdialogService {
  constructor(private readonly gateway: ReporteirinecdialogGatewayPort) {}

  async findById(id: number): Promise<ReporteirinecdialogResponse> {
    return this.gateway.findById(id);
  }

  async findAll(params?: ReporteirinecdialogFilterParams): Promise<ReporteirinecdialogListResponse> {
    return this.gateway.findAll(params);
  }

  async generar(request: GenerarReporteirinecdialogRequest): Promise<ProcesoReporteirinecdialogResponse> {
    return this.gateway.generar(request);
  }

  async update(id: number, request: UpdateReporteirinecdialogRequest): Promise<ReporteirinecdialogResponse> {
    return this.gateway.update(id, request);
  }

  async remove(id: number): Promise<void> {
    return this.gateway.remove(id);
  }
}
