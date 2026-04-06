/**
 * Gateway Port para Tabla IR (Impuesto a la Renta)
 * Define el contrato de comunicación con el backend
 */

import {
  CreateTablaIRRequest,
  UpdateTablaIRRequest,
  TablaIRResponse,
  TablaIRFilterParams,
  TablaIRPageResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/TablaIRDto';

export interface TablaIRGatewayPort {
  findAll(filters?: TablaIRFilterParams): Promise<TablaIRPageResponse>;
  findById(id: number): Promise<TablaIRResponse>;
  create(request: CreateTablaIRRequest): Promise<TablaIRResponse>;
  update(id: number, request: UpdateTablaIRRequest): Promise<TablaIRResponse>;
  remove(id: number): Promise<DeleteResponse>;
}
