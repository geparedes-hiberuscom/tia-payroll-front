import { useState, useCallback } from 'react';
import { NominaxcolabprelistNominaxcolabpredialogService } from '../../../../application/service/NominaxcolabprelistNominaxcolabpredialogService';
import { NominaxcolabprelistNominaxcolabpredialogGatewayAdapter } from '../../../output/adapter/api/NominaxcolabprelistNominaxcolabpredialogGatewayAdapter';
import { NominaxcolabprelistNominaxcolabpredialogResponse, NominaxcolabprelistNominaxcolabpredialogFilterParams, RubroPreLiquidadoDTO, ExportResponseDTO, DeleteResponseDTO, DetallePreColabResponseDTO } from '../dto/NominaxcolabprelistNominaxcolabpredialogDto';

const gatewayAdapter = new NominaxcolabprelistNominaxcolabpredialogGatewayAdapter();
const service = new NominaxcolabprelistNominaxcolabpredialogService(gatewayAdapter);

export function useNominaxcolabprelistNominaxcolabpredialog() {
  const [items, setItems] = useState<NominaxcolabprelistNominaxcolabpredialogResponse[]>([]);
  const [rubros, setRubros] = useState<RubroPreLiquidadoDTO[]>([]);
  const [detalleColab, setDetalleColab] = useState<DetallePreColabResponseDTO | null>(null);
  const [selectedItem, setSelectedItem] = useState<NominaxcolabprelistNominaxcolabpredialogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const listarNominaPreLiquidada = useCallback(async (params: NominaxcolabprelistNominaxcolabpredialogFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.listarNominaPreLiquidada(params);
      setItems(response.data);
      setTotalElements(response.totalElements);
      setPage(response.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar');
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerNominaPreLiquidada = useCallback(async (ejecucionId: number, colaboradorId: number) => {
    try {
      setLoading(true);
      setError(null);
      const item = await service.obtenerNominaPreLiquidada(ejecucionId, colaboradorId);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const listarRubrosPreLiquidados = useCallback(async (ejecucionId: number, colaboradorId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.listarRubrosPreLiquidados(ejecucionId, colaboradorId);
      setRubros(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar rubros');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerDetallePreColaborador = useCallback(async (ejecucionId: number, colaboradorId: number) => {
    try {
      setLoading(true);
      setError(null);
      const detalle = await service.obtenerDetallePreColaborador(ejecucionId, colaboradorId);
      setDetalleColab(detalle);
      return detalle;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const exportarNominaPreLiquidada = useCallback(async (ejecucionId: number, empresaId?: number, formato?: string): Promise<ExportResponseDTO | null> => {
    try {
      setLoading(true);
      setError(null);
      return await service.exportarNominaPreLiquidada({ ejecucionId, empresaId, formato });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al exportar');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const eliminarNominaPreLiquidada = useCallback(async (ejecucionId: number, colaboradorId: number): Promise<DeleteResponseDTO | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.eliminarNominaPreLiquidada(ejecucionId, colaboradorId);
      setItems(prev => prev.filter(it => !(it.ejecucionId === ejecucionId && it.colaboradorId === colaboradorId)));
      if (selectedItem?.ejecucionId === ejecucionId && selectedItem?.colaboradorId === colaboradorId) setSelectedItem(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
      return null;
    } finally {
      setLoading(false);
    }
  }, [selectedItem]);

  return {
    items, rubros, detalleColab, selectedItem, loading, error, totalElements, page,
    listarNominaPreLiquidada, obtenerNominaPreLiquidada, listarRubrosPreLiquidados,
    obtenerDetallePreColaborador, exportarNominaPreLiquidada, eliminarNominaPreLiquidada,
    setSelectedItem, setPage,
  };
}
