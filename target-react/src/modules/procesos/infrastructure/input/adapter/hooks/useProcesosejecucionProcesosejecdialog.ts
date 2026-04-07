import { useCallback, useEffect, useRef, useState } from 'react';
import { ProcesosejecucionProcesosejecdialogService } from '../../../../application/service/ProcesosejecucionProcesosejecdialogService';
import { ProcesosejecucionProcesosejecdialogGatewayAdapter } from '../../../output/adapter/api/ProcesosejecucionProcesosejecdialogGatewayAdapter';
import {
  CreateProcesosejecucionProcesosejecdialogRequest,
  EjecutarCalculoRequest,
  EjecucionResultadoResponse,
  ProcesosejecucionProcesosejecdialogFilterParams,
  ProcesosejecucionProcesosejecdialogResponse,
  UpdateProcesosejecucionProcesosejecdialogRequest,
} from '../dto/ProcesosejecucionProcesosejecdialogDto';

const gateway = new ProcesosejecucionProcesosejecdialogGatewayAdapter();
const service = new ProcesosejecucionProcesosejecdialogService(gateway);

export function useProcesosejecucionProcesosejecdialog() {
  const [items, setItems] = useState<ProcesosejecucionProcesosejecdialogResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProcesosejecucionProcesosejecdialogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const lastFiltersRef = useRef<ProcesosejecucionProcesosejecdialogFilterParams | undefined>(undefined);

  const fetchAll = useCallback(async (params?: ProcesosejecucionProcesosejecdialogFilterParams) => {
    setLoading(true);
    setError(null);
    try {
      lastFiltersRef.current = params;
      const response = await service.findAll(params);
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
      const row = await service.findById(id);
      setSelectedItem(row);
      return row;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateProcesosejecucionProcesosejecdialogRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.create(request);
      await fetchAll(lastFiltersRef.current);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(async (id: string, request: UpdateProcesosejecucionProcesosejecdialogRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.update(id, request);
      setSelectedItem(result);
      await fetchAll(lastFiltersRef.current);
      return result;
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
      await service.remove(id);
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

  const ejecutar = useCallback(async (id: string, request: EjecutarCalculoRequest): Promise<EjecucionResultadoResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.ejecutar(id, request);
      await fetchAll(lastFiltersRef.current);
      if (selectedItem?.id === id) {
        await fetchById(id);
      }
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al ejecutar proceso');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAll, fetchById, selectedItem]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  return { items, selectedItem, loading, error, totalElements, page, size, fetchAll, fetchById, create, update, remove, ejecutar, clearError: () => setError(null) };
}
