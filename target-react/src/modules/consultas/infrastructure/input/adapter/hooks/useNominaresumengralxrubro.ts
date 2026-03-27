import { useState, useEffect, useCallback } from 'react';
import { NominaresumengralxrubroService } from '../../../../application/service/NominaresumengralxrubroService';
import { NominaresumengralxrubroGatewayAdapter } from '../../../output/adapter/api/NominaresumengralxrubroGatewayAdapter';
import { NominaresumengralxrubroResponse, CreateNominaresumengralxrubroRequest, UpdateNominaresumengralxrubroRequest, NominaresumengralxrubroFilterParams } from '../dto/NominaresumengralxrubroDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new NominaresumengralxrubroGatewayAdapter();
const nominaresumengralxrubroService = new NominaresumengralxrubroService(gatewayAdapter);

/**
 * Custom Hook: useNominaresumengralxrubro
 * Conecta la UI con el Application Service de nominaresumenGralxRubro.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useNominaresumengralxrubro() {
  const [items, setItems] = useState<NominaresumengralxrubroResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<NominaresumengralxrubroResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: NominaresumengralxrubroFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await nominaresumengralxrubroService.findAll(params);
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
      const item = await nominaresumengralxrubroService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateNominaresumengralxrubroRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await nominaresumengralxrubroService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, request: UpdateNominaresumengralxrubroRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await nominaresumengralxrubroService.update(id, request);
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
      await nominaresumengralxrubroService.remove(id);
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
