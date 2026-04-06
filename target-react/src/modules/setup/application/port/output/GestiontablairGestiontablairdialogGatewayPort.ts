import { GestiontablairGestiontablairdialogResponse, GestiontablairGestiontablairdialogListResponse, CreateGestiontablairGestiontablairdialogRequest, UpdateGestiontablairGestiontablairdialogRequest, GestiontablairGestiontablairdialogFilterParams } from '../../infrastructure/input/adapter/dto/GestiontablairGestiontablairdialogDto';

/**
 * Gateway Port (Output Port): gestionTablaIR.zul / gestionTablaIRDialog.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
 */
export interface GestiontablairGestiontablairdialogGatewayPort {
  findById(id: number): Promise<GestiontablairGestiontablairdialogResponse>;
  findAll(params?: GestiontablairGestiontablairdialogFilterParams): Promise<GestiontablairGestiontablairdialogListResponse>;
  create(request: CreateGestiontablairGestiontablairdialogRequest): Promise<GestiontablairGestiontablairdialogResponse>;
  update(id: number, request: UpdateGestiontablairGestiontablairdialogRequest): Promise<GestiontablairGestiontablairdialogResponse>;
  remove(id: number): Promise<void>;
}
