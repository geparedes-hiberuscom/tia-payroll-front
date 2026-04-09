import { httpClient } from "@shared/infrastructure/output/adapter/api/httpClient";
import { ClasesrubroGatewayPort } from "../../../../application/port/output/ClasesrubroGatewayPort";
import {
  ClasesrubroFilterParams,
  ClasesrubroListResponse,
  ClasesrubroResponse,
} from "../../../input/adapter/dto/ClasesrubroDto";
import { ClasesrubroApiMapper } from "../mapper/ClasesrubroApiMapper";

const BASE_PATH = "/api/v1/clases-rubros";

/**
 * API Gateway Adapter: clases-rubro
 * Implementa el output port para listar y consultar clases de rubros.
 */
export class ClasesrubroGatewayAdapter implements ClasesrubroGatewayPort {
  async findAll(params?: ClasesrubroFilterParams): Promise<ClasesrubroListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return ClasesrubroApiMapper.toListResponse(data);
  }

  async findById(claseId: string): Promise<ClasesrubroResponse> {
    const { data } = await httpClient.get(`${BASE_PATH}/${claseId}`);
    return ClasesrubroApiMapper.toResponse(data);
  }
}
