import { useCallback, useEffect, useRef, useState } from 'react';
import { ProcesosejecaprobarlqService } from '../../../../application/service/ProcesosejecaprobarlqService';
import { ProcesosejecaprobarlqGatewayAdapter } from '../../../output/adapter/api/ProcesosejecaprobarlqGatewayAdapter';
import {
  CreateProcesosejecaprobarlqRequest,
  ProcesoResultadoResponse,
  ProcesosejecaprobarlqFilterParams,
  ProcesosejecaprobarlqResponse,
  RechazarLiquidacionRequest,
  UpdateProcesosejecaprobarlqRequest,
} from '../dto/ProcesosejecaprobarlqDto';

const gatewayAdapter = new ProcesosejecaprobarlqGatewayAdapter();
const procesosejecaprobarlqService = new ProcesosejecaprobarlqService(gatewayAdapter);

export function useProcesosejecaprobarlq() {
  const [items, setItems] = useState<ProcesosejecaprobarlqResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProcesosejecaprobarlqResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const lastFiltersRef = useRef<ProcesosejecaprobarlqFilterParams | undefined>(undefined);

  const fetchAll = useCallback(async (params?: ProcesosejecaprobarlqFilterParams) => {
    setLoading(true);
    setError(null);
    try {
      lastFiltersRef.current = params;
      const response = await procesosejecaprobarlqService.findAll(params);
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
      const item = await procesosejecaprobarlqService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateProcesosejecaprobarlqRequest): Promise<ProcesoResultadoResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await procesosejecaprobarlqService.create(request);
      await fetchAll(lastFiltersRef.current);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(async (id: string, request: UpdateProcesosejecaprobarlqRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await procesosejecaprobarlqService.update(id, request);
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
      await procesosejecaprobarlqService.remove(id);
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

  const rechazar = useCallback(async (request: RechazarLiquidacionRequest): Promise<ProcesoResultadoResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await procesosejecaprobarlqService.rechazar(request);
      await fetchAll(lastFiltersRef.current);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al rechazar');
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
    rechazar,
    clearError: () => setError(null),
  };
}
