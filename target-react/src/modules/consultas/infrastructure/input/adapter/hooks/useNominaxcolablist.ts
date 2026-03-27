import { useState, useCallback } from 'react';
import { NominaxcolablistService } from '../../../../application/service/NominaxcolablistService';
import { NominaxcolablistGatewayAdapter } from '../../../output/adapter/api/NominaxcolablistGatewayAdapter';
import { NominaxcolablistResponse, NominaxcolablistFilterParams, RubroHistoricoDTO, ExportResponseDTO, DeleteResponseDTO } from '../dto/NominaxcolablistDto';

// ─── Inyección: Gateway Adapter → Service ───
const gatewayAdapter = new NominaxcolablistGatewayAdapter();
const nominaxcolablistService = new NominaxcolablistService(gatewayAdapter);

/**
 * Custom Hook: useNominaxcolablist
 * Maneja nómina histórica de colaboradores con estado reactivo.
 */
export function useNominaxcolablist() {
  const [items, setItems] = useState<NominaxcolablistResponse[]>([]);
  const [rubros, setRubros] = useState<RubroHistoricoDTO[]>([]);
  const [selectedItem, setSelectedItem] = useState<NominaxcolablistResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const listarNominaHistorico = useCallback(async (params: NominaxcolablistFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await nominaxcolablistService.listarNominaHistorico(params);
      setItems(response.data);
      setTotalElements(response.totalElements);
      setPage(response.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar');
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerNominaHistorico = useCallback(async (ejecucionId: number, colaboradorId: number) => {
    try {
      setLoading(true);
      setError(null);
      const item = await nominaxcolablistService.obtenerNominaHistorico(ejecucionId, colaboradorId);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const listarRubrosHistoricos = useCallback(async (ejecucionId: number, colaboradorId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await nominaxcolablistService.listarRubrosHistoricos(ejecucionId, colaboradorId);
      setRubros(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar rubros');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const exportarNominaHistorico = useCallback(async (ejecucionId: number, empresaId?: number, formato?: string): Promise<ExportResponseDTO | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await nominaxcolablistService.exportarNominaHistorico({ ejecucionId, empresaId, formato });
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al exportar');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const eliminarNominaHistorico = useCallback(async (ejecucionId: number, colaboradorId: number): Promise<DeleteResponseDTO | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await nominaxcolablistService.eliminarNominaHistorico(ejecucionId, colaboradorId);
      setItems(prev => prev.filter(it => !(it.ejecucionId === ejecucionId && it.colaboradorId === colaboradorId)));
      if (selectedItem?.ejecucionId === ejecucionId && selectedItem?.colaboradorId === colaboradorId) {
        setSelectedItem(null);
      }
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
      return null;
    } finally {
      setLoading(false);
    }
  }, [selectedItem]);

  return {
    items,
    rubros,
    selectedItem,
    loading,
    error,
    totalElements,
    page,
    listarNominaHistorico,
    obtenerNominaHistorico,
    listarRubrosHistoricos,
    exportarNominaHistorico,
    eliminarNominaHistorico,
    setSelectedItem,
  };
}

    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await nominaxcolablistService.remove(id);
      setItems(prev => prev.filter(item => item.id !== id));
      if (selectedItem?.id === id) { setSelectedItem(null); }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedItem]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    items,
    selectedItem,
    loading,
    error,
    totalElements,
    page,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    clearError: () => setError(null),
  };
}
