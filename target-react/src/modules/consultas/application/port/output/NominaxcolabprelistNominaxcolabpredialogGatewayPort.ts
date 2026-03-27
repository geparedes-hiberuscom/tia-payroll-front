import { NominaxcolabprelistNominaxcolabpredialogResponse, NominaxcolabprelistNominaxcolabpredialogListResponse, CreateNominaxcolabprelistNominaxcolabpredialogRequest, UpdateNominaxcolabprelistNominaxcolabpredialogRequest, NominaxcolabprelistNominaxcolabpredialogFilterParams } from '../../infrastructure/input/adapter/dto/NominaxcolabprelistNominaxcolabpredialogDto';

/**
 * Gateway Port (Output Port): nominaxColabPreList.zul / nominaxColabPreDialog.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
 */
export interface NominaxcolabprelistNominaxcolabpredialogGatewayPort {
  findById(id: string): Promise<NominaxcolabprelistNominaxcolabpredialogResponse>;
  findAll(params?: NominaxcolabprelistNominaxcolabpredialogFilterParams): Promise<NominaxcolabprelistNominaxcolabpredialogListResponse>;
  create(request: CreateNominaxcolabprelistNominaxcolabpredialogRequest): Promise<NominaxcolabprelistNominaxcolabpredialogResponse>;
  update(id: string, request: UpdateNominaxcolabprelistNominaxcolabpredialogRequest): Promise<NominaxcolabprelistNominaxcolabpredialogResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
