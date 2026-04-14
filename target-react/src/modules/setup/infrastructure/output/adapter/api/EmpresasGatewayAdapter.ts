import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

export interface EmpresaOption {
  id: number;
  nombre: string;
  ruc?: string;
}

const BASE_PATH = '/api/v1/empresas';

/**
 * API Gateway Adapter: Empresas
 * Proporciona opciones de empresa para combos
 */
export class EmpresasGatewayAdapter {
  
  async obtenerEmpresas(): Promise<EmpresaOption[]> {
    try {
      const { data } = await httpClient.get(BASE_PATH);
      // Mapear respuesta del backend a formato simple para combo
      return data.content.map((empresa: any) => ({
        id: empresa.iidempresa,
        nombre: empresa.vempresanl || empresa.vempresanc,
        ruc: empresa.vruc,
      }));
    } catch (error) {
      console.error('Error al cargar empresas:', error);
      return [];
    }
  }
}
