import { GestiontablairGestiontablairdialogResponse, GestiontablairGestiontablairdialogListResponse, CreateGestiontablairGestiontablairdialogRequest, UpdateGestiontablairGestiontablairdialogRequest, GestiontablairGestiontablairdialogFilterParams } from '../../infrastructure/input/adapter/dto/GestiontablairGestiontablairdialogDto';

/**
 * Gateway Port (Output Port): gestionTablaIR.zul / gestionTablaIRDialog.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
 */
export interface GestiontablairGestiontablairdialogGatewayPort {
  findById(id: string): Promise<GestiontablairGestiontablairdialogResponse>;
  findAll(params?: GestiontablairGestiontablairdialogFilterParams): Promise<GestiontablairGestiontablairdialogListResponse>;
  create(request: CreateGestiontablairGestiontablairdialogRequest): Promise<GestiontablairGestiontablairdialogResponse>;
  update(id: string, request: UpdateGestiontablairGestiontablairdialogRequest): Promise<GestiontablairGestiontablairdialogResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
