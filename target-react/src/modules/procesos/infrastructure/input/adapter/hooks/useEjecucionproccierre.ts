import { useCallback, useEffect, useRef, useState } from 'react';
import { EjecucionproccierreService } from '../../../../application/service/EjecucionproccierreService';
import { EjecucionproccierreGatewayAdapter } from '../../../output/adapter/api/EjecucionproccierreGatewayAdapter';
import {
  CierreResultadoResponse,
  CreateEjecucionproccierreRequest,
  EjecucionproccierreFilterParams,
  EjecucionproccierreResponse,
  ProcesoResultadoResponse,
  UpdateEjecucionproccierreRequest,
} from '../dto/EjecucionproccierreDto';

const gatewayAdapter = new EjecucionproccierreGatewayAdapter();
const ejecucionproccierreService = new EjecucionproccierreService(gatewayAdapter);

export function useEjecucionproccierre() {
  const [items, setItems] = useState<EjecucionproccierreResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<EjecucionproccierreResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const lastFiltersRef = useRef<EjecucionproccierreFilterParams | undefined>(undefined);

  const fetchAll = useCallback(async (params?: EjecucionproccierreFilterParams) => {
    setLoading(true);
    setError(null);
    try {
      lastFiltersRef.current = params;
      const response = await ejecucionproccierreService.findAll(params);
      setItems(response.data);
      setTotalElements(response.totalElements);
      setPage(response.page);
      setSize(response.size);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al listar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const item = await ejecucionproccierreService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateEjecucionproccierreRequest) => {
    setLoading(true);
    setError(null);
    try {
      const created = await ejecucionproccierreService.create(request);
      await fetchAll(lastFiltersRef.current);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(async (id: string, request: UpdateEjecucionproccierreRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await ejecucionproccierreService.update(id, request);
      setSelectedItem(updated);
      await fetchAll(lastFiltersRef.current);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await ejecucionproccierreService.remove(id);
      await fetchAll(lastFiltersRef.current);
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAll, selectedItem]);

  const cerrar = useCallback(async (id: string, request: CreateEjecucionproccierreRequest): Promise<CierreResultadoResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await ejecucionproccierreService.cerrar(id, request);
      await fetchAll(lastFiltersRef.current);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cerrar proceso');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const reabrir = useCallback(async (id: string, request: UpdateEjecucionproccierreRequest): Promise<ProcesoResultadoResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await ejecucionproccierreService.reabrir(id, request);
      await fetchAll(lastFiltersRef.current);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al reabrir proceso');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  return {
    items,
    selectedItem,
    loading,
    error,
    totalElements,
    page,
    size,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    cerrar,
    reabrir,
    clearError: () => setError(null),
  };
}
