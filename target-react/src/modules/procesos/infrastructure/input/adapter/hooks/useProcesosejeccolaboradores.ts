import { useCallback, useRef, useState } from 'react';
import { ProcesosejeccolaboradoresService } from '../../../../application/service/ProcesosejeccolaboradoresService';
import { ProcesosejeccolaboradoresGatewayAdapter } from '../../../output/adapter/api/ProcesosejeccolaboradoresGatewayAdapter';
import {
  CreateProcesosejeccolaboradoresRequest,
  EjecutarColaboradorRequest,
  EjecucionResultadoResponse,
  ProcesosejeccolaboradoresFilterParams,
  ProcesosejeccolaboradoresResponse,
  RubroPreliquidadoListResponse,
  UpdateProcesosejeccolaboradoresRequest,
} from '../dto/ProcesosejeccolaboradoresDto';

const gatewayAdapter = new ProcesosejeccolaboradoresGatewayAdapter();
const procesosejeccolaboradoresService = new ProcesosejeccolaboradoresService(gatewayAdapter);

export function useProcesosejeccolaboradores() {
  const [items, setItems] = useState<ProcesosejeccolaboradoresResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProcesosejeccolaboradoresResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const lastFiltersRef = useRef<ProcesosejeccolaboradoresFilterParams | undefined>(undefined);

  const fetchAll = useCallback(async (params: ProcesosejeccolaboradoresFilterParams) => {
    setLoading(true);
    setError(null);
    try {
      lastFiltersRef.current = params;
      const response = await procesosejeccolaboradoresService.findAll(params);
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
      const item = await procesosejeccolaboradoresService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateProcesosejeccolaboradoresRequest) => {
    setLoading(true);
    setError(null);
    try {
      const created = await procesosejeccolaboradoresService.create(request);
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

  const update = useCallback(async (id: string, request: UpdateProcesosejeccolaboradoresRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await procesosejeccolaboradoresService.update(id, request);
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
      await procesosejeccolaboradoresService.remove(id);
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

  const listRubros = useCallback(async (ejecucionId: string, colaboradorId: string): Promise<RubroPreliquidadoListResponse> => {
    setLoading(true);
    setError(null);
    try {
      return await procesosejeccolaboradoresService.listRubros(ejecucionId, colaboradorId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al listar rubros');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const ejecutarColaborador = useCallback(async (ejecucionId: string, request: EjecutarColaboradorRequest): Promise<EjecucionResultadoResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await procesosejeccolaboradoresService.ejecutarColaborador(ejecucionId, request);
      if (lastFiltersRef.current) {
        await fetchAll(lastFiltersRef.current);
      }
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al ejecutar colaborador');
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
    listRubros,
    ejecutarColaborador,
    clearError: () => setError(null),
  };
}
