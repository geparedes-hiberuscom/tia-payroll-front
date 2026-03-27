import { useState, useEffect, useCallback } from 'react';
import { NominaresumengralcxrubroService } from '../../../../application/service/NominaresumengralcxrubroService';
import { NominaresumengralcxrubroGatewayAdapter } from '../../../output/adapter/api/NominaresumengralcxrubroGatewayAdapter';
import { NominaresumengralcxrubroResponse, CreateNominaresumengralcxrubroRequest, UpdateNominaresumengralcxrubroRequest, NominaresumengralcxrubroFilterParams } from '../dto/NominaresumengralcxrubroDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new NominaresumengralcxrubroGatewayAdapter();
const nominaresumengralcxrubroService = new NominaresumengralcxrubroService(gatewayAdapter);

/**
 * Custom Hook: useNominaresumengralcxrubro
 * Conecta la UI con el Application Service de nominaresumenGralCxRubro.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useNominaresumengralcxrubro() {
  const [items, setItems] = useState<NominaresumengralcxrubroResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<NominaresumengralcxrubroResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: NominaresumengralcxrubroFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await nominaresumengralcxrubroService.findAll(params);
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
      const item = await nominaresumengralcxrubroService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateNominaresumengralcxrubroRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await nominaresumengralcxrubroService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, request: UpdateNominaresumengralcxrubroRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await nominaresumengralcxrubroService.update(id, request);
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
      await nominaresumengralcxrubroService.remove(id);
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
