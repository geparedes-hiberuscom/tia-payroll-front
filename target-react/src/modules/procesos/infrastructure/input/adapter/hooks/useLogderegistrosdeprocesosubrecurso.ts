import { useCallback, useRef, useState } from 'react';
import { LogderegistrosdeprocesosubrecursoService } from '../../../../application/service/LogderegistrosdeprocesosubrecursoService';
import { LogderegistrosdeprocesosubrecursoGatewayAdapter } from '../../../output/adapter/api/LogderegistrosdeprocesosubrecursoGatewayAdapter';
import {
  CreateLogderegistrosdeprocesosubrecursoRequest,
  LogderegistrosdeprocesosubrecursoFilterParams,
  LogderegistrosdeprocesosubrecursoResponse,
  UpdateLogderegistrosdeprocesosubrecursoRequest,
} from '../dto/LogderegistrosdeprocesosubrecursoDto';

const gatewayAdapter = new LogderegistrosdeprocesosubrecursoGatewayAdapter();
const logderegistrosdeprocesosubrecursoService = new LogderegistrosdeprocesosubrecursoService(gatewayAdapter);

export function useLogderegistrosdeprocesosubrecurso() {
  const [items, setItems] = useState<LogderegistrosdeprocesosubrecursoResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<LogderegistrosdeprocesosubrecursoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const lastFiltersRef = useRef<LogderegistrosdeprocesosubrecursoFilterParams | undefined>(undefined);

  const fetchAll = useCallback(async (params: LogderegistrosdeprocesosubrecursoFilterParams) => {
    setLoading(true);
    setError(null);
    try {
      lastFiltersRef.current = params;
      const response = await logderegistrosdeprocesosubrecursoService.findAll(params);
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
      const item = await logderegistrosdeprocesosubrecursoService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateLogderegistrosdeprocesosubrecursoRequest) => {
    setLoading(true);
    setError(null);
    try {
      const created = await logderegistrosdeprocesosubrecursoService.create(request);
      if (lastFiltersRef.current) {
        await fetchAll(lastFiltersRef.current);
      }
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(async (id: string, request: UpdateLogderegistrosdeprocesosubrecursoRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await logderegistrosdeprocesosubrecursoService.update(id, request);
      setSelectedItem(updated);
      if (lastFiltersRef.current) {
        await fetchAll(lastFiltersRef.current);
      }
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
      await logderegistrosdeprocesosubrecursoService.remove(id);
      if (lastFiltersRef.current) {
        await fetchAll(lastFiltersRef.current);
      }
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

  const clear = useCallback(async (ejecucionId: string) => {
    setLoading(true);
    setError(null);
    try {
      await logderegistrosdeprocesosubrecursoService.clear(ejecucionId);
      if (lastFiltersRef.current) {
        await fetchAll(lastFiltersRef.current);
      } else {
        setItems([]);
        setSelectedItem(null);
        setTotalElements(0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al limpiar log');
      throw err;
    } finally {
      setLoading(false);
    }
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
    clear,
    clearError: () => setError(null),
  };
}
