import { useState, useEffect, useCallback } from 'react';
import { ComparativonominasService } from '../../../../application/service/ComparativonominasService';
import { ComparativonominasGatewayAdapter } from '../../../output/adapter/api/ComparativonominasGatewayAdapter';
import { ComparativonominasResponse, CreateComparativonominasRequest, UpdateComparativonominasRequest, ComparativonominasFilterParams } from '../dto/ComparativonominasDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new ComparativonominasGatewayAdapter();
const comparativonominasService = new ComparativonominasService(gatewayAdapter);

/**
 * Custom Hook: useComparativonominas
 * Conecta la UI con el Application Service de comparativoNominas.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useComparativonominas() {
  const [items, setItems] = useState<ComparativonominasResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ComparativonominasResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: ComparativonominasFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await comparativonominasService.findAll(params);
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
      const item = await comparativonominasService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateComparativonominasRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await comparativonominasService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, request: UpdateComparativonominasRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await comparativonominasService.update(id, request);
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
      await comparativonominasService.remove(id);
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
