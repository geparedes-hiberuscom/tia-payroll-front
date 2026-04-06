import { useState, useEffect, useCallback } from 'react';
import { RubroplantillacontabledialogService } from '../../../../application/service/RubroplantillacontabledialogService';
import { RubroplantillacontabledialogGatewayAdapter } from '../../../output/adapter/api/RubroplantillacontabledialogGatewayAdapter';
import { RubroplantillacontabledialogResponse, CreateRubroplantillacontabledialogRequest, UpdateRubroplantillacontabledialogRequest, RubroplantillacontabledialogFilterParams } from '../dto/RubroplantillacontabledialogDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new RubroplantillacontabledialogGatewayAdapter();
const rubroplantillacontabledialogService = new RubroplantillacontabledialogService(gatewayAdapter);

/**
 * Custom Hook: useRubroplantillacontabledialog
 * Conecta la UI con el Application Service de rubroplantillaContableDialog.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useRubroplantillacontabledialog() {
  const [items, setItems] = useState<RubroplantillacontabledialogResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<RubroplantillacontabledialogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: RubroplantillacontabledialogFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await rubroplantillacontabledialogService.findAll(params);
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
      const item = await rubroplantillacontabledialogService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateRubroplantillacontabledialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await rubroplantillacontabledialogService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, request: UpdateRubroplantillacontabledialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await rubroplantillacontabledialogService.update(id, request);
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
      await rubroplantillacontabledialogService.remove(id);
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
