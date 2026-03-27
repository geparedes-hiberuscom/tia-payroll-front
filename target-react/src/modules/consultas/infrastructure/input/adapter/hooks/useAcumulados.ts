import { useState, useEffect, useCallback } from 'react';
import { AcumuladosService } from '../../../../application/service/AcumuladosService';
import { AcumuladosGatewayAdapter } from '../../../output/adapter/api/AcumuladosGatewayAdapter';
import { AcumuladosResponse, CreateAcumuladosRequest, UpdateAcumuladosRequest, AcumuladosFilterParams } from '../dto/AcumuladosDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new AcumuladosGatewayAdapter();
const acumuladosService = new AcumuladosService(gatewayAdapter);

/**
 * Custom Hook: useAcumulados
 * Conecta la UI con el Application Service de acumulados.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useAcumulados() {
  const [items, setItems] = useState<AcumuladosResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<AcumuladosResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: AcumuladosFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await acumuladosService.findAll(params);
      setItems(response.data);
      setTotalElements(response.totalElements);
      setPage(response.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const item = await acumuladosService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateAcumuladosRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await acumuladosService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, request: UpdateAcumuladosRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await acumuladosService.update(id, request);
      setItems(prev => prev.map(item => item.id === id ? updated : item));
      setSelectedItem(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await acumuladosService.remove(id);
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
