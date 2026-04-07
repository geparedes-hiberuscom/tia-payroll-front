import {
  CreateInstanciasprocesosInstanciasprocesosdialogRequest,
  InstanciasprocesosInstanciasprocesosdialogFilterParams,
  InstanciasprocesosInstanciasprocesosdialogListResponse,
  InstanciasprocesosInstanciasprocesosdialogResponse,
  UpdateInstanciasprocesosInstanciasprocesosdialogRequest,
} from '../../../infrastructure/input/adapter/dto/InstanciasprocesosInstanciasprocesosdialogDto';

export interface InstanciasprocesosInstanciasprocesosdialogGatewayPort {
  findById(id: string): Promise<InstanciasprocesosInstanciasprocesosdialogResponse>;
  findAll(params?: InstanciasprocesosInstanciasprocesosdialogFilterParams): Promise<InstanciasprocesosInstanciasprocesosdialogListResponse>;
  create(request: CreateInstanciasprocesosInstanciasprocesosdialogRequest): Promise<InstanciasprocesosInstanciasprocesosdialogResponse>;
  update(id: string, request: UpdateInstanciasprocesosInstanciasprocesosdialogRequest): Promise<InstanciasprocesosInstanciasprocesosdialogResponse>;
  remove(id: string): Promise<void>;
}
