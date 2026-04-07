import { useCallback, useEffect, useRef, useState } from 'react';
import { ProcesosejecucionreversionProcesosejecucionreversiondialogService } from '../../../../application/service/ProcesosejecucionreversionProcesosejecucionreversiondialogService';
import { ProcesosejecucionreversionProcesosejecucionreversiondialogGatewayAdapter } from '../../../output/adapter/api/ProcesosejecucionreversionProcesosejecucionreversiondialogGatewayAdapter';
import {
  CreateProcesosejecucionreversionProcesosejecucionreversiondialogRequest,
  ProcesosejecucionreversionProcesosejecucionreversiondialogFilterParams,
  ProcesosejecucionreversionProcesosejecucionreversiondialogResponse,
  ReversionResultadoResponse,
  RevertirProcesoRequest,
  SobreGiroListResponse,
  UpdateProcesosejecucionreversionProcesosejecucionreversiondialogRequest,
} from '../dto/ProcesosejecucionreversionProcesosejecucionreversiondialogDto';

const gatewayAdapter = new ProcesosejecucionreversionProcesosejecucionreversiondialogGatewayAdapter();
const procesosejecucionreversionProcesosejecucionreversiondialogService = new ProcesosejecucionreversionProcesosejecucionreversiondialogService(gatewayAdapter);

export function useProcesosejecucionreversionProcesosejecucionreversiondialog() {
  const [items, setItems] = useState<ProcesosejecucionreversionProcesosejecucionreversiondialogResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProcesosejecucionreversionProcesosejecucionreversiondialogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const lastFiltersRef = useRef<ProcesosejecucionreversionProcesosejecucionreversiondialogFilterParams | undefined>(undefined);

  const fetchAll = useCallback(async (params?: ProcesosejecucionreversionProcesosejecucionreversiondialogFilterParams) => {
    setLoading(true);
    setError(null);
    try {
      lastFiltersRef.current = params;
      const response = await procesosejecucionreversionProcesosejecucionreversiondialogService.findAll(params);
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
      const item = await procesosejecucionreversionProcesosejecucionreversiondialogService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateProcesosejecucionreversionProcesosejecucionreversiondialogRequest) => {
    setLoading(true);
    setError(null);
    try {
      const created = await procesosejecucionreversionProcesosejecucionreversiondialogService.create(request);
      await fetchAll(lastFiltersRef.current);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(async (id: string, request: UpdateProcesosejecucionreversionProcesosejecucionreversiondialogRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await procesosejecucionreversionProcesosejecucionreversiondialogService.update(id, request);
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
      await procesosejecucionreversionProcesosejecucionreversiondialogService.remove(id);
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

  const revertir = useCallback(async (id: string, request: RevertirProcesoRequest): Promise<ReversionResultadoResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await procesosejecucionreversionProcesosejecucionreversiondialogService.revertir(id, request);
      await fetchAll(lastFiltersRef.current);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al revertir proceso');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const listSobregiros = useCallback(async (id: string, colaboradorId?: number, rubroId?: string): Promise<SobreGiroListResponse> => {
    setLoading(true);
    setError(null);
    try {
      return await procesosejecucionreversionProcesosejecucionreversiondialogService.listSobregiros(id, colaboradorId, rubroId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al listar sobregiros');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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
    revertir,
    listSobregiros,
    clearError: () => setError(null),
  };
}
