import { ContratoplantillaContratoplantilladialogResponse, ContratoplantillaContratoplantilladialogListResponse, CreateContratoplantillaContratoplantilladialogRequest, UpdateContratoplantillaContratoplantilladialogRequest, ContratoplantillaContratoplantilladialogFilterParams } from '../../infrastructure/input/adapter/dto/ContratoplantillaContratoplantilladialogDto';

/**
 * Gateway Port (Output Port): contratoPlantilla.zul / contratoPlantillaDialog.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
 */
export interface ContratoplantillaContratoplantilladialogGatewayPort {
  findById(id: string): Promise<ContratoplantillaContratoplantilladialogResponse>;
  findAll(params?: ContratoplantillaContratoplantilladialogFilterParams): Promise<ContratoplantillaContratoplantilladialogListResponse>;
  create(request: CreateContratoplantillaContratoplantilladialogRequest): Promise<ContratoplantillaContratoplantilladialogResponse>;
  update(id: string, request: UpdateContratoplantillaContratoplantilladialogRequest): Promise<ContratoplantillaContratoplantilladialogResponse>;
  remove(id: string): Promise<void>;
}
