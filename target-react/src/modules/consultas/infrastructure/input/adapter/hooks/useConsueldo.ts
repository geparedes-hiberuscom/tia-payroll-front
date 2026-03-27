import { useState, useEffect, useCallback } from 'react';
import { ConsueldoService } from '../../../../application/service/ConsueldoService';
import { ConsueldoGatewayAdapter } from '../../../output/adapter/api/ConsueldoGatewayAdapter';
import { ConsueldoResponse, CreateConsueldoRequest, UpdateConsueldoRequest, ConsueldoFilterParams } from '../dto/ConsueldoDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new ConsueldoGatewayAdapter();
const consueldoService = new ConsueldoService(gatewayAdapter);

/**
 * Custom Hook: useConsueldo
 * Conecta la UI con el Application Service de conSueldo.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useConsueldo() {
  const [items, setItems] = useState<ConsueldoResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ConsueldoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: ConsueldoFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await consueldoService.findAll(params);
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
      const item = await consueldoService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateConsueldoRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await consueldoService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, request: UpdateConsueldoRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await consueldoService.update(id, request);
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
      await consueldoService.remove(id);
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
