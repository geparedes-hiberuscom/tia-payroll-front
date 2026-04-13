import { useCallback, useEffect, useRef, useState } from 'react';
import { ProcesosejecabrirlqService } from '../../../../application/service/ProcesosejecabrirlqService';
import { ProcesosejecabrirlqGatewayAdapter } from '../../../output/adapter/api/ProcesosejecabrirlqGatewayAdapter';
import {
  CreateProcesosejecabrirlqRequest,
  ProcesoResultadoResponse,
  ProcesosejecabrirlqFilterParams,
  ProcesosejecabrirlqResponse,
  UpdateProcesosejecabrirlqRequest,
} from '../dto/ProcesosejecabrirlqDto';

const gatewayAdapter = new ProcesosejecabrirlqGatewayAdapter();
const procesosejecabrirlqService = new ProcesosejecabrirlqService(gatewayAdapter);

export function useProcesosejecabrirlq() {
  const [items, setItems] = useState<ProcesosejecabrirlqResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProcesosejecabrirlqResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const lastFiltersRef = useRef<ProcesosejecabrirlqFilterParams | undefined>(undefined);

  const fetchAll = useCallback(async (params?: ProcesosejecabrirlqFilterParams) => {
    setLoading(true);
    setError(null);
    try {
      lastFiltersRef.current = params;
      const response = await procesosejecabrirlqService.findAll(params);
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
      const item = await procesosejecabrirlqService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateProcesosejecabrirlqRequest): Promise<ProcesoResultadoResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await procesosejecabrirlqService.create(request);
      await fetchAll(lastFiltersRef.current);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(async (id: string, request: UpdateProcesosejecabrirlqRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await procesosejecabrirlqService.update(id, request);
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
      await procesosejecabrirlqService.remove(id);
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
    clearError: () => setError(null),
  };
}
